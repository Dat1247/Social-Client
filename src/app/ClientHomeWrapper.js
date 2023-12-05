'use client'
import { Content } from "@/components/Content";
import ReduxProvider from "@/redux/ReduxProvider";
import React from "react";

export default function ClientHomeWrapper() {
  return <ReduxProvider>
    <Content />
  </ReduxProvider>;
}
