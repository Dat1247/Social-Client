"use client"

import Image from "next/image";
import React, { Fragment, useState } from "react";
import {AiOutlineHeart, AiFillHeart, AiOutlineMore } from 'react-icons/ai';
import {BsChatSquare, BsDot} from 'react-icons/bs';
import { MdOutlineEdit } from "react-icons/md";
import { LiaTrashSolid } from "react-icons/lia";
import {Popover} from 'antd'

export const Post = ({post}) => {
    const [isLike, setIsLike] = useState(false);
    const [open, setOpen] = useState(false);
    const hide = () => {
      setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };

    const handleChangeLike = () => {
        setIsLike(!isLike)
    }
    const handleClickComment = () => {
        console.log("Get comments")
    }

  return <div className="max-w-md w-96 my-5">
    <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
            <div>
                <Image width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={'/default-img/avatar.jpg'} alt="avatar" />
            </div>
            <div className="flex items-center ml-3">
                <p className="font-bold cursor-pointer">{post?.name}</p>
                <BsDot />
                <p className="text-sm text-slate-400">2h ago</p>
            </div>
        </div>
        <div>
        <Popover
            content={
                <Fragment>
                    <div className="flex gap-1 items-center cursor-pointer">
                        <MdOutlineEdit />
                        <span className="text-sm">
                            Edit
                        </span>
                    </div>
                    <div className="flex gap-1 items-center mt-1 cursor-pointer">
                        <LiaTrashSolid />
                        <span className="text-sm">
                            Delete
                        </span>
                    </div>
                </Fragment>
            }
            title=""
            trigger="click"
            placement="bottom"
        >
            <button type="primary">
                <AiOutlineMore className="hover:text-slate-400" />
            </button>
        </Popover>

        </div>
    </div>
    <div className="mb-5">
        <div className="mb-3">
            <img className="w-full" src={'/default-img/post.jpg'} alt="image" />
        </div>
        <div>
            <p> 
                <span className="font-bold mr-1 cursor-pointer">
                    {post?.name} 
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
            <p className="font-semibold text-sm cursor-pointer mb-2">{post.likes} likes</p>
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
