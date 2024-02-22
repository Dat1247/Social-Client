import { NavbarMenu } from "@/components/NavbarMenu";
import React from "react";

export default function Notify() {
  return <div className="flex">
      <NavbarMenu />
      <div className="h-screen w-0.5 shadow-3xl bg-slate-600"></div>
      <div>
        Friends
      </div>
    </div>
};
