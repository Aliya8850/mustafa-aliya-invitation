import Link from "next/link";
import { Divider, Mandala, Sparkles, WaxSeal } from "@/components/ornaments";
import { VARIANT_LIST } from "@/lib/events";

export default function Home() {
  return (
    <main className="hub">
      <Mandala className="mandala-a" />
      <Sparkles />
      <WaxSeal initials="M·A" className="hub-seal" />
      <p className="eyebrow">Wedding Invitations</p>
      <h1 className="hub-title foil">Mustafa &amp; Aliya</h1>
      <Divider className="section-divider" />
      <p className="hub-sub">
        Choose the invitation to share. Add <code>?to=Guest Name</code> to any link to greet
        a guest personally.
      </p>

      <ul className="hub-list">
        {VARIANT_LIST.map((v) => (
          <li key={v.key}>
            <Link href={v.path} className="hub-card">
              <span className="hub-card-label">{v.label}</span>
              <span className="hub-card-desc">{v.description}</span>
              <span className="hub-card-path">{v.path}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
