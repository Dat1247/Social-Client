"use client"

import React, { Fragment, useEffect, useState } from "react";
import {AiOutlineMore, AiFillLike, AiOutlineLike } from 'react-icons/ai';
import {BsChatSquare, BsDot} from 'react-icons/bs';
import { MdOutlineEdit } from "react-icons/md";
import { LiaTrashSolid } from "react-icons/lia";
import { TiWorld } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import {Popconfirm, Popover} from 'antd';
import moment from "moment";
import { IMAGE_URL, STATUS_CODE, TIME_OF_DATE_TO_MILLISECONDS } from "@/util/config";
import { PostService } from "@/services/PostService";
import { getPosts } from "./ListPosts/ListPosts";
import { getArrPosts, openInputPostModal, openPostModal, setPostIdEdit, setPostIdOfModal } from "@/redux/features/postSlice";
import { useAppDispatch } from "@/redux/stores/homeStore";
import { Notification } from "./Notification/Notification";
import { CustomProvider } from "./CustomProvider/CustomProvider";

export const getLikesOfPost = async(idPost) => {
    const {data, status} = await PostService.getLikeOfPost(idPost);
    if(status === STATUS_CODE.SUCCESS) {
        return data;
    }
    return [];
};

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
            
        }).catch(err => console.log(`err: ${err}`));
    }, [post]);

      const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
      };

    const handleChangeLike = async() => {
        try {
            const {data, status} = await PostService.likePost(post.postID);

            if(status === STATUS_CODE.SUCCESS) {
                getPosts().then(res => {
                    dispatch(getArrPosts(res));
                });
                setIsYourLike(data?.isLike);
            }

        } catch(err) {
            console.log(err);
        }
    }
    const handleClickComment = () => {
        dispatch(openPostModal());
        dispatch(setPostIdOfModal(post.postID));
    }

    const deletePost = async () => {
        try {
            const result = await PostService.deletePost(post?.postID);

            if(result.status === STATUS_CODE.SUCCESS) {
                getPosts().then(res => {
                    dispatch(getArrPosts(res));
                });
                Notification("success", "Deleted posts successfully!");
                setOpen(false);
            }
        } catch(err) {
            console.log(err);
            Notification("error", "Deleted posts failed!", err?.response.data);

        }
    }

    const showLikesPost = () => {
        return isYourLike ? <AiFillLike className="cursor-pointer text-lg text-sky-400" onClick={handleChangeLike} /> : <AiOutlineLike className="cursor-pointer text-lg" onClick={handleChangeLike} />
    }

  return <div className="max-w-md w-96 my-5">
    <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
            <div>
                <img width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={'/default-img/avatar.jpg'} alt="avatar" />
            </div>
            <div className="flex ml-3 flex-col">
                <p className="font-bold cursor-pointer">{post?.authorName}</p>
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
            <CustomProvider>
                <Popover
                    content={
                        <Fragment>
                            <div className="flex gap-1 items-center cursor-pointer hover:bg-slate-700 px-2 py-1 rounded-md" onClick={() => {
                                dispatch(setPostIdEdit(post.postID))
                                dispatch(openInputPostModal());
                                setOpen(false);
                            }}>
                                <MdOutlineEdit />
                                <span className="text-sm">
                                    Edit
                                </span>
                            </div>
                            <Popconfirm
                                title="Are you sure to delete this post?"
                                onConfirm={() => {
                                    deletePost()
                                }}
                                okText="Yes"
                                cancelText="No"
                                className="flex gap-1 items-center mt-1 cursor-pointer popoverDelete hover:bg-slate-700 px-2 py-1 rounded-md"
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
            </CustomProvider>
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
                    {post?.authorName} 
                </span>
                {post.content.split("\r\n").map((ch) => {
                    return <Fragment key={ch} >
                        <>{ch}</> <br />
                    </Fragment>
                })}
            </p>
        </div>
    </div>
    <div>
        <div className="flex items-center gap-1">
            {showLikesPost()}
            <BsChatSquare className="cursor-pointer text-lg" onClick={handleClickComment} />
        </div>
        <div className="my-2">
            <p className="font-semibold text-sm cursor-pointer mb-2">{post.numberOfLike} likes</p>
            <p className="text-slate-400 cursor-pointer text-sm" onClick={() => {
                dispatch(openPostModal())
                dispatch(setPostIdOfModal(post.postID))
            }}>
                {post.numberOfComment === 0 ? 'No have comment!' : `View all ${post.numberOfComment} comments` }
            </p>
        </div>

        <div className="h-0.5 w-full mt-5 bg-slate-600" />
    </div>
  </div>;
};
