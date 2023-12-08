'use client'
import { useAppSelector } from "@/redux/store";
import { USER_LOGIN } from "@/util/config";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";

export default function InputPost() {
  const [userProfile, setUserProfile] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem(USER_LOGIN)))

  }, []);

  console.log("COntent: ", content)

  return <div className="max-w-md w-96">
    <Suspense fallback={<p>Load</p>}>
     <div className="flex items-center gap-2">
        <div>
          {userProfile.avatar && <Image width={20} height={20} className="w-10 h-10 rounded-full cursor-pointer" src={userProfile?.avatar} alt="avatar" />}
        </div>
        {
         userProfile && ( <textarea value={content}
                    onChange={e => setContent(e.target.value)}
                    className="grow p-3 h-14 text-slate-700" placeholder={`Whats on your mind?`} />)
        }
      </div>
      {/* {uploads.length > 0 && (
        <div className="flex gap-2">
          {uploads.map(upload => (
            <div className="mt-2" >
              <img src={upload} alt="" className="w-auto h-24 rounded-md" />
            </div>
          ))}
        </div>
      )} */}
      <div className="flex gap-5 items-center mt-2">
        <div>
          <label className="flex gap-1">
            <input type="file" className="hidden" multiple  />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="hidden md:block">Photos</span>
          </label>
        </div>
        <div>
          <button className="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
            <span className="hidden md:block">Mood</span>
          </button>
        </div>
        <div className="grow text-right">
          <button onClick={() => {
            console.log("Create post")
          }} className="bg-socialBlue text-white px-6 py-1 rounded-md">Share</button>
        </div>
      </div>
    </Suspense>
  </div>;
}
