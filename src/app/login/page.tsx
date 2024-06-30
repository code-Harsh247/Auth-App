"use client"

import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)


    const onLogin = async () => {
        try{
            setLoading(true);
            const response =  await axios.post("/api/users/login", user);
            console.log("Login Success ", response.data);
            router.push('/profile');
        }
        catch(err: any){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        }
        else setButtonDisabled(true)
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                id="password"
                type="text"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button
                className="p-2 bg-blue-500 text-white rounded-md"
                onClick={onLogin}>
                Log in
            </button>
            <Link href="/signup">Sign Up here</Link>
        </div>
    )
}