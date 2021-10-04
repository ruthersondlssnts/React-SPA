import Dashboard from "../components/Dashboard";
import EmployeeList from "../components/employee/EmployeeList";
import UnitList from "../components/unit/UnitList";
import UserList from "../components/user/UserList";

const routes =[
    { path:'/user', exact:true,  component: UserList},
    { path:'/dashboard', exact:true,  component: Dashboard},
    { path:'/employee', exact:true, component: EmployeeList},
    { path:'/unit', exact:true,  component: UnitList},
];

export default routes;