import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import User from './User';
import ModalCreate from './ModalCreate';
import ModalEdit from './ModalEdit';
import ModalChangePassword from './ModalChangePassword';
import ModalDelete from './ModalDelete';
import swal from 'sweetalert';
import { RolesContext } from '../../layout/MasterLayout';
import Spinner from '../Spinner';

function UserList() {
    
    const [spinner, setSpinner] = useState(true)
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showCreateModal, setCreateModal] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const [showChangePassModal, setChangePassModal] = useState(false);
    const [user, setUser] = useState({
        id:'',
        username:'',
        email: '',
        employee_id:'',
        name:'',
        roles:[]
    });

    const [users,setUsers]=useState([]);
    useEffect(()=>{
        getUsers();
    },[]);


    function getUsers() {
        axios.get('/api/v1/user')
        .then(function (response) {
            console.log(response);
            setUsers(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            setSpinner(false);
        });
    }
    //Create
    const handleCreateShow = () => {
        setCreateModal(true);
    }
    const handleCreateClose = () => {
        setCreateModal(false);
    }
    const handleCreateConfirm = () => {
        setCreateModal(false);
        getUsers();
    }

    //Edit
    const handleEditShow = (user) => {
        setUser({
            id:user.id,
            username:user.name,
            email: user.email,
            employee_id: user.employee.id,
            roles: user.roles.map(r => r.id.toString()),
            name:user.employee.name
        });
        setEditModal(true);
    }
    const handleEditClose = () => {
        setUser({
            id:'',
            username:'',
            email: '',
            employee_id:'',
            name:'',
            roles:[]
        });
        setEditModal(false);

    }
    const handleEditConfirm = () => {
        setEditModal(false);
        getUsers();
    }

    //Change Password
    const handleChangePassShow = (u) => {
        setUser({
            ...user,
            id:u.id,
            username:u.username,
            email: u.email,
            name:u.name
        });
        setChangePassModal(true);
    }
    const handleChangePassClose = () => {
        setUser({
            id:'',
            username:'',
            email: '',
            employee_id:'',
            roles:[],
            name:'',

        });
        setChangePassModal(false);
    }
    const handleChangePassConfirm = () => {
        setChangePassModal(false);
    }

     //Delete
     const handleDeleteClose = () => {
        setDeleteModal(false);
    }

    const handleDeleteShow = (u) => {
        setUser({
            ...user,
            id:u.id,
            username:u.name,
        });
        setDeleteModal(true);
    }
    const handleDeleteConfirm = (e) => {
        axios.delete('/api/v1/user/'+user.id)
        .then(function (response) {
            setDeleteModal(false);
            setUser({
                ...user,
                id:'',
                username:'',
            });
            swal("Success","User Deleted Succesfully");
            getUsers();
        })
        
    }

    if(spinner){
		return <Spinner page="Users"></Spinner>
	}
    return (
        <section>
            <h1 className="mt-4">Users</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Users</li>
            </ol>
            <Button variant="success"  className="me-1" onClick={handleCreateShow} >Create</Button>

            <table className="table">
            <thead>
                <tr>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Roles</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user=> <User key={user.id}  data={user} onModalEditShow={handleEditShow} onModalChangePassShow={handleChangePassShow} onModalDeleteShow={handleDeleteShow}/>)
                }
            </tbody>
            </table>
            <ModalDelete username={user.username}  show={showDeleteModal} onClose={handleDeleteClose} onConfirm={handleDeleteConfirm}></ModalDelete>  
            <ModalCreate show={showCreateModal} onClose={handleCreateClose} onConfirm={handleCreateConfirm}></ModalCreate> 
            <ModalEdit show={showEditModal} data={user} onClose={handleEditClose} onConfirm={handleEditConfirm}></ModalEdit> 
            <ModalChangePassword show={showChangePassModal} data={user} onClose={handleChangePassClose} onConfirm={handleChangePassConfirm}></ModalChangePassword> 
       
        </section>
    );
}

export default UserList;