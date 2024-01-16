import React, { useState } from "react";
import {BsThreeDots } from 'react-icons/bs';
import moment from "moment";
import { Tooltip, Popover } from 'antd';

import { STATUS_CODE, TIME_OF_DATE_TO_MILLISECONDS } from "@/util/config";
import { PostService } from "@/services/PostService";
import { Notification } from "../Notification/Notification";
import { getPosts } from "../ListPosts/ListPosts";
import { getArrPosts, setPostDetailById } from "@/redux/features/postSlice";
import { useAppDispatch } from "@/redux/store";
import { getPostDetailById } from "./ModalPost";
import { CustomProvider } from "../CustomProvider/CustomProvider";

export const Comment = ({arrComments, idPost}) => {
  const dispatch = useAppDispatch();
  const handleEditComment = () => {

  }

  const handleDeleteComment = async(id) => {
    try {
      const result = await PostService.deleteComment(id);

      if(result.status === STATUS_CODE.SUCCESS) {
        Notification("success", result?.data?.message);
        getPosts().then(res => {
          dispatch(getArrPosts(res))
        });
        getPostDetailById(idPost).then(res => {
          dispatch(setPostDetailById(res))
        });
      }
    } catch (err) {
      Notification("error", err?.response.data)
    }
  }

    return arrComments?.map((comment) => {
        return <div key={comment.idComment} className="my-1">
            <div>
              <div className="flex gap-2 items-start">
                <div className="">
                  <img width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={`${comment.authorAvatarComment}`} alt="avatar" />
                </div>
                <div className="">
                  <div className="flex items-center gap-2">
                    <CustomProvider>
                      <Tooltip 
                          placement="right" 
                          color="transparent" 
                          arrow={false} 
                          overlayInnerStyle={{boxShadow: "unset"}}
                          title={<div>
                                  <Popover placement="right" trigger={"click"} content={<div className="rounded-lg">
                                      <div className="cursor-pointer hover:bg-slate-700 text-white px-3 py-1 rounded-md" onClick={handleEditComment}>Edit comment</div>
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
                          <div className="content-comment bg-slate-500 py-2 px-3 rounded-2xl text-sm flex flex-col flex-wrap max-w-lg">
                          <p className="font-bold cursor-pointer text-ssm">
                              {comment.authorNameComment}
                          </p>
                          <p>
                              {comment.contentComment}
                          </p>
                          </div>
                      </Tooltip>
                    </CustomProvider>
                  </div>
                    <div className="flex items-center gap-4 text-xs tracking-wider pt-0.5 ml-4">
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
                </div>
              </div>
            </div>
          </div>
      })
};
