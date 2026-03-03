import { useNavigate } from "react-router-dom"
import { Caption, CustomTable, QueryPATH } from "../../../components"
import { GetAll } from "../../../service"
import { useCookies } from "react-cookie"
import { useState } from "react"
import { debounce } from "../../../hooks"
import { Input } from "antd"

const Rooms = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)

  const { data: rooms = [], isLoading } = GetAll(QueryPATH.rooms, [name], cookies.token, "/rooms", { name }, navigate)

  const column = [
    { title: 'ID', dataIndex: 'key' },
    { title: "Xona nomi", dataIndex: 'name' },
    { title: "Xona Sig'imi", dataIndex: 'capacity' },
    { title: 'Batafsil', dataIndex: 'action' },
  ]

  return (
    <div className="p-5">
      <Caption title="Xonalar" count={rooms.length} />
      <Input onChange={(e) => setSearch(e.target.value)} className="w-80! my-5" size="large" placeholder="Qidirish..." allowClear />
      <CustomTable columns={column} data={rooms} loading={isLoading} />
    </div>
  )
}

export default Rooms