import { getSessionStorage } from "@/utils/storage"
export const useIsLogin = (): string | null => {
    return getSessionStorage("token")
}
