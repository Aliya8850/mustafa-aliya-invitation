import type { Metadata } from "next";
import Invitation from "@/components/Invitation";

export const metadata: Metadata = {
  title: "Haldi, Nikah & Walima Invitation | Mustafa & Aliya",
};

export default function Page() {
  return <Invitation variant="haldi-nikah-walima" />;
}
