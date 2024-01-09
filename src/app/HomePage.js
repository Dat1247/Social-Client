import { Content } from "@/components/Content";
import { ModalPost } from "@/components/ModalPost/ModalPost";
import { NavbarMenu } from "@/components/NavbarMenu";
import { useAppSelector } from "@/redux/store";
import React from "react";

export const HomePage = () => {
  const {isShowPostModal} = useAppSelector(state => state.postSlice)

  return <>
    <div className="flex">
      <NavbarMenu />
      <div className="h-screen w-0.5 shadow-3xl bg-slate-600"></div>
      <Content />
    </div>
    {isShowPostModal && <ModalPost />}
  </>;
};
