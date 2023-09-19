'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage () {
    const router = useRouter();
    const [ userDetailsId, setUserDetailsId ] = useState("nothing")
    const onLogout = async () => {
        try {
           const response = await axios.get("/api/users/logout");
           console.log("logout success", response.data);
           router.push('/login'); 
        } catch (error: any) {
            console.log('error occuredd logging out', error.message)
        }
    }

    const onGetUserDetails = async () => {
        try {
            const response  =  await axios.get("/api/users/me");
            console.log('sucessfuly got the user details ', response.data)  
            setUserDetailsId(response.data.data._id);       
        } catch (error: any) {
            console.log('error occuredd getting user details', error.message)
        }
    }

    return  (
        <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">
          Hello {userDetailsId === 'nothing' ? "Buddy" : (
            <Link href={`/profile/${userDetailsId}`} className="text-blue-500 hover:underline">
              Go to profile for logged In user
            </Link>
          )}
        </h2>
        <button
          type="submit"
          onClick={onGetUserDetails}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-4 focus:outline-none focus:ring focus:ring-blue-200">
          Get User Details
        </button>
        <button
          type="submit"
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-red-200">
          Log out
        </button>
      </div>
      
    )
}