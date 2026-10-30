import {
  BRIDE,
  EVENTS,
  GROOM,
  RSVP_WHATSAPP,
  VARIANTS,
  calendarUrl,
  mapsUrl,
  type EventInfo,
  type VariantKey,
} from "@/lib/events";
import ClickBurst from "./ClickBurst";
import Countdown from "./Countdown";
import Gate from "./Gate";
import GuestName from "./GuestName";
import Music from "./Music";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";
import Tilt from "./Tilt";
import { Divider, FloatingHearts, Frieze, Lantern, LoveMotif, Mandala, Sparkles } from "./ornaments";

function EventCard({
  event,
  solo,
  index,
}: {
  event: EventInfo;
  solo: boolean;
  index: number;
}) {
  return (
    <Reveal className="event-wrap" from={solo ? "up" : index % 2 === 0 ? "left" : "right"}>
      <Tilt className="event-tilt" max={5}>
      <article className={`event accent-${event.accent} ${solo ? "event-solo" : ""}`}>
        <div className="medallion">
          <span className="m-week">{event.weekday}</span>
          <span className="m-day">{event.day}</span>
          <span className="m-month">
            {event.month} {event.year}
          </span>
        </div>

        <p className="event-kicker">{event.kicker}</p>
        <h3 className="event-title">{event.title}</h3>

        <Divider className="event-divider" />

        <p className="event-label">Time</p>
        <p className="event-time">{event.time}</p>
        {event.timeExtra ? <p className="event-time-extra">{event.timeExtra}</p> : null}

        <p className="event-label">Venue</p>
        <address className="event-venue">
          {event.venue.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>

        {event.note ? <p className="event-note">{event.note}</p> : null}

        <div className="event-actions">
          {event.mapQuery ? (
            <a
              className="btn btn-solid"
              href={mapsUrl(event.mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Maps
            </a>
          ) : null}
          <a
            className="btn btn-outline"
            href={calendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add to Calendar
          </a>
        </div>
      </article>
      </Tilt>
    </Reveal>
  );
}

export default function Invitation({ variant }: { variant: VariantKey }) {
  const v = VARIANTS[variant];
  const events = v.events.map((id) => EVENTS[id]);
  const first = events[0];
  const last = events[events.length - 1];
  const solo = events.length === 1;
  const dateLine = solo
    ? `${first.weekday}, ${first.day} ${first.month} ${first.year}`
    : `${first.day} ${first.month.slice(0, 3)} — ${last.day} ${last.month.slice(0, 3)} ${last.year}`;

  const rsvpHref = RSVP_WHATSAPP
    ? `https://wa.me/${RSVP_WHATSAPP}?text=${encodeURIComponent(
        `Assalamu Alaikum! We will be joining the celebrations of ${GROOM.first} & ${BRIDE.first}, In shaa Allah.`,
      )}`
    : "";

  return (
    <main className="invite">
      <Gate initials="M·A" />
      <Music />
      <ClickBurst />
      <Spotlight />
      <Sparkles />

      {/* ───────────── Hero ───────────── */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <Mandala className="mandala-a" />
          <Mandala className="mandala-b" />
        </div>

        <div className="hero-lanterns" aria-hidden="true">
          <Lantern className="hl hl-1" />
          <Lantern className="hl hl-2" />
          <Lantern className="hl hl-3" />
          <Lantern className="hl hl-4" />
        </div>

        <GuestName />

        <Tilt className="arch-tilt" max={6}>
        <div className="arch hero-anim" style={{ animationDelay: "1s" }}>
          <svg
            className="arch-cap"
            viewBox="0 0 100 46"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="capFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fcfffa" />
                <stop offset="1" stopColor="#f7fcf4" />
              </linearGradient>
              <linearGradient id="capStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#a9d0a0" />
                <stop offset="1" stopColor="#5f8c69" />
              </linearGradient>
            </defs>
            <path d="M0 46 V30 C0 12 36 9 50 0.8 C64 9 100 12 100 30 V46 Z" fill="url(#capFill)" />
            <path
              d="M0 46 V30 C0 12 36 9 50 0.8 C64 9 100 12 100 30 V46"
              fill="none"
              stroke="url(#capStroke)"
              strokeWidth="4"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M3 46 V31 C3 15 38 12 50 4.5 C62 12 97 15 97 31 V46"
              fill="none"
              stroke="#5f8c69"
              strokeOpacity="0.6"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="arch-body" aria-hidden="true" />

          <div className="arch-inner">
            <p className="calli bismillah stg" style={{ "--i": 0 } as React.CSSProperties}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            <p className="hero-invite stg" style={{ "--i": 1 } as React.CSSProperties}>
              With great joy &amp; happiness{" "}
              <br className="hidden sm:inline" />
              we cordially invite you to celebrate{" "}
              <br className="hidden sm:inline" />
              {v.invite}
            </p>

            <h1 className="names">
              <span className="name-block stg" style={{ "--i": 2 } as React.CSSProperties}>
                <span className="name-first foil">{GROOM.first}</span>
                <span className="name-last">{GROOM.last}</span>
              </span>
              <span
                className="name-amp stg"
                style={{ "--i": 3 } as React.CSSProperties}
                aria-label="and"
              >
                &amp;
              </span>
              <span className="name-block stg" style={{ "--i": 4 } as React.CSSProperties}>
                <span className="name-first foil">{BRIDE.first}</span>
                <span className="name-last">{BRIDE.last}</span>
              </span>
            </h1>

            <p className="hero-date stg" style={{ "--i": 5 } as React.CSSProperties}>
              {dateLine}
            </p>
          </div>
        </div>
        </Tilt>

        <a className="scroll-cue hero-anim" style={{ animationDelay: "2.2s" }} href="#verse">
          <span>Scroll</span>
          <i />
        </a>
      </section>

      <Frieze />

      {/* ───────────── Verse ───────────── */}
      <section id="verse" className="section verse">
        <Reveal>
          <p className="arabic verse-ar">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <Divider className="verse-divider" />
          <p className="verse-en">
            “And among His signs is that He created for you mates from among yourselves, that you
            may find tranquillity in them; and He placed between you affection and mercy.”
          </p>
          <p className="verse-ref">Surah Ar-Rum · 30:21</p>
        </Reveal>
      </section>

      {/* ───────────── Families ───────────── */}
      <section className="section families">
        <div className="families-grid">
          <Reveal from="left" className="family">
            <p className="eyebrow">The Groom</p>
            <p className="family-name foil">{GROOM.full}</p>
            <p className="family-parents">{GROOM.parents}</p>
          </Reveal>
          <Reveal from="zoom" className="family-and" delay={150}>
            <LoveMotif />
          </Reveal>
          <Reveal from="right" className="family" delay={300}>
            <p className="eyebrow">The Bride</p>
            <p className="family-name foil">{BRIDE.full}</p>
            <p className="family-parents">{BRIDE.parents}</p>
          </Reveal>
        </div>
      </section>

      <Frieze />

      {/* ───────────── Events ───────────── */}
      <section className="section events">
        <Reveal>
          <p className="eyebrow">{solo ? "The Occasion" : "The Celebrations"}</p>
          <h2 className="section-title">{solo ? first.title : "Save the Dates"}</h2>
          <Divider className="section-divider" />

          {!solo ? (
            <ol className="journey">
              {events.map((e) => (
                <li key={e.id} className={`journey-item accent-${e.accent}`}>
                  <span className="journey-dot" />
                  <span className="journey-date">
                    {e.day} {e.month.slice(0, 3)}
                  </span>
                  <span className="journey-name">{e.short}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </Reveal>

        <div className="timeline">
          {events.map((e, i) => (
            <EventCard key={e.id} event={e} solo={solo} index={i} />
          ))}
        </div>
      </section>

      {/* ───────────── Countdown ───────────── */}
      <section className="section countdown-section">
        <Reveal>
          <Countdown targetISO={first.startISO} label={first.short} />
        </Reveal>
      </section>

      <Frieze />

      {/* ───────────── Closing ───────────── */}
      <section className="section closing">
        <FloatingHearts />
        <Reveal>
          <p className="closing-line foil">
            Your Gracious Presence &amp; Heartfelt Blessings
            <br />
            Would Make This Occasion Truly Special
          </p>
          <Divider className="section-divider" />
          <p className="eyebrow">With best compliments from</p>
          <p className="hosts">Shaikh Family, Relatives &amp; Friends</p>

          {rsvpHref ? (
            <div className="closing-actions">
              <a className="btn btn-gold" href={rsvpHref} target="_blank" rel="noopener noreferrer">
                RSVP on WhatsApp
              </a>
            </div>
          ) : null}
        </Reveal>
      </section>

      <footer className="footer">
        <Divider className="footer-divider" />
        <span className="footer-names foil">Mustafa &amp; Aliya</span>
        <span className="footer-date">December 2026</span>
      </footer>
    </main>
  );
}
