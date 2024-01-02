'use client'
import { Content } from "@/components/Content";
import { ModalPost } from "@/components/ModalPost/ModalPost";
import { NavbarMenu } from "@/components/NavbarMenu";
import ReduxProvider from "@/redux/ReduxProvider";
import React from "react";

export default function ClientHomeWrapper() {
  return <ReduxProvider>
    <div className="flex">
      <NavbarMenu />
      <div className="h-screen w-0.5 shadow-3xl bg-slate-600"></div>
      <Content />
    </div>
    <ModalPost />
  </ReduxProvider>;
}
