import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';
import Header from './Header'

const Layout = () => {
    return (
        <div className="flex flex-col h-screen">

            <div className="h-20 bg-white z-10 shrink-0">
                <Header />
            </div>

            <div className="flex flex-1 overflow-hidden">

                <div className="w-60 shadow-md bg-white shrink-0 border-r border-gray-300">
                    <Sidebar />
                </div>

                <main className="flex-1 bg-[#ebe8e8] overflow-auto">
                    <div className="p-6 h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout
