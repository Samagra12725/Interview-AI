import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            localStorage.setItem("isLoggedIn", "true")
            return true
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.message || "Login failed")
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            localStorage.setItem("isLoggedIn", "true")
            return true
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.message || "Registration failed")
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            localStorage.removeItem("isLoggedIn")
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
            if (!isLoggedIn) {
                setLoading(false);
                return;
            }

            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                localStorage.removeItem("isLoggedIn");
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}