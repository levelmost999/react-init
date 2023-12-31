import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.less"
import { useApplicationState } from "@/context/appContext"
import { ACTION_TYPE } from "@/constants/actionTypes"
import { setToken } from "@/context/actions"
import { test2 } from "@/api/login"
const Login = () => {
    const navigate = useNavigate()
    const [, dispatch] = useApplicationState()
    useEffect(() => {
        test2()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        dispatch({ type: ACTION_TYPE.UPDATE_PATHNAME, pathname: "6666" })
    }, [])

    const handleClick = () => {
        setToken(dispatch)
        navigate("/contact", { replace: true })
    }
    return (
        <div className={styles.test}>
            <h1 onClick={handleClick}>Login</h1>
        </div>
    )
}
export default Login
