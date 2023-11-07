import React from "react";
import arrPost from '../posts.json'
import { Post } from "./Post";



export const Content = () => {
  console.log('post', arrPost)
  return <div className="flex-grow py-8 px-10 ">
    <div className="flex flex-col items-center">
      Content
      <Post />
    </div>
  </div>;
};
