import { useQueryClient } from "@tanstack/react-query"
import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Create, GetById, Update } from "../../../service"
import { CustomSelect, QueryPATH } from "../../../components"
import { PlusCircleOutlined } from "@ant-design/icons"

const TeachersCrud = () => {
  const { teachersId, stackId: stackPathId } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const queryClient = useQueryClient()

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string | number>("+998")
  const [password, setPassword] = useState<string>("")
  const [stackId, setStackId] = useState<number | null>(stackPathId ? Number(stackPathId) : null)

  const { mutate: TeacherCreate, isPending: createLoading } = Create(cookies.token, "/teachers", navigate, queryClient, QueryPATH.teachers)

  const { mutate: Teachersupdate, isPending: updateLoading } = Update(cookies.token, `/teachers/${teachersId}`, navigate, queryClient, QueryPATH.teachersMore, QueryPATH.teachers)

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = { firstName, lastName, email, phone, password, stackId }
    teachersId ? Teachersupdate(data) : TeacherCreate(data)
  }


  const { data: moreInfo = {} } = teachersId ? GetById(teachersId, cookies.token, QueryPATH.teachersMore, "/teachers") : {}

  useEffect(() => {
    if (moreInfo && teachersId) {
      setFirstName(moreInfo.firstName)
      setLastName(moreInfo.lastName)
      setEmail(moreInfo.email)
      setPhone(moreInfo.phone)
      setPassword(moreInfo.password)
      setStackId(moreInfo.stackId)
    }
  }, [moreInfo])


  return (
    <form onSubmit={handleSubmit} className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[25px]">O'qituvchini {teachersId ? "tahrirlash" : "qo'shish"}</h1>
        <Button loading={teachersId ? updateLoading : createLoading} htmlType="submit" icon={<PlusCircleOutlined />} size="large" type="primary">Saqlash</Button>
      </div>
      <div className="flex items-center justify-center gap-5 m-5">
        <div className="w-[45%] flex flex-col gap-3">
          <label className="flex flex-col w-full! gap-1">
            <span className="text-[#8f5c28] pl-1">Ismingizni kiriting:</span>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full" allowClear size="large" placeholder="Ismi" />
          </label>
          <label className="flex flex-col w-full! gap-1">
            <span className="text-[#8f5c28] pl-1">Familyangizni kiriting:</span>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full" allowClear size="large" placeholder="Familiya" />
          </label>
          <label className="flex flex-col w-full! gap-1">
            <span className="text-[#8f5c28] pl-1">Elektron Pochtangizni kiriting:</span>
            <Input type={email} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" allowClear size="large" placeholder="Elektron Pochta" />
          </label>
        </div>
        <div className="w-[45%] flex flex-col gap-3">
          <label className="flex flex-col w-full! gap-1">
            <span className="text-[#8f5c28] pl-1">Telefon raqamingizni kiriting:</span>
            <Input type={"tel"} value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" allowClear size="large" placeholder="Telefon raqam kiriting" />
          </label>
          <label className="flex flex-col w-full! gap-1">
            <span className="text-[#8f5c28] pl-1">Parolingizni kiriting:</span>
            <Input.Password type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" allowClear size="large" placeholder="Parol kiriting" />
          </label>
          <label className="flex flex-col w-full! gap-1">
            <span className="text-[#8f5c28] pl-1">Yo'nalish tanlang:</span>
            <CustomSelect disabled={stackPathId ? true : false} extraClass="w-full!" URL="/stacks" placeholder="Yo'nalish tanlang" queryKey={QueryPATH.stacks} setValue={setStackId} value={stackId} />
          </label>
        </div>
      </div>
    </form>
  )
}

export default TeachersCrud
