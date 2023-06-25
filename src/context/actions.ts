/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACTION_TYPE } from "@/constants/actionTypes"
import { setSessionStorage } from "@/utils/storage"

export function setToken(dispatch: any) {
    setSessionStorage("token", "123")
    dispatch({
        type: ACTION_TYPE.SET_TOKEN,
        token: "123",
    })
    return "123"
}
