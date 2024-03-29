import { NavbarMenu } from "@/components/NavbarMenu";
import React from "react";

const Notification = () => {
  return <div className="flex">
      <NavbarMenu />
      <div className="h-screen w-0.5 shadow-3xl bg-slate-600"></div>
      <div>
        Notifications
      </div>
    </div>
};

export default Notification;
