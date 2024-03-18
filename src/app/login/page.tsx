"use client"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const expirationTime = new Date(Date.now() + 2 * 60 * 60 * 1000)
    const router = useRouter()
    async function login (e: { preventDefault: () => void }) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_LOGIN as string, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            if (data.status === false) {
                console.log(data.message)
                alert(data.message)
            } else {
                console.log(data.message)
                setCookie('Authorization', data.token, { expires: expirationTime, sameSite: 'none', secure: true })
                router.push('/')
            }
        } catch (error) {
          console.error('Error during login:', error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
                    <form onSubmit={login}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                            <input type="text" id="username" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <a href="#"
                                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                                Password?</a>
                        </div>
                        <button type="submit" disabled={isLoading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}> {isLoading ? 'Loading...' : 'Login'} </button>
                    </form>
                </div>
            </div>
        </>
    )
}