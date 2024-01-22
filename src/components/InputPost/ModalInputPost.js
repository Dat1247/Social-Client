import { closeInputPostModal } from "@/redux/features/postSlice";

import { useAppDispatch } from "@/redux/store";
import React, { useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { Editor } from '@tinymce/tinymce-react';
import { MY_TINY_EDITOR_KEY } from "@/util/config";


export const ModalInputPost = () => {
    const dispatch = useAppDispatch();
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

  return <div className="w-screen h-screen absolute top-0 left-0 " style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
    <div className="flex justify-center items-center w-full h-full">
        <div className="max-w-700px bg-slate-600 text-white min-h-560px min-w-500px rounded-2xl">
            <div className="py-3 flex items-center justify-center relative">
                <span className="text-xl font-bold tracking-wider">
                    Create a post
                </span>
                <button className="absolute top-2 right-2 text-3xl flex items-center justify-center rounded-full w-9 h-9 bg-slate-500 text-white hover:bg-slate-400 duration-150" onClick={() => {
                    dispatch(closeInputPostModal())
                }}><IoIosClose /></button>
            </div>
            
            <hr className="h-px bg-stone-500" />
            <div className=" max-h-750px overflow-y-auto">
                <div className="mx-4">
                    <Editor
                        apiKey={MY_TINY_EDITOR_KEY}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                <button onClick={log}>Log editor content</button>
                </div>
            </div>
        </div>
    </div>
  </div>;
};
