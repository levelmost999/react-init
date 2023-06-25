import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { routes, matchRoute } from "./routes"
import { useIsLogin } from "@/hooks/useIsLogin"

/* eslint-disable @typescript-eslint/no-explicit-any */
const BeforeEach = (props: any) => {
    const token = useIsLogin()
    const { pathname } = useLocation()

    const route = matchRoute(pathname, routes)
    if (token && pathname === "/login") {
        return <Navigate to='/home' replace={true} />
    }
    if (!route.requiresAuth) {
        return props.children
    }
    if (!token) {
        return <Navigate to='/login' replace={true} />
    }
    return props.children
}

export default BeforeEach
