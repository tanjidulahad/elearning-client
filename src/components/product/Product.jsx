import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Product = ({data,fromWishlist=false,handleRemoveFromWishlist,handleAddToWishlist}) => {
    const {isLoggedinUser}=useSelector((state)=>state.auth)
    const navigation=useNavigate()
    const [wishlisted,setWishlisted]=useState(fromWishlist?fromWishlist:data.wishlisted)

    useEffect(()=>{
        setWishlisted(fromWishlist?fromWishlist:data.wishlisted)
    },[data])

    const handleRouteChange=()=>{
        if(isLoggedinUser){
            navigation(`/details/${data.videoid}`,{ state: { videolink: data.videolink,videotitle: data.title,videodescription:data.description } })
        }else{
            toast.error("Please signin to wath this video.")
        }
        
    }

    return (
        <div className='shadow-md cursor-pointer bg-[#18B3C7] relative'>
            {wishlisted?<AiFillHeart onClick={()=>handleRemoveFromWishlist(data?.videoid)} color='#18B3C7' size={25} className='absolute right-3 top-2' title='Bookmark' />
            :
            <AiOutlineHeart onClick={()=>handleAddToWishlist(data?.videoid)} color='#18B3C7' size={25} className='absolute right-3 top-2' title='Bookmark' />}
            <div onClick={handleRouteChange}>            
            <div className='flex justify-center overflow-hidden'>
                <img className='h-52 w-full' src={data.thumbnail} alt="" />
            </div>
            <div className='px-4 py-3'>
                <p className='text-md font-medium text-white mb-2'>{data.title.slice(0,35)}...</p>
                <p className='text-base text-white'>{data.description.slice(7,80)}...</p>
            </div>
            </div>
        </div>
    );
};

export default Product;