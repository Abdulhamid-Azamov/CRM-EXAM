import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { Delete, GetById } from '../../../service'
import { QueryPATH } from '../../../components'
import { Button, Modal } from 'antd'
import { ArrowLeftOutlined, DeleteFilled, EditFilled } from '@ant-design/icons'
import Groups from '../Groups/Groups'

const TeachersMore = () => {
    const navigate = useNavigate()
    const { teachersId } = useParams()
    const [cookies] = useCookies(['token'])
    const [delModal, setDelModal] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const { data: moreInfo = {}, isLoading } = GetById(teachersId, cookies.token, QueryPATH.teachersMore, "/teachers")

    const { mutate: DeleteStack, isPending } = Delete(cookies.token, `/teachers/${teachersId}`, navigate, queryClient, QueryPATH.teachers)
    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <Button onClick={() => navigate(-1)} type="dashed" icon={<ArrowLeftOutlined />}></Button>
                    <h2 className="font-bold text-[25px]">{isLoading ? "Loading..." : `${moreInfo.firstName} ${moreInfo.lastName}`}</h2>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => setDelModal(true)} className="bg-red-500!" type="primary" size="large" icon={<DeleteFilled />}></Button>
                    <Button onClick={() => navigate("update")} size="large" type="primary" icon={<EditFilled />}>Tahrirlash</Button>
                </div>
            </div>
            <div className=" w-full mt-5 space-y-3 p-5 rounded-xl ">
                <div className="text-[18px] font-bold">
                    <span className="text-[#8f5c28]">#ID:</span>
                    <strong>{teachersId}</strong>
                </div>
                <div className='flex gap-2.5'>
                    <div className='p-4 rounded-lg w-[50%] border-2 border-[#8f5c28]'>
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Ismi:</span>
                            <strong>{moreInfo.firstName}</strong>
                        </div>
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Familiyasi:</span>
                            <strong>{moreInfo.lastName}</strong>
                        </div>
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Elektron manzili:</span>
                            <strong>{moreInfo.email}</strong>
                        </div>
                    </div>
                    <div className='p-4 rounded-lg w-[50%] border-2 border-[#8f5c28]'>
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Raqami:</span>
                            <strong>{moreInfo.phone}</strong>
                        </div>
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Yo'nalishi:</span>
                            <strong>{moreInfo?.stack?.name}</strong>
                        </div>
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Rasmi:</span>
                            <strong>{moreInfo.image ? moreInfo.image : "...."}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <Modal confirmLoading={isPending} onOk={() => DeleteStack()} okText="O'chirish" cancelText="Bekor qilish" open={delModal} onCancel={() => setDelModal(false)} title="O'chirmoqchimisiz?"></Modal>

            <Groups teacherPropId={Number(teachersId)} title={`${moreInfo.firstName}/guruxlar`} />
        </div>
    )
}

export default TeachersMore
