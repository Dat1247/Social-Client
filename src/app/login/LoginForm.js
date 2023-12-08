'use client'

import { Loading } from "@/components/Loading";
import { useAppDispatch } from "@/redux/store";
import { UserService } from "@/services/UserService";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import * as Yup from 'yup';
import { FaEye, FaEyeSlash   } from "react-icons/fa";
import { setUserLogin } from "@/redux/features/userSlice";
import { TOKEN, USER_LOGIN } from "@/util/config";
import {Notification} from "@/components/Notification/Notification";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
  });

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async(values) => {
      setLoading(true);
      try {
        const {data, status} = await UserService.login(values);

        dispatch(setUserLogin(data.userLogin));
        localStorage.setItem(USER_LOGIN, JSON.stringify(data?.userLogin));
        localStorage.setItem(TOKEN, JSON.stringify(data?.userLogin.accessToken));
        Notification("success", "Login successfully!", "")
        router.push("/");
      } catch (err) {
        Notification("error", "Login failed!", err?.response.data)


      } finally {
        setLoading(false);
      }
    }
  });

  const {values, errors, touched, handleChange, handleSubmit } = formik;

  return <>
    <form onSubmitCapture={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-100 tracking-wide">Email</label>
        <input className=" w-full text-base px-4 py-2 border-2 text-slate-500 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" name="email" type="" placeholder="mail@gmail.com" value={values.email} onChange={handleChange} />
        {touched.email && errors.email && <div className="text-red-500 text-xs italic">{errors.email}</div>}
      </div>
      <div className="space-y-2 mt-4">
        <label className="mb-5 text-sm font-medium text-gray-100 tracking-wide">
            Password
        </label>
        <div className="relative">
          <input className="w-full content-center text-base px-4 py-2 border-2 text-slate-500 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" name="password" type={isShowPassword ? "text" : "password"} placeholder="Enter your password" value={values.password} onChange={handleChange} />
          <div className="absolute top-1/3 right-3 cursor-pointer" onClick={() => {
            setIsShowPassword(!isShowPassword)
          }}>
            {values.password ? (
									isShowPassword ? (
										<FaEyeSlash className="text-slate-700"  />
									) : (
										<FaEye className="text-slate-700" />
									)
								) : (
									""
								)}
          </div>
        </div>
        {touched.password && errors.password && <div className="text-red-500 text-xs italic">{errors.password}</div>}
      </div>
      <div className="text-sm my-3 text-right italic">
        <a href="#" className="text-green-400 hover:text-green-600 duration-500">
          Forgot your password?
        </a>
        </div>
      <button type="submit" className="w-full flex justify-center bg-green-400 my-4 hover:bg-green-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
        Sign in
      </button>
      <div className="text-sm my-3">
        <span className="italic">
          {`You don't have account? `}
        </span>
        <a href="/register" className="text-green-400 hover:text-green-600 duration-500 font-semibold tracking-wide hover:underline hover:underline-offset-1">
          Sign up
        </a>
      </div>
    </form>
    {loading ? <Loading /> : ""}
  </>
}
