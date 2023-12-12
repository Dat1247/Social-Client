'use client'
import { useAppSelector } from "@/redux/store";
import { USER_LOGIN } from "@/util/config";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { Select, Space } from 'antd';
import { AiOutlineClose } from "react-icons/ai";
import { Notification } from "../Notification/Notification";
import { PostService } from "@/services/PostService";


export default function InputPost() {
  const [userProfile, setUserProfile] = useState({});
  const [uploads, setUploads] = useState([]);
  const [newPost, setNewPost] = useState({
    content: '',
    viewMode: 'everyone',
    uploads: []
  });

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
    console.log("Create post: ", newPost)
    let formData = new FormData();

    // console.log(`${newPost['viewMode']} --- ${newPost.length}`);
    formData.append("content", newPost['content'])
    formData.append("viewMode", newPost['viewMode'])
    newPost.uploads.forEach(upload => {
      formData.append("Files", upload, upload.name)
    })

    try {
      const result = await PostService.createPost(formData);

      console.log({result})
    } catch(err) {
      Notification("error", "Create post failed!", err?.response.data)

    }
  }



  return <div className="max-w-md w-96">
    <Suspense fallback={<p>Load</p>}>
     <div className="flex items-center gap-2">
        <div>
          {userProfile.avatar && <Image width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={userProfile?.avatar} alt="avatar" />}
        </div>
        {
         userProfile && ( <textarea value={newPost.content}
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
      <div className="flex gap-5 items-center mt-2">
        <div>
          <label className="flex gap-1">
            <input type="file" className="hidden" multiple onChange={addPhotos}  />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="hidden md:block">Photos</span>
          </label>
        </div>
        <div>
          <Select
            defaultValue={newPost.viewMode}
            style={{
              width: 120,
            }}
            onSelect={(e, option) => {
              setNewPost({...newPost, viewMode: e})
            }}
            options={[
              {
                value: 'everyone',
                label: 'Everyone',
              },
              {
                value: 'friends',
                label: 'Friends',
              },
              {
                value: 'only me',
                label: 'Only me',
              },
            ]}
          />
        </div>
        <div className="grow text-right">
          <button onClick={() => {
            if(newPost.content === '' && newPost.uploads.length <= 0) return;
            console.log("Before create: ", newPost)
            if(newPost.viewMode === '') return;
            createPost(newPost);
          }} className="bg-socialBlue text-white px-6 py-1 rounded-md">Create</button>
        </div>
      </div>
    </Suspense>
  </div>;
}
