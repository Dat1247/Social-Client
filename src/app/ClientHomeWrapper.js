'use client'
import ReduxProvider from "@/redux/providers/ReduxProvider";
import React from "react";
import { HomePage } from "./HomePage";

export default function ClientHomeWrapper() {
  return <ReduxProvider>
    <HomePage />
  </ReduxProvider>;
}
