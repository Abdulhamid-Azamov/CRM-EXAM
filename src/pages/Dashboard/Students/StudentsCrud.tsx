import { useQueryClient } from "@tanstack/react-query"
import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Create, GetById, Update } from "../../../service"
import { QueryPATH } from "../../../components"
import { PlusCircleOutlined } from "@ant-design/icons"

const StudentsCrud = () => {
    const { studentsId } = useParams()
    const navigate = useNavigate()
    const [cookies] = useCookies(['token'])
    const queryClient = useQueryClient()


    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string | number>("+998")
    const [password, setPassword] = useState<string>("")



    const { mutate: StudentCreate, isPending: createLoading } = Create(cookies.token, "/students", navigate, queryClient, QueryPATH.students)

    const { mutate: StudentUpdate, isPending: updateLoading } = Update(cookies.token, `/students/${studentsId}`, navigate, queryClient, QueryPATH.studentsMore, QueryPATH.students)

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = { firstName, lastName, email, phone, password }
        studentsId ? StudentUpdate(data) : StudentCreate(data)

        if (password) {
            data.password = password
        }
    }


    const { data: moreInfo = {} } = studentsId ? GetById(studentsId, cookies.token, QueryPATH.studentsMore, "/students") : {}

    useEffect(() => {
        if (moreInfo && studentsId) {
            setFirstName(moreInfo.firstName)
            setLastName(moreInfo.lastName)
            setEmail(moreInfo.email)
            setPhone(moreInfo.phone)
            setPassword(moreInfo.password)
        }
    }, [studentsId, moreInfo])


    return (
        <form onSubmit={handleSubmit} className="p-5">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-[25px]">O'quvchini {studentsId ? "tahrirlash" : "qo'shish"}</h1>
                <Button loading={studentsId ? updateLoading : createLoading} htmlType="submit" icon={<PlusCircleOutlined />} size="large" type="primary">Saqlash</Button>
            </div>
            <div className="flex items-center justify-center gap-5 m-5">
                <div className="w-[45%] flex flex-col gap-3">
                    <label className="flex flex-col w-full! gap-1">
                        <span className="text-[#8f5c28] pl-1">Ismni kiriting:</span>
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full" allowClear size="large" placeholder="Ismi" />
                    </label>
                    <label className="flex flex-col w-full! gap-1">
                        <span className="text-[#8f5c28] pl-1">Familyani kiriting:</span>
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full" allowClear size="large" placeholder="Familiya" />
                    </label>
                    <label className="flex flex-col w-full! gap-1">
                        <span className="text-[#8f5c28] pl-1">Elektron Pochtani kiriting:</span>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" allowClear size="large" placeholder="Elektron Pochta" />
                    </label>
                </div>
                <div className="w-[45%] flex flex-col gap-3">
                    <label className="flex flex-col w-full! gap-1">
                        <span className="text-[#8f5c28] pl-1">Telefon raqamini kiriting:</span>
                        <Input type={"text"} value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" allowClear size="large" placeholder="Telefon raqam kiriting" />
                    </label>
                    <label className="flex flex-col w-full! gap-1">
                        <span className="text-[#8f5c28] pl-1">Parolni kiriting:</span>
                        <Input.Password type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" allowClear size="large" placeholder="Parol kiriting" />
                    </label>
                </div>
            </div>
        </form>
    )
}

export default StudentsCrud
