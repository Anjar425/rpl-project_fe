"use client";

import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import Cookies from 'js-cookie';

export default function Test() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [validation, setValidation] = useState([]);

    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();

        axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
        axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
        axios.defaults.withCredentials = true;

        const formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);

        const headers = {
            Accept: "aplication/json",
        };

        try {
            await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, formData, { headers: headers }); // Mengubah dari GET menjadi POST
            Cookies.set("token", response.data.body.token);
            router.push("/dashboard");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setValidation(error.response.data.errors); // Mengambil error validation dari response
            } else {
                setValidation({ error: "Email atau password salah." }); // Jika ada error selain dari validation
            }
        }


        setLoading(false);
    };

    useEffect(() => {
        if (Cookies.get('token')) {
            router.push('/dashboard');
        }
    }, []);

    return (
        <main>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width={32} height={32} className="mr-2" />
                        Flowbite
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                    {
                                        validation.email && validation.length > 0 && (
                                            <error className="text-red-500 text-sm">
                                                {validation.email[0]}
                                            </error>
                                        )
                                    }
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                    {validation.password && <error className="text-red-500 text-sm">{validation.password[0]}</error>}
                                </div>
                                {validation.error && <error className="text-red-500 text-sm">Email atau password salah.</error>}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Sign up
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

