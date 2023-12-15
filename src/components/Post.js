"use client"

import Image from "next/image";
import React, { Fragment, useState } from "react";
import {AiOutlineHeart, AiFillHeart, AiOutlineMore } from 'react-icons/ai';
import {BsChatSquare, BsDot} from 'react-icons/bs';
import { MdOutlineEdit } from "react-icons/md";
import { LiaTrashSolid } from "react-icons/lia";
import { TiWorld } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import {Button, Popconfirm, Popover} from 'antd';
import moment from "moment";
import { IMAGE_URL, STATUS_CODE } from "@/util/config";
import { PostService } from "@/services/PostService";
import { getPosts } from "./ListPosts/ListPosts";
import { getArrPosts } from "@/redux/features/postSlice";
import { useAppDispatch } from "@/redux/store";
import { Notification } from "./Notification/Notification";

export const Post = ({post}) => {
    const [isLike, setIsLike] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch()
    let changeViewMode = post?.viewMode;
    console.log({post})

      const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
      };

    const handleChangeLike = () => {
        setIsLike(!isLike)
    }
    const handleClickComment = () => {
        console.log("Get comments")
    }

    const deletePost = async () => {
        try {
            const result = await PostService.deletePost(post?.postID)

            if(result.status === STATUS_CODE.SUCCESS) {
                getPosts().then(res => {
                    dispatch(getArrPosts(res))
                  })
                Notification("success", "Deleted posts successfully!");
                setOpen(false);
            }
        } catch(err) {
            console.log(err);
            Notification("error", "Deleted posts failed!", err?.response.data);

        }
    }

  return <div className="max-w-md w-96 my-5">
    <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
            <div>
                <Image width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={'/default-img/avatar.jpg'} alt="avatar" />
            </div>
            <div className="flex ml-3 flex-col">
                <p className="font-bold cursor-pointer">{post?.name}</p>
                <div className="flex items-center text-sm text-slate-400">
                    <p className="">
                        {moment(post?.updatedAt).startOf('hour').fromNow()}
                    </p>
                    <BsDot />
                    <span>{(changeViewMode === 'only me') || (changeViewMode === 'Only me') ? <TbLock /> : (changeViewMode === 'friends') || (changeViewMode === 'Friend') ? <FaUserFriends /> : <TiWorld />}</span>
                </div>
            </div>
        </div>
        <div>
        <Popover
            content={
                <Fragment>
                    <div className="flex gap-1 items-center cursor-pointer" onClick={() => {
                        console.log("Edit")
                    }}>
                        <MdOutlineEdit />
                        <span className="text-sm">
                            Edit
                        </span>
                    </div>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this post?"
                        onConfirm={() => {
                            deletePost()
                        }}
                        okText="Yes"
                        cancelText="No"
                        className="flex gap-1 items-center mt-1 cursor-pointer popoverDelete"
                    >
                        <LiaTrashSolid />
                        <span className="text-sm">
                            Delete
                        </span>
                    </Popconfirm>
                </Fragment>
            }
            title=""
            trigger="click"
            placement="bottom"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <button type="primary">
                <AiOutlineMore className="hover:text-slate-400" />
            </button>
        </Popover>

        </div>
    </div>
    <div className="mb-5">
        <div className="mb-3 grid grid-cols-3 gap-2 ">
            {post?.FileUpload.map((file, index) => {
                return <img className="w-full" src={`${IMAGE_URL}${file}`} alt="image" key={index} />
            })}
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
