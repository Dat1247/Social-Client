import Image from "next/image";
import Link from "next/link";
import React from "react";
import {AiFillHome, AiOutlineSearch, AiFillHeart} from 'react-icons/ai';
import {FaBars} from 'react-icons/fa'

export const NavbarMenu = () => {
  return <div className="w-80  h-screen py-8 px-6">
    <div className="flex flex-col h-full">
        <Link href={"/"} className="logo text-2xl font-bold tracking-wider">Social Clone</Link>
        <div className="flex flex-col justify-between h-full navbar pt-10">
            <ul className="text-lg flex flex-col">
                <Link className="mb-8 flex gap-2 items-center" href={'/'}>
                    <AiFillHome />Home
                </Link>
                <Link className="mb-8 flex gap-2 items-center" href={'/search'}>
                    <AiOutlineSearch />Search
                </Link>
                <Link className="mb-8 flex gap-2 items-center" href={'/notification'}>
                   <AiFillHeart />Notification
                </Link>
                <Link className="mb-8 flex items-center" href={'/'}>
                    <img className="rounded-full mr-2 w-5 h-5" alt="avatar" src="https://cdn.kinocheck.com/i/w=480/pmrjs5090t.jpg"  />
                    Profile
                </Link>
            </ul>
            <div className="text-lg flex items-center gap-2">
               <FaBars /> More
            </div>

        </div>
    </div>
  </div>;
};
