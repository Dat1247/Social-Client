import React from "react";

export const ModalPost = () => {
  return <div className="w-screen h-screen absolute top-0 left-0 " style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
    <div className="flex justify-center items-center w-full h-full">
        <div className="max-w-700px bg-white text-slate-600 ">
            Modal Post
        </div>
    </div>
  </div>;
};
