"use client"

import axios from "axios";
import {useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const handleLogout = async () => {
        try{
            await axios.get("./api/users/logout");
            router.push('/login')
        }
        catch(error: any){
            console.error(error);
        }
    }

    const getUserData = async () => {
        try{
            const response = await axios.get("./api/users/me");
            setUserData(response.data.data._id);
        }
        catch(error: any){
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <p>Profile Page</p>
            <button className= "bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2" onClick={handleLogout}>Logout</button>
            <button className= "bg-green-700 text-white rounded-md mt-4 hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2" onClick={getUserData}>{userData? userData : "Get User Details"}</button>
        </div>
    )
}