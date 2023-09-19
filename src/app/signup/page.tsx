'use client'

import Link from "next/link";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";


export default function SignUpPage() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDiabled, setButtonDisabled] = React.useState(false)

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0
            && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [user])
    const onSignUp = async () => {
        try {
            const response = await axios.post("/api/users/signup", user);
            console.log("sign up success", response.data);
            router.push('/login');
        } catch (error: any) {
            console.log('error occuredd', error.message)
        }
    }
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">User Sign-Up</h1>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                    className="w-full px-4 py-2 mt-2 rounded-lg border focus:ring focus:ring-blue-200"
                    required />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 rounded-lg border focus:ring focus:ring-blue-200"
                    required />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 rounded-lg border focus:ring focus:ring-blue-200"
                    required />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    onClick={onSignUp}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 ${buttonDiabled ? 'cursor-not-allowed opacity-50' : ''}`}>
                    {buttonDiabled ? 'No Sign-Up' : 'Sign-Up'}
                </button>
                <Link href="/login" className="text-blue-500 hover:underline">Visit Login Page</Link>
            </div>
        </div>


    )
}