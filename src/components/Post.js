"use client"

import Image from "next/image";
import React, { useState } from "react";
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {BsChatSquare, BsDot} from 'react-icons/bs'


export const Post = ({post}) => {
    const [isLike, setIsLike] = useState(false)

    const handleChangeLike = () => {
        setIsLike(!isLike)
    }
    const handleClickComment = () => {
        console.log("Get comments")
    }

  return <div className="max-w-md w-96 my-5">
    <div className="flex items-center mb-5">
        <div>
            <Image width={20} height={20} className="w-10 h-10 rounded-full" src={'/default-img/avatar.jpg'} alt="avatar" />
        </div>
        <div className="flex items-center ml-3">
            <p className="font-bold">takeiteasy</p>
            <BsDot />
            <p className="text-sm text-slate-400">2h ago</p>
        </div>
    </div>
    <div className="mb-5">
        <div className="mb-3">
            <img className="w-full" src={'/default-img/post.jpg'} alt="image" />
        </div>
        <div>
            <p> 
                <span className="font-bold mr-1">
                    takeiteasy 
                </span>
                {post.content}
            </p>
        </div>
    </div>
    <div>
        <div className="flex items-center gap-1">
            {isLike ? <AiFillHeart className="cursor-pointer text-lg text-red-600" onClick={handleChangeLike} /> : <AiOutlineHeart className="cursor-pointer text-lg" onClick={handleChangeLike} />}
            <BsChatSquare className="cursor-pointer text-lg" onClick={handleClickComment} />
        </div>
        <div className="my-2">
            <p className="font-semibold text-sm cursor-pointer mb-2">{post.numberOfLike} likes</p>
            <p className="text-slate-400 cursor-pointer text-sm">
                {post.numberOfComment === 0 ? 'No have comment!' : `View all ${post.numberOfComment} comments` }
            </p>
        </div>
        <form>
            <input className="border-none outline-none text-sm pr-2 py-1 rounded-t bg-transparent" placeholder="Add a comment..." />
        </form>

        <div className="h-0.5 w-full mt-5 bg-slate-600" />
    </div>
  </div>;
};
