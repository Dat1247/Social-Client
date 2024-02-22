import React, { useEffect, useState } from "react";
import {BsThreeDots } from 'react-icons/bs';
import moment from "moment";
import { Tooltip, Popover } from 'antd';
import { STATUS_CODE, TIME_OF_DATE_TO_MILLISECONDS } from "@/util/config";
import { PostService } from "@/services/PostService";
import { Notification } from "../Notification/Notification";
import { getPosts } from "../ListPosts/ListPosts";
import { getArrPosts, setIdEditComment, setIsEditComment, setPostDetailById } from "@/redux/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getPostDetailById } from "./ModalPost";
import { CustomProvider } from "../CustomProvider/CustomProvider";

export const Comments = ({arrComments, idPost, userProfile}) => {
  const { isEditComment, idEditComment } = useAppSelector(state => state.postSlice);
  const [commentEdit, setCommentEdit] = useState("");
  const dispatch = useAppDispatch();
  const handleEditComment = (comment) => {
    if(comment.authorCommentId !== userProfile.id) {
      Notification("error", "You don't have authorized to edit this comment!")
      return;
    }
    console.log("edit", comment);
    dispatch(setIsEditComment(true));
    dispatch(setIdEditComment(comment.idComment));
    setCommentEdit(comment.contentComment);
  }

  const handleDeleteComment = async(id) => {
    try {
      const result = await PostService.deleteComment(id);

      if(result.status === STATUS_CODE.SUCCESS) {
        Notification("success", result?.data?.message);
        getPosts().then(res => {
          dispatch(getArrPosts(res));
        });
        getPostDetailById(idPost).then(res => {
          dispatch(setPostDetailById(res));
        });
      }
    } catch (err) {
      Notification("error", err?.response.data);
    }
  }

  const handleChangeEditComment = (e) => {
    setCommentEdit(e.target.value);
  }

  const handleSubmitEditComment = async(e, comment) => {
    e.preventDefault();
    try {
      let objComment = {...comment, content: commentEdit}
      const result = await PostService.updateComment(comment.idComment, objComment);
      
      if(result.status === STATUS_CODE.SUCCESS) {
        console.log("Submit edit comment", commentEdit);
        getPostDetailById(idPost).then((res) => {
          dispatch(setPostDetailById(res));
        });
      }
    } catch (err) {
      console.log("Can't edit comment ", err);

    }
    dispatch(setIsEditComment(false));
  }

    return arrComments?.map((comment) => {
        return <div key={comment.idComment} className="my-1">
            <div>
              <div className="flex gap-2 items-start">
                <div className="">
                  <img width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={`${comment.authorAvatarComment}`} alt="avatar" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <CustomProvider>
                      <Tooltip 
                          placement="right" 
                          color="transparent" 
                          arrow={false} 
                          overlayInnerStyle={{boxShadow: "unset"}}
                          title={<div>
                                  <Popover placement="right" trigger={"click"} content={<div className="rounded-lg">
                                      <div className="cursor-pointer hover:bg-slate-700 text-white px-3 py-1 rounded-md" onClick={() => {
                                        handleEditComment(comment)
                                      }
                                      }>Edit comment</div>
                                      <div className="cursor-pointer hover:bg-slate-700 text-white px-3 py-1 rounded-md" onClick={() => {
                                        handleDeleteComment(comment.idComment)
                                      }}>Delete comment</div>
                                  </div>}>
                                      <div className="cursor-pointer hover:bg-slate-700 p-2 rounded-full text-white">
                                        <BsThreeDots /> 
                                      </div>
                                  </Popover>
                              </div>
                          }
                      >
                        {
                          isEditComment && idEditComment === comment.idComment
                          ? <form className="w-full bg-slate-500 py-2 px-3 rounded-2xl text-sm flex flex-wrap max-w-lg" onSubmit={(e) => {
                            handleSubmitEditComment(e, comment);
                          }}>
                              <input className="flex-grow py-1.5 bg-transparent outline-none" defaultValue={comment.contentComment} onChange={handleChangeEditComment} />
                            </form>
                          : <>
                              <div className="content-comment bg-slate-500 py-2 px-3 rounded-2xl text-sm flex flex-col flex-wrap max-w-lg">
                              <p className="font-bold cursor-pointer text-ssm">
                                  {comment.authorNameComment}
                              </p>
                              <p>
                                  {comment.contentComment}
                              </p>
                              </div>
                            </>
                        }
                      </Tooltip>
                    </CustomProvider>
                  </div>
                    {
                      isEditComment && idEditComment === comment.idComment
                      ? <div>
                          <button className="font-semibold cursor-pointer tracking-wider text-red-500 hover:underline hover:text-red-800 text-xs" onClick={() => {
                            dispatch(setIsEditComment(false))
                          }}>Cancel</button>
                        </div>
                      : <div className="flex items-center gap-4 text-xs tracking-wider pt-0.5 ml-4">
                          <div className="font-semibold cursor-pointer hover:underline">
                            Like
                          </div>
                          <div className="font-semibold cursor-pointer hover:underline">
                            Reply
                          </div>
                          <div className="text-slate-300 tracking-normal">
                            {moment(new Date()).valueOf() - moment(comment?.updatedAtComment).valueOf() < TIME_OF_DATE_TO_MILLISECONDS ? moment(comment?.updatedAtComment).fromNow().valueOf() : moment(comment?.updatedAtComment).format("DD/MM/YYYY HH:mm")}
                          </div>
                        </div>
                    }
                </div>
              </div>
            </div>
          </div>
      })
};
