import { Dropdown } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLoggedOut } from '../redux/reducers/authSlice';


const Header = () => {


    const dispatch = useDispatch()
    const { isLoggedinUser, userData } = useSelector((state) => state.auth)

    const navigation = useNavigate()

    const handleLogOut=()=>{
        dispatch(userLoggedOut())
    }

    const items = [
        {
            label: <p onClick={handleLogOut}>Logout</p>,
            key: '0',
        }
    ];
    return (
        <div className='flex justify-between px-10 py-4 shadow-md'>
            <div>
                <img onClick={()=>navigation("/")} className='w-48 cursor-pointer' src="https://interactivecares-courses.com/wp-content/uploads/2021/03/IC-logo-Telda.png" alt="" />
            </div>
            <div className='flex items-center gap-10 '>

                {!isLoggedinUser ?
                    <p onClick={() => navigation("/auth")} className='text-lg font-semibold bg-[#18B3C7] text-white px-3 py-1 rounded-sm cursor-pointer'>SignIn</p>
                    :
                    <>
                        <p onClick={() => navigation("/wishlist")} className='text-lg font-semibold cursor-pointer'>Wishlist</p>
                        <div >

                            <Dropdown menu={{ items }} trigger={['hover']} placement="bottom">
                                <p className='bg-[#18B3C7] w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold text-white cursor-pointer'>{userData.firstname[0] + "" + userData.lastname[0]}</p>
                            </Dropdown>

                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Header;