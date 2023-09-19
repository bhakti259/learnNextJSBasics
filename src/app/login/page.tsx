'use client'
import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/navigation"; // Corrected import path
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await axios.post('api/users/login', user);
      console.log('User logged in', response.data);
      router.push('/profile');
    } catch (error: any) {
      console.log('Error occurred', error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
        <div>
          <button
            type="submit"
            onClick={onLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
