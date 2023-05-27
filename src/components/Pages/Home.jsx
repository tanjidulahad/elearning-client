import React from 'react';
import { useAddToWishlistMutation, useGetUserVideosQuery, useGetWatchedVideoQuery, useRemoveFromWishlistMutation } from '../redux/services/videoapi';
import Product from '../product/Product';
import { Progress } from 'antd';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Home = () => {
    const { isLoggedinUser,userData } = useSelector((state) => state.auth)

    const { isLoading: getVidoLoading, isError: getVideoError, data: videos } = useGetUserVideosQuery({email:userData?.email})
    const { isLoading: getWatchedVideoLoading, isError: getWatchedVideoError, data: WatchedVideos } = useGetWatchedVideoQuery({email:userData?.email})
    const [addToWishlist,addToWishlistResponse]=useAddToWishlistMutation()
    const [removeFromWishlist,removeFromWishlistResponse]=useRemoveFromWishlistMutation()

    const handleAddToWishlist=(videoid)=>{
        if(!isLoggedinUser){
            toast.error("Please sign in first")
            return
        }
        toast.promise(
            addToWishlist({email:userData?.email,videoid}),
             {
               loading: 'Adding to wishlist...',
               success: <b>Added successfully</b>,
               error: <b>Could not add.</b>,
             }
           );
    }

    const handleRemoveFromWishlist=(videoid)=>{

        toast.promise(
            removeFromWishlist({email:userData?.email,videoid}),
             {
               loading: 'Removing...',
               success: <b>Removed successfully</b>,
               error: <b>Could not remove.</b>,
             }
           );
        
    }
    return (
        <div className='mx-10 pb-64'>
            <div className='flex justify-between items-center'>
                <div className='flex-[1] lg:flex-[3]'>
                    <h2 className='text-sm md:text-3xl my-10 font-bold text-gray-600 italic'>Interactive Learning</h2>
                </div>
                {isLoggedinUser && <div className='flex-[1] lg:flex-[1]'>
                    <div >
                        <p className='text-sm md:text-xl font-medium hidden sm:block'>Completed</p>
                    </div>
                    <div className='flex gap-2 text-sm md:text-lg font-medium pt-3 sm:pt-0'>
                        <p>{WatchedVideos?.data?`${WatchedVideos?.data?.watchedvideos?.length}/10`:"0/10"}</p>
                        <Progress status='active' strokeColor="#18B3C7" percent={(WatchedVideos?.data?.watchedvideos?.length / 10) * 100} format={(percent) => <p className='text-sm md:text-xl'>{`${percent} %`}</p>} />
                    </div>
                </div>}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {
                    videos?.map((video, idx) => (
                        <Product key={idx} data={video} handleAddToWishlist={handleAddToWishlist} handleRemoveFromWishlist={handleRemoveFromWishlist}/>
                    ))
                }

            </div>
        </div>
    );
};

export default Home;