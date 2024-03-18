import { closeInputPostModal, getArrPosts, setPostEdit } from "@/redux/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/stores/homeStore";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { getPostDetailById } from "../ModalPost/ModalPost";
import { Input } from "antd";
import { IMAGE_URL, STATUS_CODE } from "@/util/config";
import { PostService } from "@/services/PostService";
import { getPosts } from "../ListPosts/ListPosts";
import { Notification } from "../Notification/Notification";


const { TextArea } = Input;

export const ModalInputPost = () => {
    const {postIdEdit, postEdit} = useAppSelector(state => state.postSlice); //Value uploaded to redux
    const [uploads, setUploads] = useState([]); //Array file will upload
    const [post, setPost] = useState({}); //Value can change
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPostDetailById(postIdEdit).then(res => {
            dispatch(setPostEdit(res));
            setPost(res);
            setUploads(res?.FileUpload);
        });

    }, [postIdEdit, dispatch]);

    const addPhotos = (e) => {
        const files = e.target.files;
        if(files.length > 0) {
          for(const file of files) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
              const objFile = {
                detail: file,
                image: e.target.result
              }
              setUploads([...uploads, objFile]);
            }
    
            setPost({...post, FileUpload: [...post.FileUpload, file]});
          }
        }
    }

    const removePhotos = (upload) => {
        const newUploadsArray = uploads.filter(up => up !== upload);
        const newPostUploads = post?.FileUpload.filter(up => {
            if(typeof upload === 'string') {
                return up !== upload;
            }
            return up !== upload.detail;
        });
        setUploads(newUploadsArray);
        setPost({...post, FileUpload: newPostUploads});
    }

    const updatePost = async() => {
        let formData = new FormData();
        const arrUpload = [];

        formData.append("content", post['content']);
        formData.append("viewMode", post['ViewMode']);
        post.FileUpload.forEach(file => {
            if(typeof file === "object") {
                formData.append("myFile", file, file.name);
            } else if (typeof file === "string") {
                arrUpload.push(file);
            }
        })
        formData.append("arrayFileUpload", arrUpload);

        try {
            const {data, status} = await PostService.updatePost(post.postID, formData);

            if(status === STATUS_CODE.SUCCESS) {
                getPosts().then(res => {
                    dispatch(getArrPosts(res));
                });
                console.log("Edit post : ", data)
                dispatch(closeInputPostModal());
                Notification("success", data?.message);
            }
        } catch(err) {
            console.log(err)
        }
    }

  return <div className="w-screen h-screen absolute top-0 left-0 bg-black-0.5">
    <div className="flex justify-center items-center w-full h-full">
        <div className="max-w-700px bg-slate-600 text-white min-w-500px rounded-2xl">
            <div className="py-3 flex items-center justify-center relative">
                <span className="text-xl font-bold tracking-wider">
                    Edit post
                </span>
                <button className="absolute top-2 right-2 text-3xl flex items-center justify-center rounded-full w-9 h-9 bg-slate-500 text-white hover:bg-slate-400 duration-150" onClick={() => {
                    dispatch(closeInputPostModal())
                }}><IoIosClose /></button>
            </div>
            
            <hr className="h-px bg-stone-500" />
                <div className="mx-4 mt-4">
                    <div className=" max-h-650px overflow-y-auto ">
                        {
                        postEdit?.content && ( <TextArea rows={post?.content?.split("\r\n").length} value={post?.content}
                                    onChange={e => setPost({...post, content: e.target.value})}
                                    className="grow p-4 h-14 bg-transparent outline-none border-none text-white scrollBarTextArea focus:outline-none focus:border-none focus:shadow-none" />)
                        }
                        <div className="mb-3 w-lg max-w-lg flex gap-2 flex-wrap">
                            {uploads.length > 0 && uploads.map((file, index) => {
                                return <div className="mt-2 relative" key={index}>
                                            <img src={file.image ? file.image : `${IMAGE_URL}${file}`} className="w-auto max-h-48 rounded-md" alt="image" key={index} />
                                            <div className="absolute -top-1 -right-2">
                                                <AiOutlineClose className="p-1 rounded-full bg-slate-100 cursor-pointer text-slate-900 hover:bg-slate-500 hover:text-slate-50 duration-500" onClick={() => {
                                                    removePhotos(file)
                                                    console.log("remove image: ", file)
                                                }} />
                                            </div>
                                        </div>
                            })}
                        </div>
                    </div>
                    <div>
                        <label className="flex gap-1 cursor-pointer bg-slate-600 text-white hover:bg-slate-700 hover:text-white duration-500 px-4 py-1 rounded-md">
                            <input type="file" className="hidden" multiple onChange={addPhotos}  />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <span className="hidden md:block">Photos</span>
                        </label>
                    </div>
                    <button className="w-full bg-emerald-400 font-semibold py-2 my-4 rounded-lg hover:bg-emerald-600 duration-300" onClick={updatePost}>Save</button>
                </div>
        </div>
    </div>
  </div>;
};
