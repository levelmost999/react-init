/* eslint-disable @typescript-eslint/no-explicit-any */
export type Troutes = {
    path: string
    name: string
    element: any
    requiresAuth?: boolean
    children?: Troutes[]
}
