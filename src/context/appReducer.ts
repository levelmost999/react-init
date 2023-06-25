/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACTION_TYPE } from "@/constants/actionTypes"

let newState: any
const ApplicationReducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTION_TYPE.UPDATE_PATHNAME:
            newState = {
                ...state,
                pathname: action.pathname,
            }
            break
        case ACTION_TYPE.SET_TOKEN:
            newState = {
                ...state,
                token: action.token,
            }
            break
        default:
            newState = state
            break
    }
    return newState
}

export default ApplicationReducer
