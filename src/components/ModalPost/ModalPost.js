import React from "react";
import { IoIosClose } from "react-icons/io";
import { AiFillLike, AiOutlineLike  } from "react-icons/ai";
import { FaRegCommentAlt, FaUserFriends } from "react-icons/fa";
import {BsChatSquare, BsDot} from 'react-icons/bs';
import { TiWorld } from "react-icons/ti";
import { TbLock } from "react-icons/tb";

const arrComments = [
  {
    id: 1,
    content: 'Comment 1',
  },
  {
    id: 2,
    content: 'Comment 2 Comment 2 Comment 2 v Comment 2 Comment 2 Comment 2 Comment 2 Comment 2v Comment 2 Comment 2 Comment 2',
  },
  {
    id: 3,
    content: 'Comment 3',
  },
  {
    id: 4,
    content: 'Comment 4',
  },
  {
    id: 5,
    content: 'Comment 5',
  },
  {
    id: 6,
    content: 'Comment 6',
  },
]

export const ModalPost = () => {

  const renderComments = (arrComments) => {
    return arrComments.map((comment) => {
      return <div key={comment.id} className="my-1">
        <div className="flex gap-2 items-start">
          <div className="">
            <img width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={'/default-img/avatar.jpg'} alt="avatar" />
          </div>
          <div className="">
            <div className="">
              <div className="content-comment bg-slate-500 py-2 px-3 rounded-2xl text-sm flex flex-col flex-wrap max-w-lg">
                <p className="font-bold cursor-pointer text-ssm">
                  Name: Admin
                </p>
                <p>
                  {comment.content}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs tracking-wider pt-0.5 ml-4">
                <div className="font-semibold cursor-pointer hover:underline">
                  Like
                </div>
                <div className="font-semibold cursor-pointer hover:underline">
                  Reply
                </div>
                <div className="text-slate-300 tracking-normal">
                  1 day
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    })
  }

  return <div className="w-screen h-screen absolute top-0 left-0 " style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
    <div className="flex justify-center items-center w-full h-full">
        <div className="max-w-700px bg-slate-600 text-white min-h-560px min-w-500px rounded-2xl max-h-800px overflow-y-auto">
            <div className="py-3 flex items-center justify-center relative">
              <span className="text-xl font-bold tracking-wider">
                {`Admin's Post`}
              </span>
              <button className="absolute top-2 right-2 text-3xl flex items-center justify-center rounded-full w-9 h-9 bg-slate-500 text-white hover:bg-slate-400 duration-150"><IoIosClose /></button>
            </div>
            <hr className="h-px bg-stone-500" />
            <div className="min-h-180px">
              <div>
                <div className="flex items-center mt-4 mx-4">
                  <div>
                      <img width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={'/default-img/avatar.jpg'} alt="avatar" />
                  </div>
                  <div className="flex ml-3 flex-col">
                      <p className="font-bold cursor-pointer">{"Admin"}</p>
                      <div className="flex items-center text-sm text-slate-400">
                          <p className="">
                              {/* {moment(new Date()).valueOf() - moment(post?.updatedAt).valueOf() < TIME_OF_DATE_TO_MILLISECONDS ? moment(post?.updatedAt).fromNow().valueOf() : moment(post?.updatedAt).format("DD/MM/YYYY HH:mm")} */}
                              15 minutes ago
                          </p>
                          <BsDot />
                          {/* <span>{(post?.ViewMode === 'only me') || (post?.ViewMode === 'Only me') ? <TbLock /> : (post?.ViewMode === 'friends') || (post?.ViewMode === 'Friend') ? <FaUserFriends /> : <TiWorld />}</span> */}
                          <TiWorld />
                      </div>
                  </div>
                </div>
                <p className="mx-4">
                  Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet, consectet
                </p>
                <img src={'/default-img/post.jpg'} alt="image's post" />
              </div>
            </div>
            <div className="mx-4">
              <div className="flex justify-between items-center text-sm py-2.5">
                <div className="flex items-center gap-1">
                  <AiFillLike />
                  <span>1k</span>
                </div>
                <div>
                  3 comments
                </div>
              </div>
              <hr className="h-px bg-stone-500" />
              <div className="grid grid-cols-2 gap-0.5">
                <div className="px-0.5 py-1.5">
                  <div className="text-center hover:bg-slate-500 cursor-pointer rounded-md leading-8 duration-300 flex items-center justify-center gap-1">
                    <AiOutlineLike />
                    Like
                  </div>
                </div>
                <div className="px-0.5 py-1.5">
                  <div className="text-center hover:bg-slate-500 cursor-pointer rounded-md leading-8 duration-300 flex items-center justify-center gap-1">
                    <FaRegCommentAlt />
                    Comment
                  </div>
                </div>
              </div>
              <hr className="h-px bg-stone-500" />
            </div>
            <div>
              <div className="mx-4 py-3">
                {renderComments(arrComments)}
              </div>
            </div>
        </div>
    </div>
  </div>;
};
