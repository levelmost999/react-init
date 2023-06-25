import { IContextState } from "@/constants/actionTypes"

const initialState = (): IContextState => {
    return {
        pathname: "/",
        token: "",
    }
}

export default initialState
