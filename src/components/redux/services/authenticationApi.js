
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://elarning-server.onrender.com/api/' }),
  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: (data) => ({
        url:"/signup",
        method:"POST",
        body:data,
        headers: {
            'Content-type': 'application/json'
          },
      })
    }),
    userSignin: builder.mutation({
      query: (data) => ({
        url:"/signin",
        method:"POST",
        body:data,
        headers: {
            'Content-type': 'application/json'
          },
      })
    }),
  }),
})


export const { useUserSignupMutation,useUserSigninMutation } = authenticationApi