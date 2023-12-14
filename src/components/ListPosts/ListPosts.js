'use client'
import React, { Suspense, useEffect } from "react";
import { Post } from "../Post";
import { PostService } from "@/services/PostService";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getArrPosts } from "@/redux/features/postSlice";

export const getPosts = async() => {
    try {
        const res = await PostService.getPosts();
        const data = await res.data;
        return data;
    } catch(err) {
        console.log(err);
    }
}

export default function ListPosts() {
    
    const {arrPost} = useAppSelector(state => state.postSlice)
    const dispatch = useAppDispatch();
    

    useEffect(() => {
        const data = getPosts().then((res) => {
            dispatch(getArrPosts(res));
        })
    }, [dispatch])

    return <>
        {arrPost?.map((post, index) => {
            return <div key={index}>
                <Suspense fallback={<>
                    <div className="glimmer-panel max-w-md w-96">
                        <div className="glimmer-line" />
                        <div className="glimmer-line" />
                        <div className="glimmer-line" />
                    </div>
                </>}>
                    <Post post={post} />
                </Suspense>
            </div>
      })}
    </>
}
