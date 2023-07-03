import { httpInstance } from "@/utils/client"
// export function test(data: any) {
//     return httpInstance.post<any>("/retiree/list", data)
// }
export function test2() {
    return httpInstance.get("/home/getRecommend")
}
