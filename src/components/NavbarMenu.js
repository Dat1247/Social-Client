import Image from "next/image";
import React from "react";

export const NavbarMenu = () => {
  return <div className="w-80  h-screen py-8 px-6">
    <div className="flex flex-col h-full">
        <p className="logo text-2xl font-bold tracking-wider">Social Clone</p>
        <div className="flex flex-col justify-between h-full navbar pt-10">
            <ul className="text-lg">
                <li className="mb-8">
                    <i className="fa fa-home mr-2"></i>Home
                </li>
                <li className="mb-8">
                    <i className="fa fa-search mr-2"></i>Search
                </li>
                <li className="mb-8">
                    <i className="fa fa-heart mr-2"></i>Notification
                </li>
                <li className="mb-8 flex items-center">
                    <img className="rounded-full mr-2 w-5 h-5" alt="avatar" src="https://cdn.kinocheck.com/i/w=480/pmrjs5090t.jpg"  />
                    Profile
                </li>
            </ul>
            <div className="text-lg">
                <i className="fa fa-bars"></i> More
            </div>

        </div>
    </div>
  </div>;
};
