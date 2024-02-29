import React, { useEffect } from "react";
import { NavbarMenu } from "@/components/NavbarMenu";
import { FriendPageContent } from "@/components/Contents/FriendPageContent";
import { setUserObj } from "@/redux/features/userSlice";
import { USER_LOGIN } from "@/util/config";
import { useAppDispatch } from "@/redux/stores/friendStore";

export const FriendPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUserObj(JSON.parse(localStorage.getItem(USER_LOGIN))));
    }, [dispatch]);

  return <>
    <div className="flex">
        <NavbarMenu />
        <div className="h-screen w-0.5 shadow-3xl bg-slate-600"></div>
        <FriendPageContent />
    </div>
  </>;
};
