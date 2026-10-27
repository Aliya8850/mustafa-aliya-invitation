"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getName = () =>
  (new URLSearchParams(window.location.search).get("to") ?? "")
    .trim()
    .slice(0, 48);
const getServerName = () => "";

/** Personalises the greeting via `?to=Guest Name` on the invitation link. */
export default function GuestName() {
  const name = useSyncExternalStore(subscribe, getName, getServerName);
  if (!name) return null;
  return (
    <p className="guest hero-anim" style={{ animationDelay: "0.1s" }}>
      Dear <span className="gold-text">{name}</span>,
    </p>
  );
}
