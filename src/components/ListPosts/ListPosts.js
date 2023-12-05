'use client'
import React, { useEffect, useRef } from "react";
import { Post } from "../Post";
import arrPost from '../../posts.json'
import { useDispatch, useSelector } from "react-redux";
import { PostService } from "@/services/PostService";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getArrPosts } from "@/redux/features/postSlice";

const getPosts = async() => {
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
        // async function getPosts() {
        //     try {
        //         const res = await PostService.getPosts();
        //         const data = await res.data;
        //         dispatch(getArrPosts(data));

        //     } catch(err) {
        //         console.log(err);
        //     }
        // }
        const data = getPosts().then((res) => {
            dispatch(getArrPosts(res));
        })
    }, [dispatch])

    console.log({arrPost})
    return <>
    List post
        {arrPost?.map((post, index) => {
            return <div key={index}>
                <Post post={post} />
            </div>
      })}
    </>
}
