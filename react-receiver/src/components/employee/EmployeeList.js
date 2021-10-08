import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { RolesContext } from '../../layout/MasterLayout';
import Employee from './Employee';
import ModalCreateEdit from './ModalCreateEdit';
import ModalDelete from './ModalDelete';
import Spinner from '../Spinner';




function EmployeeList() {
    let context=useContext(RolesContext);

    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showCreateEditModal, setCreateEditModal] = useState(false);
    const [isEdit, setIfEdit] = useState(false);
    const [employee, setEmployee] = useState({
        id:'',
        name:'',
        contact:'',
        department_id: ''
    });

    const [spinner, setSpinner] = useState(true)

    const [employees,setEmployees]=useState([]);


    //Delete
    const handleDeleteModalClose = () => {
        setDeleteModal(false);
        setEmployee({
            id:'',
            name:'',
            contact:'',
            department_id: ''
        });
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
        setEmployee({
            id:'',
            name:'',
            contact:'',
            department_id: ''
        });
    }

    //Create
    const handleCreateEditClose = () => {
        setCreateEditModal(false);
    }

    const handleCreateEditShow = (unit) => {
        unit.id?setIfEdit(true):setIfEdit(false)
        setEmployee(unit)
        setCreateEditModal(true);
    }
    const handleCreateEditConfirm = (unit) => {
        setCreateEditModal(false);
        getEmployees();
    }


    function getEmployees() {
        setSpinner(true);
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
            setSpinner(false);
        });
    }

    useEffect(()=>{
        getEmployees();
    },[]);
    
    let admin = context.toLowerCase().includes("admin");
    let manager = context.toLowerCase().includes("manager");
    let isRender=false;
    if ((admin && manager) || manager ) {
        isRender = true;
    }

    let buttonCreate;

    if(isRender&&spinner){
        buttonCreate =  <button className="btn btn-success" type="button" disabled>
        <span className="spinner-border spinner-border-sm mx-1" role="status" ariaHidden="true"></span>
        Loading...
        </button>;
    }
    else if(isRender&&(!spinner)){
        buttonCreate = <Button variant="success" onClick={handleCreateEditShow} >Create</Button>;
    }

    

    return (
        <section>
            <h1 className="mt-4">Employees</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Employees</li>
            </ol>
            {buttonCreate}

            {spinner?<Spinner></Spinner>:<>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Department</th>
                    {isRender &&<th scope="col">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(emp=>
                            <Employee key={emp.id}  data={emp} isRender={isRender}
                                onModalDeleteShow={handleDeleteModalShow}
                                onModalEditShow={handleCreateEditShow}
                            />)
                    }
                </tbody>
                </table>
                {
                    isRender&&
                    <>
                        <ModalDelete show={showDeleteModal} data={employee} onClose={handleDeleteModalClose} onConfirm={handleDeleteConfirm} ></ModalDelete>
                        <ModalCreateEdit show={showCreateEditModal} data={employee} isEdit={isEdit}  onClose={handleCreateEditClose} onConfirm={handleCreateEditConfirm} ></ModalCreateEdit>
                    </>
                }
            
            </>}

          
        </section>
    );
}

export default EmployeeList;