/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIsLogin } from "@/hooks/useIsLogin"
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios"
const Timeout = 30 * 1000
class Client {
    httpInstance: AxiosInstance
    unauthorizedModalFlag: boolean
    pending: Map<string, any>

    constructor() {
        this.httpInstance = Axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            timeout: Timeout,
        })
        this.unauthorizedModalFlag = false
        this.pending = new Map<string, any>()

        this.httpInstance.interceptors.request.use((config) => {
            const token = useIsLogin()
            if (token) {
                config.headers["token"] = token
            }
            this.removePending(config)
            this.addPending(config)
            return config
        })
        this.httpInstance.interceptors.response.use((response) => {
            this.removePending(response)
            return response
        })
    }
    addPending = (config: AxiosRequestConfig) => {
        const url = [config.method, config.url].join("&")
        config.cancelToken =
            config.cancelToken ||
            new Axios.CancelToken((cancel) => {
                if (!this.pending.has(url)) {
                    this.pending.set(url, cancel)
                }
            })
    }
    removePending = (config: AxiosRequestConfig) => {
        const url = [config.method, config.url].join("&")
        if (this.pending.has(url)) {
            const cancel = this.pending.get(url)
            cancel(url)
            this.pending.delete(url)
        }
    }

    request<T>(options: AxiosRequestConfig) {
        const { url, data, method, params } = options

        return new Promise<T>((resolve, reject) => {
            this.httpInstance
                .request({ url, data, params, method })
                .then((response) => {
                    const data = response.data || {}
                    const { success, result, code: status } = data
                    if (success) {
                        return resolve(result)
                    }
                    reject(result)
                })
                .catch((e) => {
                    const error = e.response || {}

                    reject(error)
                })
        })
    }
    async get<T>(url: string, options?: Omit<AxiosRequestConfig, "url">) {
        return this.request<T>({
            ...options,
            method: "GET",
            url,
        })
    }

    async post<T>(
        url: string,
        data: Record<string, any>,
        options?: Omit<AxiosRequestConfig, "url">,
    ) {
        return this.request<T>({
            ...options,
            method: "POST",
            data,
            url,
        })
    }

    async put<T>(
        url: string,
        data: Record<string, any>,
        options?: Omit<AxiosRequestConfig, "url">,
    ) {
        return this.request<T>({
            ...options,
            method: "PUT",
            data,
            url,
        })
    }

    async delete<T>(url: string, options?: Omit<AxiosRequestConfig, "url">) {
        return this.request<T>({
            ...options,
            method: "DELETE",
            url,
        })
    }
}
export const httpInstance = new Client()
