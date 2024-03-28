import { closeChangeStatusPostModal, getArrPosts, setPostDetailById } from "@/redux/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/stores/homeStore";
import React, { useEffect, useState } from "react";
import { Input, Radio, Space } from 'antd';
import { IoIosClose } from "react-icons/io";
import { getPostDetailById } from "../ModalPost/ModalPost";
import { optionsStatus } from "../InputPost/InputPost";
import { PostService } from "@/services/PostService";
import { STATUS_CODE } from "@/util/config";
import { Notification } from "../Notification/Notification";
import { getPosts } from "../ListPosts/ListPosts";

export const ModalChangeStatusPost = () => {
  const { idChangeStatusPostModal, postDetailById, currentStatusPost } = useAppSelector(state => state.postSlice)
  const [value, setValue] = useState(currentStatusPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getPostDetailById(idChangeStatusPostModal).then((res) => {
      dispatch(setPostDetailById(res));
    });
  }, [dispatch, idChangeStatusPostModal]);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  console.log({postDetailById})

  return <div className="w-screen h-screen absolute top-0 left-0 bg-black-0.5">
    <div className="flex justify-center items-center w-full h-full">
      <div className="max-w-xl bg-slate-700 text-white min-h-fit min-w-350px rounded-2xl">
        <div className="py-3 flex items-center justify-center relative">
          <span className="text-xl font-bold tracking-wider">
            {`${postDetailById?.authorName}'s Post`}
          </span>
          <button className="absolute top-2 right-2 text-3xl flex items-center justify-center rounded-full w-9 h-9 bg-slate-500 text-white hover:bg-slate-400 duration-150" onClick={() => {
            dispatch(closeChangeStatusPostModal());
          }}><IoIosClose /></button>
        </div>
        <hr className="h-px bg-stone-500" />
        <div className="p-3">
          <Radio.Group onChange={onChange} defaultValue={value} className="w-full">
            <Space direction="vertical" className="w-full">
              {optionsStatus.map((status) => {
                return <Radio value={status.value} key={status.value} className="hover:bg-slate-400 px-3 py-1.5 flex-row-reverse justify-between w-full rounded-lg after:hidden">
                  <div className="flex gap-3 items-center justify-start text-slate-100 text-lg">
                    <span>
                      {status.icon}
                    </span>
                    {status.label}
                  </div>
                </Radio>
              })}
            </Space>
          </Radio.Group>
          
        </div>
        <hr className="h-px bg-stone-500" />
        <div className="p-3 flex items-center justify-end gap-2">
          <button className="bg-slate-600 hover:bg-slate-800 px-3 py-1.5 rounded-lg" onClick={() => {
            dispatch(closeChangeStatusPostModal())
          }}>Cancel</button>
          <button className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400" onClick={async() => {
            if(value == postDetailById?.ViewMode?.toLowerCase()){
              dispatch(closeChangeStatusPostModal());
            } else {
              try {
                const {status, data} = await PostService.changeStatusPost(postDetailById.postID, {viewMode: value});
                if(status === STATUS_CODE.SUCCESS) {
                  Notification("success", "Post updated successfully!");
                  getPosts().then(res => {
                    dispatch(getArrPosts(res));
                  });
                  dispatch(closeChangeStatusPostModal());
                }
              } catch(err) {
                console.log(err);
              }
            }
          }}>
            {value == postDetailById?.ViewMode?.toLowerCase() ? "Done" : "Save"}
          </button>
        </div>
      </div>
    </div>
  </div>;
};
