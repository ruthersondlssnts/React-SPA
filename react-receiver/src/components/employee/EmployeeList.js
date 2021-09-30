import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Employee from './Employee';
import ModalCreateEdit from './ModalCreateEdit';
import ModalDelete from './ModalDelete';

let initialState=[
    {
        id:'',
        name:'',
        contact:'',
        department_id: ''
    }
];


function EmployeeList() {
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showCreateEditModal, setCreateEditModal] = useState(false);
    const [isEdit, setIfEdit] = useState(false);

    const [employee, setEmployee] = useState({
        ...initialState
    });

    const [employees,setEmployees]=useState([]);


    //Delete
    const handleDeleteModalClose = () => {
        setDeleteModal(false);
        setEmployee(...initialState);
    }

    const handleDeleteModalShow = (e) => {
        setEmployee(e);
        setDeleteModal(true);
    }
    const handleDeleteConfirm = (e) => {
        axios.delete('/api/v1/employee/'+employee.id)
        .then(function (response) {
            getEmployees();
        })
        setDeleteModal(false);
        setEmployee(...initialState);
    }

    //Create
    const handleCreateEditClose = () => {
        setCreateEditModal(false);
        setEmployee(...initialState);
    }

    const handleCreateEditShow = (e) => {
        e.id?setIfEdit(true):setIfEdit(false)
        setEmployee(e)
        setCreateEditModal(true);
    }
    const handleCreateEditConfirm = (e) => {
        setCreateEditModal(false);
        getEmployees();
    }


    function getEmployees() {
        axios.get('/api/v1/employee')
        .then(function (response) {
            // handle success
            console.log(response);
            setEmployees(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    useEffect(()=>{
        getEmployees();
    },[]);
    
    return (
        <section>
            <h1 className="mt-4">Employees</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Employees</li>
            </ol>
            <Button variant="primary" onClick={handleCreateEditShow} >Create</Button>

            <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Department</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                     employees.map(emp=>
                         <Employee key={emp.id}  data={emp} 
                            onModalDeleteShow={handleDeleteModalShow}
                            onModalEditShow={handleCreateEditShow}
                        />)
                }
            </tbody>
            </table>

            <ModalDelete show={showDeleteModal} data={employee} onClose={handleDeleteModalClose} onConfirm={handleDeleteConfirm} ></ModalDelete>
            <ModalCreateEdit show={showCreateEditModal} data={employee} isEdit={isEdit} initialState={initialState} onClose={handleCreateEditClose} onConfirm={handleCreateEditConfirm} ></ModalCreateEdit>
        </section>
    );
}

export default EmployeeList;