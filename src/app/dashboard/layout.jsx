"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const layout = ({ children }) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!Cookies.get('token')) {
            router.push("/auth/login")
        }
    }, []);

    const logout = async () => {
        try {
            Cookies.remove("token");
            router.push('/auth/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <div className='min-h-screen flex flex-row overflow-hidden'>
                <aside className='absolute left-0 top-0 z-[9999] h-screen w-72 bg-gray-900 overflow-y-hidden flex flex-col lg:static'>
                    <div className='flex flex-row items-center justify-center h-20 text-white'>
                        <img src='' />
                        <h1 className='font-bold text-2xl '>DASHBOARD</h1>
                    </div>
                    <div className='text-gray-300 px-8 py-8 flex-1'>
                        <h3 className="mb-4 ml-4 text-sm font-bold text-bodydark2 text-white">MENU</h3>
                        <ul className="mb-6 flex flex-col gap-1.5 ">
                            <li>
                                <button className="hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 bg-graydark dark:bg-meta-4">Dashboard</button>
                            </li>
                            <li>
                                <button className="hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 bg-graydark dark:bg-meta-4">Dashboard</button>
                            </li>
                            <li>
                                <button className="hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 bg-graydark dark:bg-meta-4">Dashboard</button>
                            </li>
                            <li>
                                <button className="hover:bg-gray-700 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 bg-graydark dark:bg-meta-4">Dashboard</button>
                            </li>
                        </ul>
                    </div >

                    <div className=' justify-self-end items-center py-10 justify-center flex'>
                        <div className='flex flex-row justify-center items-center'>
                            <button onClick={logout} className='text-white font-semibold text-lg'>LOG OUT</button>
                        </div>

                    </div>
                </aside>
                <div className='relative bg-white w-full flex flex-row h-20 justify-end px-10'>
                    <img src="" alt="" />
                    <button href="#" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</button>
                    <button href="#" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</button>
                    <button href="#" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</button>

                </div>
            </div >
        </>
    )
}

export default layout;