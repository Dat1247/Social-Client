'use client'
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { STATUS_CODE, USER_LOGIN } from "@/util/config";
import React, { Suspense, useEffect, useState } from "react";
import { Select, Space, Input } from 'antd';
import { AiOutlineClose } from "react-icons/ai";
import { Notification } from "../Notification/Notification";
import { PostService } from "@/services/PostService";
import { getPosts } from "../ListPosts/ListPosts";
import { getArrPosts } from "@/redux/features/postSlice";
import { TiWorld } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import { CustomProvider } from "../CustomProvider/CustomProvider";


const optionsStatus = [
  {
    value: 'everyone',
    label: 'Everyone',
    icon: <TiWorld />
  },
  {
    value: 'friends',
    label: 'Friends',
    icon: <FaUserFriends />
  },
  {
    value: 'only me',
    label: 'Only me',
    icon: <TbLock />
  },
];

const { TextArea } = Input;

export default function InputPost() {
  const [userProfile, setUserProfile] = useState({});
  const [uploads, setUploads] = useState([]);
  const [newPost, setNewPost] = useState({
    content: '',
    viewMode: 'Everyone',
    uploads: []
  });
  const dispatch = useAppDispatch()

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem(USER_LOGIN)))

  }, []);


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

        setNewPost({...newPost, uploads: [...newPost.uploads, file]})
      }
    }
  }

  const removePhotos = (upload) => {
    const newUploadsArray = uploads.filter(up => up !== upload);
    const newPostUploads = newPost.uploads.filter(up => up !== upload.detail);
    setUploads(newUploadsArray);
    setNewPost({...newPost, uploads: newPostUploads});
  }


  const createPost = async (newPost) => {
    let formData = new FormData();

    formData.append("content", newPost['content'])
    formData.append("viewMode", newPost['viewMode'])
    newPost.uploads.forEach(upload => {
      formData.append("myFile", upload, upload.name)
    })

    try {
      const {status, data} = await PostService.createPost(formData);

      if(status === STATUS_CODE.CREATED) {
        getPosts().then(res => {
          dispatch(getArrPosts(res))
        })
        setNewPost({
          content: '',
          viewMode: 'everyone',
          uploads: []
        });
        setUploads([]);
      }
    } catch(err) {
      Notification("error", "Create post failed!");
      console.log(err)

    }
  }



  return <div className="max-w-md w-96">
    <Suspense fallback={<p>Load</p>}>
     <div className="flex items-center gap-2">
        <div>
          {userProfile.avatar && <img className="w-10 h-10 max-w-none rounded-full cursor-pointer" src={userProfile?.avatar} alt="avatar" />}
        </div>
        {
         userProfile && ( <TextArea rows={3} value={newPost.content}
                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                    className="grow p-3 h-14 text-slate-700" placeholder={`Whats on your mind?`} />)
        }
      </div>
      {uploads.length > 0 && (
        <div className="flex gap-2">
          {uploads.map((upload, index) => (
            <div className="mt-2 relative" key={index}>
              <img src={upload.image} alt="" className="w-auto h-24 rounded-md" />
              <div className="absolute -top-1 -right-2">
                <AiOutlineClose className="p-1 rounded-full bg-slate-100 cursor-pointer text-slate-900 hover:bg-slate-500 hover:text-slate-50 duration-500" onClick={() => {
                  removePhotos(upload)
                }} />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2 items-center mt-2">
        <div>
          <label className="flex gap-1 cursor-pointer bg-slate-600 text-white hover:bg-slate-700 hover:text-white duration-500 px-4 py-1 rounded-md">
            <input type="file" className="hidden" multiple onChange={addPhotos}  />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="hidden md:block">Photos</span>
          </label>
        </div>
        <CustomProvider>
          <Select
            value={newPost.viewMode}
            style={{
              width: 120,
            }}
            onSelect={(e, option) => {
              setNewPost({...newPost, viewMode: e});
              console.log({newPost})
            }}
            options={optionsStatus}
            optionRender={(option) => {
              return <Space>
                <span>
                  {option.data.icon}
                </span>
                {option.data.label}
              </Space>
              }
            }
          />
        </CustomProvider>
        <div className="grow text-right">
          <button onClick={() => {
            if(newPost.content === '' && newPost.uploads.length <= 0) return;
            if(newPost.viewMode === '') return;
            createPost(newPost);
          }} className="bg-emerald-200 text-slate-600 hover:bg-emerald-500 hover:text-white duration-500 px-4 py-1 rounded-md">Create</button>
        </div>
      </div>
    </Suspense>
    <div className="h-0.5 w-full mt-5 bg-slate-600" />

  </div>;
}
