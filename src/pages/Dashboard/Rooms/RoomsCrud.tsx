import { PlusCircleOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Input } from "antd"
import { useEffect, useState, type SubmitEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { QueryPATH } from "../../../components"
import { Create, GetById, Update } from "../../../service"

const RoomsCrud = () => {
    const { roomsId } = useParams()
    const navigate = useNavigate()
    const [cookies] = useCookies(['token'])
    const [name, setName] = useState<string>("")
    const [capacity, setCapacity] = useState<number>(0)
    const queryClient = useQueryClient()

    
    const { mutate: RoomCreate, isPending } = Create(cookies.token, "/rooms", navigate, queryClient, QueryPATH.rooms)

    const { mutate: RoomUpdate, isPending: updateLoading } = Update(cookies.token, `/rooms/${roomsId}`, navigate, queryClient, QueryPATH.roomsMore, QueryPATH.rooms)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = { name, capacity }
        roomsId ? RoomUpdate(data) : RoomCreate(data)
    }

    const { data: moreInfo = {} } = roomsId ? GetById(roomsId, cookies.token, QueryPATH.roomsMore, "/rooms") : {}
    useEffect(() => {
        if (roomsId && moreInfo) {
            setName(moreInfo.name)
            setCapacity(moreInfo.capacity)
        }
    }, [roomsId, moreInfo])

    return (
        <form onSubmit={handleSubmit} className="p-5">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-[25px]">Yo'nalish {roomsId ? "tahrirlash" : "qo'shish"}</h1>
                <Button loading={roomsId ? updateLoading : isPending} htmlType="submit" icon={<PlusCircleOutlined />} size="large" type="primary">Saqlash</Button>
            </div>
            <div className="flex items-center justify-center gap-5 m-5">
                <label className="flex flex-col w-[40%]! gap-1">
                    <span className="text-[#8f5c28] pl-1">Xona nomini kiriting:</span>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="w-full" allowClear size="large" placeholder="Xona nomi" />
                </label>
                <label className="flex flex-col w-[40%]! gap-1">
                    <span className="text-[#8f5c28] pl-1">O'quvchi sig'imini kiriting:</span>
                    <Input value={capacity} type={"number"} onChange={(e) => setCapacity(Number(e.target.value))} className="w-full" allowClear size="large" placeholder="Sig'im" />
                </label>
            </div>
        </form>
    )
}

export default RoomsCrud