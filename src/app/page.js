import { Content } from "@/components/Content";
import { Header } from "@/components/Header/Header";
import { NavbarMenu } from "@/components/NavbarMenu";

export default function Home() {
  return <main className="flex">
    <NavbarMenu />
    <Content />
  </main>
}