'use client'

import React, { useState } from "react";
import { Loading } from "@/components/Loading";
import { Notification } from "@/components/Notification/Notification";
import { UserService } from "@/services/UserService";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash   } from "react-icons/fa";

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),
    name: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match!').required('Required')
});

export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const router = useRouter();

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        name: '',
        phoneNumber: ''
      },
      validationSchema: SignUpSchema,
      onSubmit: async(values) => {
        setLoading(true);
        try {
          const {data, status} = await UserService.register(values);
  
          
          Notification("success", "Register successfully!", "")
          router.push("/login");
        } catch (err) {
          Notification("error", "Register failed!", err?.response.data)
  
  
        } finally {
          setLoading(false);
        }
      }
    });
  
    const {values, errors, touched, handleChange, handleSubmit } = formik;
  
     return <section className="h-screen">
    <div className="container h-full px-6 py-24">
      <div
        className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="w-full"
            alt="Phone image" />
        </div>

        <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
          <form onSubmitCapture={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-100 tracking-wide">Email</label>
              <input className=" w-full text-base px-4 py-2 border-2 text-slate-500 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" name="email" type="" placeholder="mail@gmail.com" value={values.email} onChange={handleChange} />
              {touched.email && errors.email && <div className="text-red-500 text-xs italic">{errors.email}</div>}
            </div>
            <div className="space-y-2 mt-4">
              <label className="mb-5 text-sm font-medium text-gray-100 tracking-wide">
                  Username
              </label>
              <input className="w-full content-center text-base px-4 py-2 border-2 text-slate-500 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" name="username" type="" placeholder="Enter your username" value={values.username} onChange={handleChange} />
              {touched.username && errors.username && <div className="text-red-500 text-xs italic">{errors.username}</div>}
            </div>
            <div className="space-y-2 mt-4">
              <label className="mb-5 text-sm font-medium text-gray-100 tracking-wide">
                  Name
              </label>
              <input className="w-full content-center text-base px-4 py-2 border-2 text-slate-500 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" name="name" type="" placeholder="Enter your name" value={values.name} onChange={handleChange} />
              {touched.name && errors.name && <div className="text-red-500 text-xs italic">{errors.name}</div>}
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
            <div className="space-y-2 mt-4">
              <label className="mb-5 text-sm font-medium text-gray-100 tracking-wide">
                  Confirm Password
              </label>
              <div className="relative">
                <input className="w-full content-center text-base px-4 py-2 border-2 text-slate-500 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" name="confirmPassword" type={isShowConfirm ? "text" : "password"} placeholder="Confirm your password" value={values.confirmPassword} onChange={handleChange} />
                <div className="absolute top-1/3 right-3 cursor-pointer" onClick={() => {
            setIsShowConfirm(!isShowConfirm)
          }}>
            {values.confirmPassword ? (
				isShowConfirm ? (
					<FaEyeSlash className="text-slate-700"  />
				) : (
					<FaEye className="text-slate-700" />
				)
			) : (
			""
			)}
          </div>
              </div>
              {touched.confirmPassword && errors.confirmPassword && <div className="text-red-500 text-xs italic">{errors.confirmPassword}</div>}
            </div>
            <div className="space-y-2 mt-4">
              <label className="mb-5 text-sm font-medium text-gray-100 tracking-wide">
                  Phone number
              </label>
              <input className="w-full content-center text-base px-4 py-2 border-2 text-slate-500 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" name="phoneNumber" type="" placeholder="Enter your phone number" value={values.phoneNumber} onChange={handleChange} />
              {touched.phoneNumber && errors.phoneNumber && <div className="text-red-500 text-xs italic">{errors.phoneNumber}</div>}
            </div>
            
            <button type="submit" className="w-full flex justify-center bg-green-400 my-4 hover:bg-green-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
              Sign up
            </button>
            <div className="text-sm text-left">
              <span className="italic">You have account? </span>
              <a href="/login" className="text-green-400 hover:text-green-600 duration-500 font-semibold tracking-wide hover:underline hover:underline-offset-1">
                Go to login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    {
      loading ? <Loading /> : ""
    }
  </section>;
}
