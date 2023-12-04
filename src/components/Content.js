"use client"

import React, { useEffect } from "react";
import arrPost from '../posts.json'
import { Post } from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { Button, notification } from "antd";
// import { getArrayPost } from "@/redux/features/postSlice";




export const Content = () => {
  // const arrPosts = useSelector((state) => state.postReducer)
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getArrayPost(arrPost))
  // }, [dispatch])

  // console.log({arrPosts})


  return <div className="flex-grow py-8 px-10 max-h-screen overflow-y-scroll ">
    <div className="flex flex-col items-center">
      List post
      {/* {arrPost?.map((post, index) => {
        return <div key={index}>
          <Post post={post} />
        </div>
      })} */}
    </div>
  </div>;
};
