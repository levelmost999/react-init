import { BrowserRouter as Router } from "react-router-dom"
import React from "react"
import BeforeEach from "./beforeEach"
import Routers from "./routes"

const AppRouter = () => {
    return (
        <Router>
            <BeforeEach>
                <Routers />
            </BeforeEach>
        </Router>
    )
}
export default AppRouter
