
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const videoApi = createApi({
  reducerPath: 'videoapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://elarning-server.onrender.com/api/' }),
  tagTypes: ['PostNotes', 'GetNotes','GetWatchedVideo','GetWishlistVideo','GetUserVideos'],
  endpoints: (builder) => ({
    getUserVideos: builder.query({
      query: (data) => `getvideos/${data?.email?data.email:""}`,
      providesTags: ['GetUserVideos'],
    }),
    getVideoNotes: builder.query({
      query: (data) => `getvideonotes/${data.email}&${data.videoid}`,
      providesTags: ['GetNotes'],
    }),
    postVideoNotes: builder.mutation({
      query: (data) => ({
        url:"/postvideonotes",
        method:"POST",
        body:data,
        headers: {
            'Content-type': 'application/json'
          },
      }),
      invalidatesTags: ['GetNotes'],
    }),
    getWatchedVideo: builder.query({
      query: (data) => `getwatchedvideo/${data.email}`,
      providesTags: ['GetWatchedVideo'],
    }),
    postWatchedVideo: builder.mutation({
      query: (data) => ({
        url:"/postwatchedvideo",
        method:"POST",
        body:data,
        headers: {
            'Content-type': 'application/json'
          },
      }),
      invalidatesTags: ['GetWatchedVideo'],
    }),
    getWishlistVideo: builder.query({
      query: (data) => `getwishlistproduct/${data.email}`,
      providesTags: ['GetWishlistVideo'],
    }),
    removeFromWishlist: builder.mutation({
      query: (data) => ({
        url:"/removefromwishlist",
        method:"POST",
        body:data,
        headers: {
            'Content-type': 'application/json'
          },
      }),
      invalidatesTags: ['GetWishlistVideo','GetUserVideos'],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url:"/addtowishlist",
        method:"POST",
        body:data,
        headers: {
            'Content-type': 'application/json'
          },
      }),
      invalidatesTags: ['GetWishlistVideo','GetUserVideos'],
    }),
  }),
})


export const { useGetUserVideosQuery,useGetVideoNotesQuery,usePostVideoNotesMutation,useGetWatchedVideoQuery,usePostWatchedVideoMutation,useGetWishlistVideoQuery,useRemoveFromWishlistMutation,useAddToWishlistMutation } = videoApi