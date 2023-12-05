import React from "react";
import InputPost from "./InputPost/InputPost";
import ListPosts from "./ListPosts/ListPosts";

export const Content = () => {
  return <div className="flex-grow py-8 px-10 max-h-screen overflow-y-scroll ">
    <div className="flex flex-col items-center">
      <InputPost />
      <ListPosts />
      
    </div>
  </div>;
};
