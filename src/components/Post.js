"use client"

import React, { Fragment, useEffect, useState } from "react";
import {AiOutlineHeart, AiFillHeart, AiOutlineMore } from 'react-icons/ai';
import {BsChatSquare, BsDot} from 'react-icons/bs';
import { MdOutlineEdit } from "react-icons/md";
import { LiaTrashSolid } from "react-icons/lia";
import { TiWorld } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import {Button, Popconfirm, Popover} from 'antd';
import moment from "moment";
import { IMAGE_URL, STATUS_CODE, TIME_OF_DATE_TO_MILLISECONDS } from "@/util/config";
import { PostService } from "@/services/PostService";
import { getPosts } from "./ListPosts/ListPosts";
import { getArrPosts } from "@/redux/features/postSlice";
import { useAppDispatch } from "@/redux/store";
import { Notification } from "./Notification/Notification";

const getLikesOfPost = async(idPost) => {
    const {data, status} = await PostService.getLikeOfPost(idPost);
    if(status === STATUS_CODE.SUCCESS) {
        return data;
    }
    return []
}

export const Post = ({post, userProfile}) => {
    const [open, setOpen] = useState(false);
    const [isYourLike, setIsYourLike] = useState(false);

    const dispatch = useAppDispatch();
    useEffect(() => {
        const data = getLikesOfPost(post.postID);
        data.then(res => {
            const result = res.findIndex(like => like.userID === userProfile.id);
            if(result === -1) {
                setIsYourLike(false);
            } else {
                setIsYourLike(true);
            }
            
        }).catch(err => console.log(`err: ${err}`))
    }, [post]);

      const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
      };

    const handleChangeLike = async() => {
        try {
            const {data, status} = await PostService.likePost(post.postID);

            console.log({data, status})
            if(status === STATUS_CODE.SUCCESS) {
                getPosts().then(res => {
                    dispatch(getArrPosts(res))
                });
                setIsYourLike(data?.isLike)
            }

        } catch(err) {
            console.log(err)
        }
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

    const showLikesPost = () => {
        return isYourLike ? <AiFillHeart className="cursor-pointer text-lg text-red-600" onClick={handleChangeLike} /> : <AiOutlineHeart className="cursor-pointer text-lg" onClick={handleChangeLike} />
    }

    // console.log("Liked: ", isYourLike, " post: ", post)

  return <div className="max-w-md w-96 my-5">
    <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
            <div>
                <img width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={'/default-img/avatar.jpg'} alt="avatar" />
            </div>
            <div className="flex ml-3 flex-col">
                <p className="font-bold cursor-pointer">{post?.name}</p>
                <div className="flex items-center text-sm text-slate-400">
                    <p className="">
                        {moment(new Date()).valueOf() - moment(post?.updatedAt).valueOf() < TIME_OF_DATE_TO_MILLISECONDS ? moment(post?.updatedAt).fromNow().valueOf() : moment(post?.updatedAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                    <BsDot />
                    <span>{(post?.ViewMode === 'only me') || (post?.ViewMode === 'Only me') ? <TbLock /> : (post?.ViewMode === 'friends') || (post?.ViewMode === 'Friend') ? <FaUserFriends /> : <TiWorld />}</span>
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
            {showLikesPost()}
            <BsChatSquare className="cursor-pointer text-lg" onClick={handleClickComment} />
        </div>
        <div className="my-2">
            <p className="font-semibold text-sm cursor-pointer mb-2">{post.likes} likes</p>
            <p className="text-slate-400 cursor-pointer text-sm">
                {post.numberOfComment === 0 ? 'No have comment!' : `View all ${post.numberOfComment} comments` }
            </p>
        </div>
        <form onSubmitCapture={(e) => {
            e.preventDefault();
            console.log(e.currentTarget);
        }}>
            <input className="border-none outline-none text-sm pr-2 py-1 rounded-t bg-transparent" placeholder="Add a comment..." />
            <button type="submit">Create</button>
        </form>

        <div className="h-0.5 w-full mt-5 bg-slate-600" />
    </div>
  </div>;
};
