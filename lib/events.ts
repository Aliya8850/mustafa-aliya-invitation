export type EventId = "haldi" | "nikah" | "walima";

export interface EventInfo {
  id: EventId;
  title: string;
  short: string;
  arabic?: string;
  kicker: string;
  weekday: string;
  day: string;
  month: string;
  year: string;
  time: string;
  /** ISO timestamp (IST) used for the countdown. */
  startISO: string;
  /** Local wall-clock times for the Google Calendar link (ctz=Asia/Kolkata). */
  calStart: string;
  calEnd: string;
  venue: string[];
  /** Leave empty to hide the "Open in Maps" button. */
  mapQuery: string;
  note?: string;
  accent: "haldi" | "nikah" | "walima";
}

export const GROOM = {
  first: "Mustafa",
  last: "Shaikh",
  full: "Mustafa Shaikh",
  parents: "S/o Mr. Umar Haroon Shaikh & Mrs. Umera Shaikh",
};

export const BRIDE = {
  first: "Aliya",
  last: "Khan",
  full: "Aliya Khan",
  parents: "D/o Late Mr. Salim Khan & Mrs. Zohra Bi Khan",
};

export const HOSTS = "Mr. Umar Haroon Shaikh & Mrs. Umera Shaikh";

/**
 * Optional: WhatsApp number (country code, digits only, e.g. "919876543210")
 * to enable the "RSVP on WhatsApp" button. Leave empty to hide it.
 */
export const RSVP_WHATSAPP = "";

export const EVENTS: Record<EventId, EventInfo> = {
  // TODO: the printed invitation has no Haldi details — confirm date, time and venue.
  haldi: {
    id: "haldi",
    title: "Haldi",
    short: "Haldi",
    kicker: "A Splash of Gold & Joy",
    weekday: "Monday",
    day: "30",
    month: "November",
    year: "2026",
    time: "04:00 pm onwards",
    startISO: "2026-11-30T16:00:00+05:30",
    calStart: "20261130T160000",
    calEnd: "20261130T190000",
    venue: ["Venue details will be shared shortly"],
    mapQuery: "",
    note: "Dress in yellow & marigold — come ready to be showered with turmeric and blessings.",
    accent: "haldi",
  },
  nikah: {
    id: "nikah",
    title: "Nikah",
    short: "Nikah",
    arabic: "عقد النكاح",
    kicker: "Inshallah",
    weekday: "Wednesday",
    day: "02",
    month: "December",
    year: "2026",
    time: "After Namaz-e-Maghrib",
    startISO: "2026-12-02T18:00:00+05:30",
    calStart: "20261202T180000",
    calEnd: "20261202T210000",
    venue: [
      "Malhar Hall, B-103, Municipal Rd,",
      "Sector 2, Govandi East,",
      "Mumbai - 400043.",
    ],
    mapQuery: "Malhar Hall, B-103, Municipal Rd, Sector 2, Govandi East, Mumbai 400043",
    accent: "nikah",
  },
  walima: {
    id: "walima",
    title: "Dawat-e-Walima",
    short: "Walima",
    arabic: "وليمة",
    kicker: "The Reception",
    weekday: "Friday",
    day: "04",
    month: "December",
    year: "2026",
    time: "07:00 pm onwards",
    startISO: "2026-12-04T19:00:00+05:30",
    calStart: "20261204T190000",
    calEnd: "20261204T230000",
    venue: [
      "Palm Beach Banquets, 1st Floor, Vadar Bhavan,",
      "Sanpada Rd, Palm Beach,",
      "Navi Mumbai - 400705.",
    ],
    mapQuery: "Palm Beach Banquets, Vadar Bhavan, Sanpada Rd, Palm Beach, Navi Mumbai 400705",
    accent: "walima",
  },
};

export type VariantKey =
  | "haldi-nikah-walima"
  | "nikah-walima"
  | "nikah"
  | "walima";

export interface Variant {
  key: VariantKey;
  path: string;
  label: string;
  description: string;
  events: EventId[];
  /** Completes "…invite you to celebrate ___ of our beloved son". */
  invite: string;
  intro: string;
}

export const VARIANTS: Record<VariantKey, Variant> = {
  "haldi-nikah-walima": {
    key: "haldi-nikah-walima",
    path: "/haldi-nikah-walima",
    label: "Haldi · Nikah · Walima",
    description: "The complete celebration — all three days.",
    events: ["haldi", "nikah", "walima"],
    invite: "THE WEDDING CELEBRATIONS OF OUR BELOVED SON",
    intro: "Three days of joy, duas and togetherness",
  },
  "nikah-walima": {
    key: "nikah-walima",
    path: "/nikah-walima",
    label: "Nikah · Walima",
    description: "The wedding and the reception.",
    events: ["nikah", "walima"],
    invite: "THE WEDDING & RECEPTION OF OUR BELOVED SON",
    intro: "Two evenings to witness a blessed union",
  },
  nikah: {
    key: "nikah",
    path: "/nikah",
    label: "Nikah only",
    description: "The wedding ceremony.",
    events: ["nikah"],
    invite: "THE WEDDING OF OUR BELOVED SON",
    intro: "Join us as two families become one",
  },
  walima: {
    key: "walima",
    path: "/walima",
    label: "Dawat-e-Walima only",
    description: "The reception dinner.",
    events: ["walima"],
    invite: "THE RECEPTION OF OUR BELOVED SON",
    intro: "An evening of feasting and blessings",
  },
};

export const VARIANT_LIST = Object.values(VARIANTS);

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function calendarUrl(e: EventInfo) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.title} — Mustafa & Aliya`,
    dates: `${e.calStart}/${e.calEnd}`,
    ctz: "Asia/Kolkata",
    location: e.venue.join(" "),
    details: "Wedding of Mustafa Shaikh & Aliya Khan. Your presence and blessings would make this occasion truly special.",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
