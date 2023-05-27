import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useUserSigninMutation } from '../redux/services/authenticationApi';
import { toast } from 'react-hot-toast';
import { userLoggedin } from '../redux/reducers/authSlice';

const Signin = ({ setIsSignin }) => {
  const dispatch = useDispatch()

  const [signInApi,signInApiResponse]=useUserSigninMutation()
  const [signInData, setSignInData] = useState({ email: "", password: "" })
  const [error, setError] = useState({ status: false, message: "" })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleonChange = (e) => {
    if (error.status) {
      setError({ status: false, message: "" })
    }
    setSignInData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!signInData.email.trim().length || !signInData.password.trim().length) {
      setError({ status: true, message: "Invalid user data." })
      return
    }

    signInApi(signInData)
    .unwrap()
    .then((res)=>{
      dispatch(userLoggedin(res.data))
    })
    .catch((error)=>{
      toast.error(error?.data?.message)
    })
    
  }
  return (

    <div className="backdrop-blur-xl bg-white/40 rounded-lg shadow-lg w-[500px] p-8 m-5 md:m-0">
      <h2 className="text-2xl font-bold mb-6 text-[rgb(2,76,110)]">Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-[rgb(2,76,110)] text-sm font-bold mb-2 " htmlFor="email">
            Email
          </label>
          <input
            className="bg-white/60 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            onChange={handleonChange}
            value={signInData.email}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[rgb(2,76,110)] text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className='relative'>
            <input
              className="bg-white/60 appearance-none border rounded w-full py-2 pl-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              onChange={handleonChange}
              value={signInData.password}
              placeholder="Password"
              required
            />
            {isPasswordVisible ? <AiOutlineEyeInvisible onClick={() => setIsPasswordVisible((prevState) => !prevState)} size={18} className='absolute top-[10px] right-2 text-gray-500 cursor-pointer' />
              :
              <AiOutlineEye onClick={() => setIsPasswordVisible((prevState) => !prevState)} size={18} className='absolute top-[10px] right-2 text-gray-500 cursor-pointer' />}

          </div>
        </div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            className="bg-[rgb(2,76,110)] hover:bg-[rgba(2,76,110,.8)] text-white font-bold py-2 md:px-4 px-2 w-[100px] md:w-auto rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign in
          </button>
          <p onClick={() => setIsSignin((isSignin) => !isSignin)} className="align-baseline font-bold md:text-sm text-xs text-gray-500 hover:text-gray-700 cursor-pointer" >
            Don't have an account? Sign up.
          </p>
        </div>
        {error && <div>
          <p className='text-red-600'>{error.message}</p>
        </div>}
      </form>
    </div>
  );
};

export default Signin;