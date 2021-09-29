import {useState} from 'react';
import ModalDelete from '../components/ModalDelete';
import { Button } from 'react-bootstrap';

function Employee(props) {
   
    function editHandler() {
        console.log(props.name);
    }

    return (
        <div className="card">
            {props.name}
            {props.contact}
            {props.department.name}
            
            <Button variant="default" onClick={editHandler}>Edit</Button>
            {/* {modalDeleteIsOpen && <ModalDelete onClose={deleteCloseHandler} show={modalDeleteIsOpen}/>  } 
            <ModalDelete onClose={deleteCloseHandler} show={modalDeleteIsOpen}/> */}

            <Button variant="danger" onClick={()=>props.onModalShow(props.name)}>Delete</Button>
        </div>
    );
}

export default Employee;