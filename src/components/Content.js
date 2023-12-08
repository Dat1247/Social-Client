import React from "react";
import InputPost from "./InputPost/InputPost";
import ListPosts from "./ListPosts/ListPosts";
import { useAppSelector } from "@/redux/store";
import { USER_LOGIN } from "@/util/config";

export const Content = () => {
  // const {userLogin} = useAppSelector(state => state.userSlice);

  return <div className="flex-grow py-8 px-10 max-h-screen overflow-y-scroll ">
    <div className="flex flex-col items-center">
      <InputPost />
      <ListPosts />
      
    </div>
  </div>;
};
