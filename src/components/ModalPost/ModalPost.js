'use client'
import React, { Fragment, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt, FaUserFriends } from "react-icons/fa";
import {BsDot} from 'react-icons/bs';
import { TiWorld } from "react-icons/ti";
import { TbLock } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/redux/stores/homeStore";
import { closePostModal, getArrPosts, setIsEditComment, setPostDetailById } from "@/redux/features/postSlice";
import { PostService } from "@/services/PostService";
import { IMAGE_URL, STATUS_CODE, TIME_OF_DATE_TO_MILLISECONDS, USER_LOGIN } from "@/util/config";
import moment from "moment";
import { getPosts } from "../ListPosts/ListPosts";
import { getLikesOfPost } from "../Post";
import { Comments } from "./Comments";

export const getPostDetailById = async(id) => {
  try {
    const res = await PostService.getPostById(id);
    const data = await res.data;
    return data
  } catch (err) {
    console.log(err);
  }
}

export const ModalPost = () => {
  const [userProfile, setUserProfile] = useState({});
  const [isYourLike, setIsYourLike] = useState(false);
  const [contentComment, setContentComment] = useState("");
  const { postIdOfModal, postDetailById } = useAppSelector(state => state.postSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem(USER_LOGIN)));
  }, [])

  useEffect(() => {
    getPostDetailById(postIdOfModal).then((res) => {
      dispatch(setPostDetailById(res));
    });
  }, [postIdOfModal, dispatch]);

  useEffect(() => {
    getLikesOfPost(postIdOfModal).then(res => {
        const result = res.findIndex(like => like.userID === userProfile.id);
        if(result === -1) {
            setIsYourLike(false);
        } else {
            setIsYourLike(true);
        }
    }).catch(err => console.log(`err: ${err}`));
}, [postIdOfModal, userProfile]);

  const handleChangeLike = async() => {
    try {
        const {data, status} = await PostService.likePost(postDetailById.postID);
        if(status === STATUS_CODE.SUCCESS) {
            getPosts().then(res => {
              dispatch(getArrPosts(res));
            });
            getPostDetailById(postIdOfModal).then(res => {
              dispatch(setPostDetailById(res));
            });
            setIsYourLike(data?.isLike);
        }
    } catch(err) {
        console.log(err);
    }
}

  const renderImage = () => {
    return postDetailById?.FileUpload?.length > 0 ? <div className="mb-3 grid grid-cols-3 gap-2">
      {postDetailById?.FileUpload.map((image, index) => {
        return <img className="w-full" src={`${IMAGE_URL}${image}`} alt="Image's post" key={index} />
      })}
    </div> : <></>
  }

  const handleChangeComment = (e) => {
    setContentComment(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
      try {
        const {data, status} = await PostService.createComment({
          content: contentComment,
          postID: postDetailById.postID
        }, postDetailById.postID);
        if(status === STATUS_CODE.CREATED) {
          getPosts().then(res => {
            dispatch(getArrPosts(res));
          });
          getPostDetailById(postIdOfModal).then(res => {
            dispatch(setPostDetailById(res));
          });
          setContentComment("");
        }
      } catch (err) {
        console.log("Error ", err)
      }
  }

  return <div className="w-screen h-screen absolute top-0 left-0 bg-black-0.5">
    <div className="flex justify-center items-center w-full h-full">
        <div className="max-w-700px bg-slate-600 text-white min-h-560px min-w-500px rounded-2xl">
            <div className="py-3 flex items-center justify-center relative">
              <span className="text-xl font-bold tracking-wider">
                {`${postDetailById?.authorName}'s Post`}
              </span>
              <button className="absolute top-2 right-2 text-3xl flex items-center justify-center rounded-full w-9 h-9 bg-slate-500 text-white hover:bg-slate-400 duration-150" onClick={() => {
                dispatch(closePostModal());
                dispatch(setIsEditComment(false));
              }}><IoIosClose /></button>
            </div>
            <hr className="h-px bg-stone-500" />
            <div className=" max-h-750px overflow-y-auto">
              <div className="min-h-180px">
                <div>
                  <div className="flex items-center mt-4 mx-4">
                    <div>
                        <img width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={postDetailById?.authorAvatar} alt="avatar" />
                    </div>
                    <div className="flex ml-3 flex-col">
                        <p className="font-bold cursor-pointer">{"Admin"}</p>
                        <div className="flex items-center text-sm text-slate-400">
                            <p className="">
                                {moment(new Date()).valueOf() - moment(postDetailById?.updatedAt).valueOf() < TIME_OF_DATE_TO_MILLISECONDS ? moment(postDetailById?.updatedAt).fromNow().valueOf() : moment(postDetailById?.updatedAt).format("DD/MM/YYYY HH:mm")}
                            </p>
                            <BsDot />
                            <span>{(postDetailById?.ViewMode === 'only me') || (postDetailById?.ViewMode === 'Only me') ? <TbLock /> : (postDetailById?.ViewMode === 'friends') || (postDetailById?.ViewMode === 'Friend') ? <FaUserFriends /> : <TiWorld />}</span>
                        </div>
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="mx-4 mb-2">
                      {postDetailById?.content?.split("\r\n").map((ch) => {
                        return <Fragment key={ch} >
                            <>{ch}</> <br />
                        </Fragment>
                      })}
                    </p>
                    {renderImage()}
                  </div>
                </div>
              </div>
              <div className="mx-4">
                <div className="flex justify-between items-center text-sm py-2.5">
                  <div className="flex items-center gap-1">
                    <AiFillLike className={isYourLike ? "text-sky-400" : ""} />
                    <span>{postDetailById?.numberLike}</span>
                  </div>
                  <div>
                    {postDetailById?.numberComment === 0 
                      ? "No have comment" 
                      : postDetailById?.numberComment > 1
                        ? `${postDetailById?.numberComment} comments`
                        : `${postDetailById?.numberComment} comment`
                    }
                  </div>
                </div>
                <hr className="h-px bg-stone-500" />
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="px-0.5 py-1.5">
                    <div className="text-center hover:bg-slate-500 cursor-pointer rounded-md leading-8 duration-300 flex items-center justify-center gap-1" onClick={handleChangeLike}>
                      {isYourLike ? <div className="text-sky-400 flex items-center justify-center gap-1"><AiFillLike className="text-lg" /> Liked </div> : <><AiOutlineLike className="text-lg" /> Like </>}
                    </div>
                  </div>
                  <div className="px-0.5 py-1.5">
                    <div className="text-center hover:bg-slate-500 cursor-pointer rounded-md leading-8 duration-300 flex items-center justify-center gap-1">
                      <FaRegCommentAlt />
                      Comment
                    </div>
                  </div>
                </div>
                <hr className="h-px bg-stone-900" />
              </div>
              <div>
                <div className="mx-4 py-3">
                  <Comments arrComments={postDetailById?.comments} idPost={postDetailById?.postID} userProfile={userProfile} />
                </div>
              </div>
            </div>
            <div className="mx-4 mb-4">
              <div className="flex gap-2 items-start">
                <div>
                  {userProfile.avatar && <img className="w-10 h-10 max-w-none rounded-full cursor-pointer" src={userProfile?.avatar} alt="avatar" />}
                </div>
                <div className="bg-slate-500 py-2 px-3 rounded-2xl text-sm flex flex-wrap flex-grow">
                  <form onSubmitCapture={handleSubmit} className="flex-grow">
                    <input className="w-11/12 py-1.5 bg-transparent outline-none" value={contentComment} onChange={handleChangeComment} />
                  </form>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>;
};
