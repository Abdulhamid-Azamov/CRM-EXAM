import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { DashboardHome, Groups, GroupsCrud, GroupsMore, NotFound, Rooms, RoomsCrud, RoomsMore, Stacks, StacksCrud, StacksMore, Students, StudentsCrud, StudentsMore, Teachers, TeachersCrud, TeachersMore, Users } from "../pages"
import { Header, Sitebar } from "../modules"
import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import { GetMe } from "../service"
import { useCookies } from "react-cookie"

const DashboardRoute = () => {
    const [cookies] = useCookies(['token'])
    const { collapse } = useContext(Context)
    const { data: userInfo = {} } = GetMe(cookies.token)
    const [routeList, setRouteList] = useState([
        { id: 1, path: PATH.home, element: <DashboardHome /> },


        { id: 2, path: PATH.stacks, element: <Stacks /> },
        { id: 3, path: PATH.stacksMore, element: <StacksMore /> },
        { id: 4, path: PATH.stacksCreate, element: <StacksCrud /> },
        { id: 5, path: PATH.stacksUpdate, element: <StacksCrud /> },
        { id: 6, path: PATH.stacksMoreByGroupMore, element: <GroupsMore /> },
        { id: 7, path: PATH.stacksGroupCreate, element: <GroupsCrud /> },
        { id: 8, path: PATH.stacksMoreByGroupUpdate, element: <GroupsCrud /> },


        { id: 9, path: PATH.groups, element: <Groups title={"Guruxlar"} /> },
        { id: 10, path: PATH.groupsMore, element: <GroupsMore /> },
        { id: 11, path: PATH.groupsCreate, element: <GroupsCrud /> },
        { id: 12, path: PATH.groupsUpdate, element: <GroupsCrud /> },


        { id: 13, path: PATH.teachers, element: <Teachers /> },
        { id: 14, path: PATH.teachersMore, element: <TeachersMore /> },
        { id: 15, path: PATH.teachersCreate, element: <TeachersCrud /> },
        { id: 16, path: PATH.teachersUpdate, element: <TeachersCrud /> },
        { id: 17, path: PATH.teachersMoreByGroupMore, element: <GroupsMore /> },
        { id: 18, path: PATH.teachersMoreByGroupCreate, element: <GroupsCrud /> },
        { id: 19, path: PATH.teachersMoreByGroupUpdate, element: <GroupsCrud /> },


        { id: 20, path: PATH.students, element: <Students /> },
        { id: 21, path: PATH.studentsMore, element: <StudentsMore /> },
        { id: 22, path: PATH.studentsCreate, element: <StudentsCrud /> },
        { id: 22, path: PATH.studentsUpdate, element: <StudentsCrud /> },
        { id: 23, path: PATH.studentsMoreByGroupsBy, element: <StudentsMore /> },
        { id: 24, path: PATH.studentsCreateByGroupsMore, element: <StudentsCrud /> },
        { id: 25, path: PATH.studentsUpdateByGroupsBy, element: <StudentsCrud /> },
        { id: 26, path: PATH.studentsCreateByGroupsByTeachersMore, element: <StudentsCrud /> },



        { id: 27, path: PATH.rooms, element: <Rooms /> },
        { id: 28, path: PATH.roomsMore, element: <RoomsMore /> },
        { id: 29, path: PATH.roomsCreate, element: <RoomsCrud /> },
        { id: 30, path: PATH.roomsUpdate, element: <RoomsCrud /> },
        { id: 31, path: PATH.notFound, element: <NotFound /> },
    ])
    useEffect(() => {
        if (userInfo.role == "super_admin") {
            const data = { id: routeList[routeList.length - 1].id + 1, path: PATH.users, element: <Users /> }
            setRouteList(last => [...last, data])
        }
    }, [userInfo])
    return (
        <div className="flex">
            <Sitebar />
            <div className={`${collapse ? "w-full" : "w-[80%]"} duration-300 h-screen overflow-y-auto`}>
                <Header />
                <Routes>{routeList.map(item => <Route key={item.id} path={item.path} element={item.element} />)}</Routes>
            </div>
        </div>
    )
}

export default DashboardRoute