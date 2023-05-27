import React from 'react';
import Product from '../product/Product';
import { useGetWishlistVideoQuery, useRemoveFromWishlistMutation } from '../redux/services/videoapi';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
    const { userData } = useSelector((state) => state.auth)
    const { isLoading, isError, data: videos } = useGetWishlistVideoQuery({ email: userData?.email })
    const [removeFromWishlist,removeFromWishlistResponse]=useRemoveFromWishlistMutation()

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
            <h2 className='text-lg sm:text-2xl md:text-3xl my-10 font-bold text-gray-600 italic text-center'>Bookmarked Videos</h2>
            {isLoading ?
                <div className='h-[60vh] flex items-center justify-center'>
                    <p className='text-xl font-medium text-gray-500'>Loading...</p>
                </div>
                :
                videos?.data?.length > 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                    {
                        videos?.data?.map((video, idx) => (
                            <Product key={idx} data={video} fromWishlist={true} handleRemoveFromWishlist={handleRemoveFromWishlist}/>
                        ))
                    }

                </div>
                    :
                    <div className='h-[60vh] flex items-center justify-center'>
                        <p className='text-xl font-medium text-gray-500'>No video added</p>
                    </div>}
        </div>
    );
};

export default Wishlist;