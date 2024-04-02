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

    return (
        <>
            <div className='min-h-screen flex flex-col '>
                <nav className="bg-gray-800 border-gray-200 border-b-[1px]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex flex-row justify-center items-center gap-5">
                                <div className="-mr-2 flex flex-row">
                                    <button onClick={toggleNavbar} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out">
                                        <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                        </svg>
                                        <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                <a href="#" className="text-white">Logo</a>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className={`${isOpen ? 'block' : 'hidden'} flex flex-row flex-1 h-full`}>
                    <div className=" px-10 pt-2 pb-3 bg-gray-800">
                        <a href="#" className="block text-white px-3 py-2 rounded-md text-base font-medium">Home</a>
                        <a href="#" className="mt-1 block text-white px-3 py-2 rounded-md text-base font-medium">About</a>
                        <a href="#" className="mt-1 block text-white px-3 py-2 rounded-md text-base font-medium">Contact</a>
                    </div>
                    {children}
                </div>
            </div>

        </>
    )
}

export default layout;