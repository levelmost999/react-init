export const ACTION_TYPE = {
    UPDATE_PATHNAME: "UPDATE_PATHNAME",
    SET_TOKEN: "SET_TOKEN",
}
export interface IContextState {
    pathname: string
    token: string
}
