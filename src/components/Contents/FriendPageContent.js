import { setListFriendRequests, setListFriends } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/stores/friendStore";
import { UserService } from "@/services/UserService";
import { USER_LOGIN } from "@/util/config";
import React, { useEffect } from "react";

const getListFriend = async(userId) => {
    if(userId === undefined || userId === null) return;
    try {
        const result = await UserService.getUserFriends(userId);
        const data = await result.data;
        return data;
    } catch (e) {
        console.log(e);
    }
}
const getFriendRequests = async(userId) => {
    if(userId === undefined || userId === null) return;
    try {
        const result = await UserService.getFriendRequests(userId);
        const data = await result.data;
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const FriendPageContent = () => {
    const {userObj, listFriends, listFriendRequests} =  useAppSelector(state =>  state.userSlice);
    const dispatch = useAppDispatch();
    useEffect(() => {
        getListFriend(userObj?.id).then((res) => {
            dispatch(setListFriends(res?.data));
        });
        getFriendRequests(userObj?.id).then((res) => {
            dispatch(setListFriendRequests(res?.data));
        });
    }, [userObj, dispatch]);

    console.log('List friends: ', {listFriends, listFriendRequests});


  return <div>FriendPageContent</div>;
};
