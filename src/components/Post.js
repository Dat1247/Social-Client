import Image from "next/image";
import React from "react";
import {AiOutlineHeart} from 'react-icons/ai';
import {BsChatSquare, BsDot} from 'react-icons/bs'

const avatarLink = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU2kmuGEPylkxHTNhZ9xTfS090MOP1AEAjsg&usqp=CAU';
const imgLink = "https://webartdevelopers.com/blog/wp-content/uploads/2021/02/tailwind-css-card.png";

export const Post = () => {


  return <div className="max-w-md">
    <div className="flex items-center mb-5">
        <div>
            <Image width={20} height={20} className="w-10 h-10 rounded-full" src={'/default-img/avatar.jpg'} alt="avatar" />
        </div>
        <div className="flex items-center ml-4">
            <p>takeiteasy</p>
            <BsDot />
            <p className="text-sm text-slate-400">2h ago</p>
        </div>
    </div>
    <div className="mb-5">
        <div className="mb-3">
            <Image width={300} height={250} src={'/default-img/post.jpg'} alt="image" />
        </div>
        <div>
            <p> 
                <span className="font-bold mr-1">
                    takeiteasy 
                </span>
                lorem Ips incorrectly formatted incorrectly as described
            </p>
        </div>
    </div>
    <div>
        <div className="flex items-center gap-1">
            <AiOutlineHeart className="cursor-pointer" />
            <BsChatSquare className="cursor-pointer" />
        </div>
        <div>
            <p>1,251 likes</p>
            <p>
                View all 6 comments
            </p>
        </div>
        <form>
            <input placeholder="Add a comment" />
        </form>
    </div>
  </div>;
};
