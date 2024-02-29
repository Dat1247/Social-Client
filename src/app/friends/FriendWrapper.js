'use client'
import React from "react";
import ReduxFriendProvider from "@/redux/providers/ReduxFriendProvider";
import { FriendPage } from "./FriendPage";

export default function FriendWrapper() {
  return <ReduxFriendProvider>
    <FriendPage />
  </ReduxFriendProvider>;
}
