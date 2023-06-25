/* eslint-disable @typescript-eslint/no-explicit-any */
export const setSessionStorage = (key: string, value: any) => {
    if (window.sessionStorage) {
        window.sessionStorage.setItem(key, JSON.stringify(value))
    }
}

export const getSessionStorage = <T = any>(key: string): T | null => {
    const value = window.sessionStorage && window.sessionStorage.getItem(key)
    if (value) {
        try {
            return JSON.parse(value) as T
        } catch (err) {
            console.log("err", err)
            return null
        }
    } else {
        return null
    }
}

export const removeSessionStorage = (key: string) => {
    if (window.sessionStorage) {
        window.sessionStorage.removeItem(key)
    }
}
