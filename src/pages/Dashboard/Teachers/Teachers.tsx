import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { debounce } from '../../../hooks'
import { GetAll } from '../../../service'
import { Caption, CustomSelect, CustomTable, QueryPATH } from '../../../components'
import { Input } from 'antd'

const Teachers = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)
  const [stackId, setStackId] = useState<number | null>(null)


  const column = [
    { title: "ID", dataIndex: "key" },
    { title: "Ism", dataIndex: "firstName" },
    { title: "Familiya", dataIndex: "lastName" },
    { title: "Telefon raqam", dataIndex: "phone" },
    { title: "Yo'nalishi", dataIndex: "stackName" },
    { title: "Batafsil", dataIndex: "action" },
  ]
  function returnFn(value: any) {
    value.stackName = value.stack ? value?.stack?.name : "➖"
    value.teacherName = `${value?.teacher?.firstName} ${value?.teacher?.lastName}`
  }



  const { data: teachers = [], isLoading } = GetAll(QueryPATH.teachers, [name, stackId], cookies.token, "/teachers", { name, stackId }, navigate, returnFn)

  
  return (
    <div className="p-5">
      <Caption title="Ustozlar" count={teachers.length} />
      <Input onChange={(e) => setSearch(e.target.value)} className="w-80! my-5" size="large" placeholder="Qidirish..." allowClear />
      <CustomSelect extraClass='ml-10!' placeholder="Yo'nalish tanlang" URL="/stacks" queryKey={QueryPATH.stacks} setValue={setStackId} value={stackId} />
      <CustomTable loading={isLoading} columns={column} data={teachers} />
    </div>
  )
}

export default Teachers
