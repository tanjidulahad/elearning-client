import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useUserSignupMutation } from '../redux/services/authenticationApi';
import { toast } from 'react-hot-toast';


const Signup = ({ setIsSignin }) => {
  const regex = /^(?=.*[\W_])(.{6,})$/;
  const dispatch = useDispatch();

  const [signUpUser,signUpResponse]=useUserSignupMutation()
  const [registerData, setRegisterData] = useState({ lastname: "", firstname: "", email: "", password: "", confirmPassword: "" })
  const [error, setError] = useState({ status: false, message: "" })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)


  const handleonChange = (e) => {
    if (error.status) {
      setError({ status: false, message: "" })
    }
    setRegisterData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!registerData.firstname.trim().length || !registerData.lastname.trim().length || !registerData.email.trim().length || !registerData.password.trim().length || !registerData.confirmPassword.trim().length) {
      setError({ status: true, message: "Invalid user data." })
      return
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError({ status: true, message: "Password didn't match." })
      return
    }
    
    if(!regex.test(registerData.password)){
      setError({ status: true, message: "Password is not strong." })
      return
    }

    signUpUser(registerData)
      .unwrap()
      .then((res) => {
        toast.success(res.message)
        setIsSignin((isSignin) => !isSignin)
      })
      .catch((error) => {
        toast.error(error?.data?.message)
      })
  }
  return (

    <div className={`backdrop-blur-xl bg-white/40 rounded-lg shadow-lg w-[500px] p-8 m-5 md:m-0`}>
      <h2 className="text-2xl font-bold mb-6 text-[rgb(2,76,110)]">Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-[rgb(2,76,110)] text-sm font-bold mb-2" htmlFor="firstname">
            Firstname
          </label>
          <input
            className="bg-white/60 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            name="firstname"
            type="text"
            placeholder="Firstname"
            onChange={handleonChange}
            value={registerData.firstname}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[rgb(2,76,110)] text-sm font-bold mb-2" htmlFor="lastname">
            Lastname
          </label>
          <input
            className="bg-white/60 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Lastname"
            onChange={handleonChange}
            value={registerData.lastname}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[rgb(2,76,110)] text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="bg-white/60 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleonChange}
            value={registerData.email}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[rgb(2,76,110)] text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className='relative'>
          <input
            className="bg-white/60 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            onChange={handleonChange}
            value={registerData.password}
            required
          />
                      {isPasswordVisible ? <AiOutlineEyeInvisible onClick={() => setIsPasswordVisible((prevState) => !prevState)} size={18} className='absolute top-[10px] right-2 text-gray-500 cursor-pointer' />
              :
              <AiOutlineEye onClick={() => setIsPasswordVisible((prevState) => !prevState)} size={18} className='absolute top-[10px] right-2 text-gray-500 cursor-pointer' />}
              </div>
          <p className='text-xs mt-1 text-gray-700'>password should be 6 characters long with at least 1 special character.</p>
        </div>
        <div className="mb-6">
          <label className="block text-[rgb(2,76,110)] text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className='relative'>
          <input
            className="bg-white/60 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            name="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={handleonChange}
            value={registerData.confirmPassword}
            required
          />
                      {isConfirmPasswordVisible ? <AiOutlineEyeInvisible onClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)} size={18} className='absolute top-[10px] right-2 text-gray-500 cursor-pointer' />
              :
              <AiOutlineEye onClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)} size={18} className='absolute top-[10px] right-2 text-gray-500 cursor-pointer' />}
              </div>
              
        </div>
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            className="bg-[#024c6e] hover:bg-[rgba(2,76,110,.8)] text-white font-bold py-2 md:px-4 px-2 w-[100px] md:w-auto rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign up
          </button>
          <p onClick={() => setIsSignin((isSignin) => !isSignin)} className="align-baseline font-bold md:text-sm text-xs text-gray-500 hover:text-gray-700 cursor-pointer" >
            Already have an account? Sign in.
          </p>
        </div>

        {error && <div>
          <p className='text-red-600'>{error.message}</p>
        </div>}
      </form>
    </div>
  );
};

export default Signup;