"use client"
import { deleteCookie, getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const cookielogin = getCookie('Authorization', { sameSite: 'none', secure: true })
    async function sudahlogin () {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_SUDAH_LOGIN as string, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': cookielogin as string
                }
            })

            const data = await response.json()
            if (data.status === false) {
                router.push('/login')
            } else {
                setIsLoggedIn(true)
            }
        } catch (error) {
          console.error('Error during login:', error)
        }
    }

    function Logout() {
        deleteCookie('Authorization', { sameSite: 'none', secure: true })
        setTimeout(() => {
            window.location.reload()
            router.push('/login')
        }, 1000)
    }

    useEffect(() => {
        sudahlogin()
    }, [])

    if (!isLoggedIn) {
        return null
    }

    return (
        <>
            <nav className="flex px-4 border-b md:shadow-lg items-center relative">
                <div className="text-lg font-bold md:py-0 py-4">
                    Logo
                </div>
                <ul className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0">
                    <li>
                        <button onClick={Logout} className="flex md:inline-flex p-4 items-center text-red-500 hover:bg-gray-50 hover:text-inherit">
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
                <div className="ml-auto md:hidden text-gray-500 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                </div>
            </nav>
            <main>
                <div className="h-screen flex items-center justify-center text-2xl">Halaman Ini Hanya Bisa Diakses Jika Berhasil Login</div>
            </main>
        </>
    )
}