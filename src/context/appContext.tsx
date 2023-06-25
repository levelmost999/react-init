import React, { createContext, FC, useContext, useReducer } from "react"
import ApplicationReducer from "./appReducer"
import initialState from "./initialState"
import { IContextState } from "@/constants/actionTypes"

type Props = {
    children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/ban-types
type ContextType = IContextState & Function

const AppContext = createContext([] as ContextType[])

export const AppProvider: FC<Props> = ({ children, ...others }) => {
    const [appState, dispatch] = useReducer(ApplicationReducer, initialState())
    const mergeState = { ...appState, ...others }

    return (
        <AppContext.Provider value={[mergeState, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}

export const useApplicationState = () => useContext<ContextType[]>(AppContext)
