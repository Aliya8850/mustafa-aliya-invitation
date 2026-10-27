import {
  BRIDE,
  EVENTS,
  GROOM,
  HOSTS,
  RSVP_WHATSAPP,
  VARIANTS,
  calendarUrl,
  mapsUrl,
  type EventInfo,
  type VariantKey,
} from "@/lib/events";
import Countdown from "./Countdown";
import Gate from "./Gate";
import GuestName from "./GuestName";
import Reveal from "./Reveal";
import ShareButton from "./ShareButton";
import Spotlight from "./Spotlight";
import { Crescent, Divider, Frieze, Lantern, Mandala, Sparkles } from "./ornaments";

function EventCard({ event, solo }: { event: EventInfo; solo: boolean }) {
  return (
    <Reveal className="event-wrap">
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
        {event.arabic ? <p className="arabic event-arabic">{event.arabic}</p> : null}

        <Divider className="event-divider" />

        <p className="event-label">Time</p>
        <p className="event-time">{event.time}</p>

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
      <div className="progress" aria-hidden="true" />
      <Gate initials="M·A" />
      <Spotlight />
      <Sparkles />

      {/* ───────────── Hero ───────────── */}
      <section className="hero">
        <Mandala className="mandala-a" />
        <Mandala className="mandala-b" />

        <div className="hero-lanterns" aria-hidden="true">
          <Lantern className="hl hl-1" />
          <Lantern className="hl hl-2" />
          <Lantern className="hl hl-3" />
          <Lantern className="hl hl-4" />
        </div>

        <GuestName />

        <div className="arch hero-anim" style={{ animationDelay: "1s" }}>
          <svg
            className="arch-bg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="archFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#5a3720" />
                <stop offset="0.4" stopColor="#34190c" />
                <stop offset="1" stopColor="#1b0d07" />
              </linearGradient>
              <radialGradient id="archGlow" cx="0.5" cy="0.42" r="0.5">
                <stop offset="0" stopColor="#f3dfa6" stopOpacity="0.2" />
                <stop offset="1" stopColor="#f3dfa6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="archStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f3dfa6" />
                <stop offset="0.5" stopColor="#c9a24b" />
                <stop offset="1" stopColor="#8a6420" />
              </linearGradient>
            </defs>
            {/* outermost hairline */}
            <path
              d="M-2.5 100 V46 C-2.5 20 37.5 13 50 -3 C62.5 13 102.5 20 102.5 46 V100"
              fill="none"
              stroke="#c9a24b"
              strokeOpacity="0.35"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M1.5 100 V46 C1.5 22 38 16 50 1.5 C62 16 98.5 22 98.5 46 V100 Z"
              fill="url(#archFill)"
              stroke="url(#archStroke)"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M1.5 100 V46 C1.5 22 38 16 50 1.5 C62 16 98.5 22 98.5 46 V100 Z"
              fill="url(#archGlow)"
            />
            <path
              d="M5 100 V47 C5 26 39 20 50 6.5 C61 20 95 26 95 47 V100"
              fill="none"
              stroke="#c9a24b"
              strokeOpacity="0.6"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <Crescent className="arch-finial" />

          <div className="arch-inner">
            <p className="calli bismillah stg" style={{ "--i": 0 } as React.CSSProperties}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            <p className="hero-invite stg" style={{ "--i": 1 } as React.CSSProperties}>
              With great joy &amp; happiness
              <br />
              we cordially invite you to celebrate
              <br />
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
            <Divider className="hero-divider stg" />
            <p className="hero-sub stg" style={{ "--i": 6 } as React.CSSProperties}>
              {v.intro}
            </p>
          </div>
        </div>

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
        <Reveal className="families-grid">
          <div className="family">
            <p className="eyebrow">The Groom</p>
            <p className="family-name foil">{GROOM.full}</p>
            <p className="family-parents">{GROOM.parents}</p>
          </div>
          <div className="family-and" aria-hidden="true">
            <Crescent className="crescent crescent-sm" />
          </div>
          <div className="family">
            <p className="eyebrow">The Bride</p>
            <p className="family-name foil">{BRIDE.full}</p>
            <p className="family-parents">{BRIDE.parents}</p>
          </div>
        </Reveal>
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
          {events.map((e) => (
            <EventCard key={e.id} event={e} solo={solo} />
          ))}
        </div>
      </section>

      {/* ───────────── Countdown ───────────── */}
      <section className="section countdown-section">
        <Reveal>
          <Countdown targetISO={first.startISO} label={first.title} />
        </Reveal>
      </section>

      <Frieze />

      {/* ───────────── Closing ───────────── */}
      <section className="section closing">
        <Reveal>
          <Crescent className="crescent" />
          <p className="closing-line foil">
            Your Gracious Presence &amp; Heartfelt Blessings
            <br />
            Would Make This Occasion Truly Special
          </p>
          <Divider className="section-divider" />
          <p className="eyebrow">With love &amp; duas</p>
          <p className="hosts">{HOSTS}</p>
          <p className="hosts-sub">and the Shaikh &amp; Khan families</p>

          <div className="closing-actions">
            {rsvpHref ? (
              <a className="btn btn-gold" href={rsvpHref} target="_blank" rel="noopener noreferrer">
                RSVP on WhatsApp
              </a>
            ) : null}
            <ShareButton />
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <span className="foil">Mustafa &amp; Aliya</span>
        <span>· December 2026 ·</span>
      </footer>
    </main>
  );
}
