import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { QueryPATH } from "../components"
import { instance } from "../hooks"
import { Button } from "antd"
import { MoreOutlined } from "@ant-design/icons"
import type { NavigateFunction } from "react-router-dom"
import toast from "react-hot-toast"

const GetMe = (token: string) => {
    const data = useQuery({
        queryKey: [QueryPATH.me],
        queryFn: () => instance(token).get("/auth/me").then(res => res.data.data)
    })
    return data
}
const GetById = (id: string | undefined, token: string, queryPath: string, URL: string) => {
    const data = useQuery({
        queryKey: [queryPath, id],
        queryFn: () => instance(token).get(`${URL}/${id}`).then(res => res.data.data)
    })
    return data
}
const GetAll = (queryKey: string, filterProps: any[], token: string, URL: string, params: any, navigate?: NavigateFunction, returnFn?: any) => {
    const data = useQuery({
        queryKey: [queryKey, [...filterProps]],
        queryFn: () => instance(token).get(URL, { params: params ? params : {} }).then(res => {
            return navigate ? res.data.data.map((item: any, index: number) => {
                item.key = index + 1
                if (returnFn) {
                    const returned = returnFn(item)
                    Object.assign(item, returned)
                }
                item.action = <Button onClick={() => navigate(`${item.id}`)} className="bg-[#8f5c28]!" icon={<MoreOutlined />} type="primary"></Button>
                return item
            }) : res.data.data
        })
    })
    return data
}
const Delete = (token: string, URL: string, navigate: NavigateFunction, queryClient: QueryClient, queryKey: string) => {
    const data = useMutation({
        mutationFn: () => instance(token).delete(URL),
        onSuccess: () => {
            toast.success("O'chirildi!")
            setTimeout(() => {
                navigate(-1)
                queryClient.invalidateQueries({ queryKey: [queryKey] })
            })
        },
        onError: err => toast.error(err.message)
    })
    return data
}
const Create = (token: string, URL: string, navigate: NavigateFunction, queryClient: QueryClient, queryKey: string) => {
    const data = useMutation({
        mutationFn: (body: any) => instance(token).post(URL, body),
        onSuccess: () => {
            toast.success("Muvaffaqiyatli qo'shildi")
            navigate(-1)
            queryClient.invalidateQueries({ queryKey: [queryKey] })
        },
        onError: (err) => toast.error(err.message)
    })
    return data
}
const Update = (token: string, URL: string, navigate: NavigateFunction, queryClient: QueryClient, queryKey1: string, queryKey2: string) => {
    const data = useMutation({
        mutationFn: (body: any) => instance(token).patch(URL, body),
        onSuccess: () => {
            toast.success("Muvaffaqiyatli o'zgartirildi")
            navigate(-1)
            queryClient.invalidateQueries({ queryKey: [queryKey1] })
            queryClient.invalidateQueries({ queryKey: [queryKey2] })
        },
        onError: (err) => toast.error(err.message)
    })
    return data
}
const AddToGroup = (token: string, URL: string, navigate: NavigateFunction, queryClient: QueryClient, queryKey: string, queryKey2: string) => {
    const enrolment = useMutation({
        mutationFn: (body: any) => instance(token).post(URL, body),
        onSuccess: () => {
            toast.success("O'quvchi guruhga qo'shildi qo'shildi")
            navigate(-1)
            queryClient.invalidateQueries({ queryKey: [queryKey] })
            queryClient.invalidateQueries({ queryKey: [queryKey2] })
        },
        onError: (err: any) => toast.error(err?.message || "Nimadir hato ketti")
    })

    return enrolment
}

const RemoveFromGroup = (token: string, navigate: NavigateFunction, queryClient: QueryClient, queryKey: string, queryKey2: string) => {
    return useMutation({
        mutationFn: (enrollmentId: number) => instance(token).delete(`/enrollments/${enrollmentId}`),
        onSuccess: () => {
            toast.success("O'quvchi guruhdan chiqarildi")
            navigate(-1)
            queryClient.invalidateQueries({ queryKey: [queryKey] })
            queryClient.invalidateQueries({ queryKey: [queryKey2] })
        },
        onError: (err: any) => toast.error(err?.message || "Nimadir hato ketti")
    })
}

export { GetMe, GetById, GetAll, Delete, Create, Update, AddToGroup, RemoveFromGroup }