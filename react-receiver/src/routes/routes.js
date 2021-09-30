import EmployeeList from "../components/employee/EmployeeList";
import RoleList from "../components/role/RoleList";
import UnitList from "../components/unit/UnitList";
import ChangePassword from "../components/user/ChangePassword";
import EditAccount from "../components/user/EditAccount";
import ViewProfile from "../components/user/ViewProfile";

const routes =[
    { path:'/user/view-profile', exact:true,  component: ViewProfile},
    { path:'/user/edit-account', exact:true, component: EditAccount},
    { path:'/user/change-password', exact:true,  component: ChangePassword},
    { path:'/employee', exact:true, component: EmployeeList},
    { path:'/role', exact:true,  component: RoleList},
    { path:'/unit', exact:true,  component: UnitList},
];

export default routes;