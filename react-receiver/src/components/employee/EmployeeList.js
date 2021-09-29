import { useState } from 'react';
import Employee from './Employee';
import ModalDelete from './ModalDelete';

const DUMMY_DATA=[
    {
        id:'1',
        name:'Rutherson',
        contact:'0931545',
        department_id: '1'
    },
    {
        id:'2',
        name:'Angelo',
        contact:'0931545',
        department_id: '1'
    }
];


function EmployeeList() {
    const [show, setShow] = useState(false);
    const [employeeName, setEmployeeName] = useState("");

    const handleDeleteModalClose = () => setShow(false);

    const handleDeleteModalShow = (e) => {
        setEmployeeName(e);
        setShow(true);
    }
    const handleDeleteConfirm = (e) => {
       alert("Deleted");
       setShow(false);
       setEmployeeName("");
    }

    
    return (
        <section>
            <h1 className="mt-4">Employees</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Employees</li>
            </ol>
            
            {
                DUMMY_DATA.map((emp)=>{
                    return (<Employee key={emp.id}  data={emp} onModalDeleteShow={handleDeleteModalShow} />);
                })
                
            }

            <ModalDelete show={show} name={employeeName} onClose={handleDeleteModalClose} onConfirm={handleDeleteConfirm}></ModalDelete>
        </section>
    );
}

export default EmployeeList;