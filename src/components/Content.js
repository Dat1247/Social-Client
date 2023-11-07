import React from "react";
import arrPost from '../posts.json'
import { Post } from "./Post";



export const Content = () => {
  console.log('post', arrPost)
  return <div className="flex-grow py-8 px-10 max-h-screen overflow-y-scroll ">
    <div className="flex flex-col items-center">
      {arrPost?.map((post, index) => {
        return <div key={index}>
          <Post />
        </div>
      })}
    </div>
  </div>;
};
