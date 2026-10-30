"use client";

import { useEffect, useState } from "react";
import { WaxSeal } from "./ornaments";

type Phase = "closed" | "opening" | "gone";

export default function Gate({ initials }: { initials: string }) {
  const [phase, setPhase] = useState<Phase>("closed");

  useEffect(() => {
    document.body.style.overflow = phase === "gone" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  function open() {
    if (phase !== "closed") return;
    document.documentElement.dataset.opened = "1";
    // Dispatched synchronously inside the click so audio may start (autoplay rules).
    window.dispatchEvent(new Event("invitation-open"));
    setPhase("opening");
    window.setTimeout(() => setPhase("gone"), 2400);
  }

  if (phase === "gone") return null;

  return (
    <div
      className={`gate ${phase === "opening" ? "is-opening" : ""}`}
      role="dialog"
      aria-label="Wedding invitation cover"
    >
      <div className="gate-door gate-door-l">
        <i className="door-panel" />
      </div>
      <div className="gate-door gate-door-r">
        <i className="door-panel" />
      </div>

      <div className="gate-center">
        <p className="calli gate-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        <button
          type="button"
          className="wax"
          onClick={open}
          aria-label="Break the seal to open the invitation"
        >
          <WaxSeal initials={initials} />
        </button>
        <p className="gate-names" aria-label="Mustafa and Aliya">
          <span>Mustafa</span>
          <span className="gate-amp" aria-hidden="true">
            &amp;
          </span>
          <span>Aliya</span>
        </p>
        <p className="gate-hint">Tap the seal to open</p>
      </div>
    </div>
  );
}
