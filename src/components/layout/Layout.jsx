import React from 'react';
import Header from "../shared/Header"
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div>
            <Header/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;