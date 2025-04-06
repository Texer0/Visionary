const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

import { useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useCookies } from "react-cookie"
import { verifyCookies } from "../../utils/coockie_managment"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const AuthGuard = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["Visionary_token"])
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    const deleteCookies = () => {
        removeCookie("Visionary_access_token")
        removeCookie("Visionary_user_data")
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const result = await verifyCookies()
                if (!result) {deleteCookies()}
                setIsAuthenticated(result)
            } catch (error) {
                if (DEBUG) {
                    console.error("Error in AuthGuard:", error)
                    setIsAuthenticated(false)
                }
            }
        }
        checkAuth()
    }, [])

    if (isAuthenticated === null) return <LoadingSpinner/>

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default AuthGuard
