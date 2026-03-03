const PATH = {
    home: "/",
    login: "/login",
    stacks: "/stacks",
    stacksMore: "/stacks/:stackId",
    stacksMoreByGroupMore: "/stacks/:stackId/:groupsId",
    stacksMoreByGroupUpdate: "/stacks/:stackId/:groupsId/update",
    stacksCreate: "/stacks/create",
    stacksUpdate: "/stacks/:stackId/update",
    stacksGroupCreate: "/stacks/:stackId/create",


    groups: "/groups",
    groupsMore: "/groups/:groupsId",
    groupsUpdate: "/groups/:groupsId/update",
    groupsCreate: "/groups/create",


    rooms: "/rooms",
    roomsMore: "/rooms/:roomsId",
    roomsUpdate: "/rooms/:roomsId/update",
    roomsCreate: "/rooms/create",


    teachers: "/teachers",
    teachersMore: "/teachers/:teachersId",
    teachersCreate: "/teachers/create",
    teachersUpdate: "/teachers/:teachersId/update",
    teachersMoreByGroupMore: "/teachers/:teachersId/:groupsId",
    teachersMoreByGroupUpdate: "/teachers/:teachersId/:groupsId/update",
    teachersMoreByGroupCreate: "/teachers/:teachersId/create",


    students: "/students",
    studentsMore: "/students/:studentsId",
    studentsUpdate: "/students/:studentsId/update",
    studentsCreate: "/students/create",
    studentsMoreByGroupsBy: "/groups/:groupsId/:studentsId",
    studentsCreateByGroupsMore: "/groups/:groupsId/create",
    studentsUpdateByGroupsBy: "/groups/:groupsId/:studentsId/update",
    studentsCreateByGroupsByTeachersMore: "/teachers/teachersId/groupsId/create",



    users: "/users",
    usersMore: "/users/:id",
    usersUpdate: "/users/:id/update",
    usersCreate: "/users/create",


    enrollment: "enrollment/:enrollmentId",


    notFound: "*"
}

export default PATH