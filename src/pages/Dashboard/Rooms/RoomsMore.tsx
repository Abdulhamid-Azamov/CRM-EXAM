import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { QueryPATH } from "../../../components"
import { useCookies } from "react-cookie"
import { Delete, GetById } from "../../../service"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

const RoomsMore = () => {
    const navigate = useNavigate()
    const { roomsId } = useParams()
    const [cookies] = useCookies(['token'])
    const [delModal, setDelModal] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const { data: moreInfo = {}, isLoading } = GetById(roomsId, cookies.token, QueryPATH.roomsMore, "/rooms")


    const { mutate: DeleteStack, isPending } = Delete(cookies.token, `/rooms/${roomsId}`, navigate, queryClient, QueryPATH.rooms)


    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <Button onClick={() => navigate(-1)} type="dashed" icon={<ArrowLeftOutlined />}></Button>
                    <h2 className="font-bold text-[25px]">{isLoading ? "Loading..." : moreInfo.name}</h2>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => setDelModal(true)} className="bg-red-500!" type="primary" size="large" icon={<DeleteFilled />}></Button>
                    <Button onClick={() => navigate("update")} size="large" type="primary" icon={<EditFilled />}>Tahrirlash</Button>
                </div>
            </div>
            <div className="w-[50%] mt-5 space-y-3 p-5 rounded-xl border border-slate-500">
                <div className="text-[18px] font-bold">
                    <span className="text-[#8f5c28]">#ID:</span>
                    <strong>{roomsId}</strong>
                </div>
                <div className="text-[18px] font-bold">
                    <span className="text-[#8f5c28]">Xona Nomi:</span>
                    <strong>{moreInfo.name}</strong>
                </div>
                <div className="text-[18px] font-bold">
                    <span className="text-[#8f5c28]">O'quvchi Sig'imi:</span>
                    <strong>{moreInfo.capacity}</strong>
                </div>
                <div className="text-[18px] font-bold">
                    <span className="text-[#8f5c28]">Yaratilingan vaqt:</span>
                    <strong>{moreInfo.createdAt && new Date(moreInfo.createdAt).toLocaleDateString("uz-UZ")}</strong>
                </div>
                <div className="text-[18px] font-bold">
                    <span className="text-[#8f5c28]">O'zgartirilgan vaqt:</span>
                    <strong>{moreInfo.updatedAt && new Date(moreInfo.createdAt).toLocaleDateString("uz-UZ")}</strong>
                </div>
            </div>
            <Modal confirmLoading={isPending} onOk={() => DeleteStack()} okText="O'chirish" cancelText="Bekor qilish" open={delModal} onCancel={() => setDelModal(false)} title="O'chirmoqchimisiz?"></Modal>
        </div>
    )
}

export default RoomsMore