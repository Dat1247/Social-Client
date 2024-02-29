import React from "react";
import InputPost from "../InputPost/InputPost";
import ListPosts from "../ListPosts/ListPosts";
import { useAppSelector } from "@/redux/stores/homeStore";
import { ModalInputPost } from "../InputPost/ModalInputPost";

export const Content = () => {
  const {isShowInputPostModal} = useAppSelector(state => state.postSlice)

  return <div className="flex-grow py-8 px-10 max-h-screen overflow-y-scroll ">
    <div className="flex flex-col items-center">
      <InputPost />
      <ListPosts />
      {isShowInputPostModal && <ModalInputPost />}
    </div>
  </div>;
};
