import { useApplicationState } from "@/context/appContext"
import React from "react"
const Contact = () => {
    const [{ pathname }] = useApplicationState()
    return (
        <div>
            <h1>Contact{pathname}</h1>
        </div>
    )
}
export default Contact
