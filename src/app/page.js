import { Content } from "@/components/Content";
import { NavbarMenu } from "@/components/NavbarMenu";

export default function Home() {
  return <main className="flex">
    <NavbarMenu />
      <div className="h-screen w-0.5 shadow-3xl bg-slate-600"></div>
    <Content />
  </main>
}