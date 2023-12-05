
import { NavbarMenu } from "@/components/NavbarMenu";
import ClientHomeWrapper from "./ClientHomeWrapper";

export default function Home() {
  return <main className="flex">
    <NavbarMenu />
    <div className="h-screen w-0.5 shadow-3xl bg-slate-600"></div>
    <ClientHomeWrapper />
  </main>
}