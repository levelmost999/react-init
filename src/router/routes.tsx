/* eslint-disable @typescript-eslint/no-explicit-any */
import { Troutes } from "@/types/router"
import Home from "@/pages/home"
import Contact from "@/pages/contact"
import Login from "@/pages/login"
import NotFound from "@/components/errorPage/notFound"
import { Navigate, useRoutes } from "react-router-dom"
import React from "react"

export const routes: Troutes[] = [
    {
        path: "/",
        name: "Home",
        requiresAuth: true,
        element: <Navigate to='/home' />,
    },
    {
        path: "/home",
        name: "Home",
        requiresAuth: true,
        element: <Home />,
    },
    {
        path: "/login",
        name: "Login",
        element: <Login />,
    },
    {
        path: "/contact",
        name: "Contact",
        requiresAuth: true,
        element: <Contact />,
        children: [{ path: "asa", name: "Contact", element: <Contact /> }],
    },
    {
        path: "/not-found",
        name: "NotFound",
        element: <NotFound />,
    },
    {
        path: "*",
        name: "NotFound",
        element: <Navigate to='/not-found' />,
    },
]
const Routers = () => useRoutes(routes as any)
export default Routers
export const matchRoute = (path: string, routes: any[] = []): any => {
    let result: any = {}
    for (const item of routes) {
        if (item.path === path) return item
        if (item.children) {
            const res = matchRoute(path, item.children)
            if (Object.keys(res).length) result = res
        }
    }
    return result
}
