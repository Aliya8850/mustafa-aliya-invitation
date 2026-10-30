"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/bgm_clip.mp4";
const TARGET_VOLUME = 0.7;
const FADE_IN_SECONDS = 1.5;
const FADE_OUT_SECONDS = 4;

type Status = "idle" | "playing" | "ended";

/**
 * Background music. Starts when the gate's seal is tapped (the Gate dispatches
 * "invitation-open" inside the click handler, which satisfies browser autoplay
 * rules) and fades out over the last few seconds of the track.
 *
 * Volume is driven through a Web Audio GainNode because `audio.volume` is
 * read-only on iOS Safari, which would break the fade there.
 */
export default function Music() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const rafRef = useRef(0);
  const mutedRef = useRef(false);

  const [status, setStatus] = useState<Status>("idle");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function tick() {
      const el = audioRef.current;
      const gain = gainRef.current;
      if (!el || !gain) return;

      const t = el.currentTime;
      const d = el.duration;
      const fadeIn = Math.min(1, t / FADE_IN_SECONDS);
      const fadeOut = Number.isFinite(d)
        ? Math.max(0, Math.min(1, (d - t) / FADE_OUT_SECONDS))
        : 1;
      gain.gain.value = mutedRef.current ? 0 : TARGET_VOLUME * fadeIn * fadeOut;

      if (!el.paused && !el.ended) rafRef.current = requestAnimationFrame(tick);
    }

    function start() {
      const el = audioRef.current;
      if (!el) return;

      if (!ctxRef.current) {
        const Ctx =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const gain = ctx.createGain();
        gain.gain.value = 0;
        ctx.createMediaElementSource(el).connect(gain).connect(ctx.destination);
        ctxRef.current = ctx;
        gainRef.current = gain;
      }

      void ctxRef.current.resume();
      el.currentTime = 0;
      el
        .play()
        .then(() => {
          setStatus("playing");
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(tick);
        })
        .catch(() => {
          /* blocked or file missing: stay silent */
        });
    }

    function onEnded() {
      cancelAnimationFrame(rafRef.current);
      setStatus("ended");
    }

    window.addEventListener("invitation-open", start);
    audio.addEventListener("ended", onEnded);
    return () => {
      window.removeEventListener("invitation-open", start);
      audio.removeEventListener("ended", onEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      void ctxRef.current?.close();
    };
  }, []);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;

    if (status === "ended") {
      window.dispatchEvent(new Event("invitation-open"));
      return;
    }
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    if (gainRef.current) {
      gainRef.current.gain.value = mutedRef.current ? 0 : TARGET_VOLUME;
    }
  }

  const label =
    status === "ended" ? "Play music again" : muted ? "Unmute music" : "Mute music";

  return (
    <>
      <audio ref={audioRef} src={SRC} preload="none" playsInline />
      {status !== "idle" ? (
        <button type="button" className="music-btn" onClick={toggle} aria-label={label}>
          {status === "ended" ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          ) : muted ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
              <path d="M16 9l5 6m0-6l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
              <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </button>
      ) : null}
    </>
  );
}
