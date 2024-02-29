import React from "react";
import { Provider } from "react-redux";
import { friendStore } from "../stores/friendStore";

export default function ReduxFriendProvider({children}) {
  return <Provider store={friendStore}>
    {children}
  </Provider>
}
