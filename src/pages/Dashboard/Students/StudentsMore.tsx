import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { AddToGroup, Delete, GetAll, GetById, RemoveFromGroup } from "../../../service"
import { QueryPATH } from "../../../components"
import { Button, Modal, Popover, Tag } from "antd"
import { ApartmentOutlined, ArrowLeftOutlined, DeleteFilled, EditFilled, MinusCircleOutlined } from "@ant-design/icons"
import toast from "react-hot-toast"

const StudentsMore = () => {
    const navigate = useNavigate()
    const { studentsId } = useParams()
    const [cookies] = useCookies(['token'])
    const [delModal, setDelModal] = useState<boolean>(false)
    const [addGroup, setAddGroup] = useState<boolean>(false);
    const [removeGroupModal, setRemoveGroupModal] = useState<boolean>(false);
    const [selectedRemoveGroup, setSelectedRemoveGroup] = useState<{ id: number; name: string } | null>(null);
    const queryClient = useQueryClient()
    const [groupId, setGroupId] = useState<number | null>(null);

    const { data: moreInfo = {}, isLoading } = GetById(studentsId, cookies.token, QueryPATH.studentsMore, "/students")
    const { data: groups = [] } = GetAll(QueryPATH.groups, [], cookies.token, "/groups", {}, navigate);
    const { data: enrollments = [] } = GetAll(QueryPATH.entrolments, [], cookies.token, "/enrollments", {}, navigate);

    const { mutate: DeleteStudents, isPending } = Delete(cookies.token, `/students/${studentsId}`, navigate, queryClient, QueryPATH.students)
    const { mutate: AddGroup, isPending: isWaiting } = AddToGroup(cookies.token, `/enrollments`, navigate, queryClient, QueryPATH.students, QueryPATH.studentsMore);

    const { mutate: RmFromGroup, isPending: isRemoving } = RemoveFromGroup(cookies.token, navigate, queryClient, QueryPATH.students, QueryPATH.studentsMore)

    function handleAddToGroup() {
        if (!studentsId || !groupId) return;
        AddGroup({ studentId: Number(studentsId), groupId });
    }
    function getEnrollmentId(groupId: number): number | null {
        const found = enrollments.find(
            (e: any) => e.studentId === Number(studentsId) && e.groupId === groupId
        );
        return found?.id ?? null;
    }

    function handleRemoveFromGroup() {
        if (!selectedRemoveGroup) return;
        const enrollmentId = getEnrollmentId(selectedRemoveGroup.id);
        if (!enrollmentId) return toast.error("Enrollment topilmadi");
        RmFromGroup(enrollmentId);
    }

    function openRemoveModal(group: { id: number, name: string }) {
        setSelectedRemoveGroup(group);
        setRemoveGroupModal(true);
    }

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
            <div className="w-full mt-5 space-y-3 p-5 rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="text-[18px] font-bold">
                        <span className="text-[#8f5c28]">#ID:</span>
                        <strong>{studentsId}</strong>
                    </div>
                    <Button onClick={() => setAddGroup(true)} className="addgroup" type="dashed" size="middle" icon={<ApartmentOutlined />}></Button>
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
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Raqami:</span>
                            <strong>{moreInfo.phone}</strong>
                        </div>
                    </div>
                    <div className='p-4 rounded-lg w-[50%] border-2 border-[#8f5c28]'>
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Rasmi:</span>
                            <strong>{moreInfo.image ? moreInfo.image : "Rasm topilmadi"}</strong>
                        </div>
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Yo'nalishi:</span>
                            <strong>{moreInfo.stacks?.length > 0 ? moreInfo?.stacks?.map((stack: any) => `${stack.name}`) : "Bu o'quvhiga hali tayinlanmagan"}</strong>
                        </div>
                        <div className="text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Ustozi:</span>
                            <strong>{moreInfo.teachers?.length > 0 ? moreInfo?.teachers?.map((teacher: any) => `${teacher.firstName} ${teacher.lastName}`) : "O'qituvchisi yo'q"}</strong>
                        </div>
                        <div className="flex gap-2 text-[18px] font-bold">
                            <span className="text-[#8f5c28]">Guruxi:</span>
                            {moreInfo.groups?.length > 0 ? (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {moreInfo.groups.map((group: any) => (
                                        <Tag key={group.id} color="orange" closable closeIcon={
                                            <Popover title="Guruhdan chiqarish">
                                                <MinusCircleOutlined className="text-red-500 ml-1 cursor-pointer" />
                                            </Popover>
                                        } onClose={(e) => { e.preventDefault(); openRemoveModal({ id: group.id, name: group.name }); }}>
                                            {group.name}
                                        </Tag>
                                    ))}
                                </div>
                            ) : (
                                <strong> Noaniq</strong>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal confirmLoading={isPending} onOk={() => DeleteStudents()} okText="O'chirish" cancelText="Bekor qilish" open={delModal} onCancel={() => setDelModal(false)} title="O'chirmoqchimisiz?"  ></Modal>
            <Modal confirmLoading={isWaiting} onOk={handleAddToGroup} okButtonProps={{ disabled: !groupId }} okText="Qo'shish" cancelText="Bekor qilish" open={addGroup} onCancel={() => { setAddGroup(false); setGroupId(null); }} title="Guruxga qo'shish" >
                <div className="space-y-2">
                    <div className="font-medium">Guruh tanlang:</div>
                    <select className="w-full border rounded-lg p-2" value={groupId || ""} onChange={(e) => setGroupId(e.target.value ? Number(e.target.value) : null)} >
                        <option value="">Tanlang</option>
                        {groups.map((group: any) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal>
            <Modal confirmLoading={isRemoving} onOk={handleRemoveFromGroup} okType="danger" okText="Chiqarish" cancelText="Bekor qilish" open={removeGroupModal} onCancel={() => { setRemoveGroupModal(false); setSelectedRemoveGroup(null); }} title="Guruhdan chiqarish" >
                <p>
                    <strong>{moreInfo.firstName} {moreInfo.lastName}</strong> ni{" "}
                    <strong className="text-[#8f5c28]">{selectedRemoveGroup?.name}</strong>{" "}
                    guruhidan chiqarishni xohlaysizmi?
                </p>
            </Modal>
        </div>
    )
}

export default StudentsMore