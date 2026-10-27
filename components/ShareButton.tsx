"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mustafa & Aliya — Wedding Invitation",
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* user dismissed the share sheet */
    }
  }

  return (
    <button type="button" className="btn btn-ghost" onClick={share}>
      {copied ? "Link copied ✓" : "Share this invitation"}
    </button>
  );
}
