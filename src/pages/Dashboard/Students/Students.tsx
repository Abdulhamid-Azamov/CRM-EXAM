import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { debounce } from '../../../hooks'
import { GetAll } from '../../../service'
import { Caption, CustomSelect, CustomTable, QueryPATH } from '../../../components'
import { Input } from 'antd'
import { MinusOutlined } from '@ant-design/icons'


interface StudentsProps {
  groupId?: number | string
  teacherPropId?: number | null,
}

const Students = ({ groupId, teacherPropId }: StudentsProps) => {
  const navigate = useNavigate()
  const { stackId: stackPropId } = useParams()
  const [cookies] = useCookies(['token'])
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)
  const [stackId, setStackId] = useState<number | null>(stackPropId ? Number(stackPropId) : null)
  const [teacherId, setTeacherId] = useState<number | null>(teacherPropId ? teacherPropId : null)


  const column = [
    { title: "ID", dataIndex: "key" },
    { title: "Ism", dataIndex: "firstName" },
    { title: "Familiya", dataIndex: "lastName" },
    { title: "Telefon raqam", dataIndex: "phone" },
    { title: "Guruxlar", dataIndex: "groupName" },
    { title: "Ustoz", dataIndex: "teacherName" },
    { title: "Batafsil", dataIndex: "action" },
  ]



  function returnFn(value: any) {
    const groups = value.groups || []
    const teachers = value.teachers || []

    return {
      ...value,
      groupName: groups.length ? groups.map((item: any) => item.name).join(", ") : <MinusOutlined />,
      teacherName: teachers.length ? teachers.map((teacher: any) => `${teacher.firstName} ${teacher.lastName}`).join(", ") : <MinusOutlined />,
    }
  }



  const { data: students = [], isLoading } = GetAll(QueryPATH.students, [name, stackId, groupId, teacherId], cookies.token, "/students", { name, stackId, groupId, teacherId }, navigate, returnFn)

  return (
    <div className="p-5">
      <Caption title="O'quvchilar" count={students.length} />
      <Input onChange={(e) => setSearch(e.target.value)} className="w-80! my-5" size="large" placeholder="Qidirish..." allowClear />
      <CustomSelect disabled={stackPropId ? true : false} extraClass='ml-10!' placeholder="Yo'nalish tanlang" URL="/stacks" queryKey={QueryPATH.stacks} setValue={setStackId} value={stackId} />
      <CustomSelect extraClass='ml-10!' disabled={teacherPropId ? true : false} placeholder="Ustoz tanlang" URL="/teachers" queryKey={QueryPATH.teachers} setValue={setTeacherId} value={teacherId} />
      <CustomTable loading={isLoading} columns={column} data={students} />
    </div>
  )
}

export default Students
