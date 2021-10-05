import { Button } from 'react-bootstrap';

function Employee(props) {
   
    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
            <td>{props.data.contact}</td>
            <td>{props.data.department.name}</td>
            {props.isRender&&
            <td>
                <Button variant="light" className="me-1" onClick={()=>props.onModalEditShow(props.data)} >Edit</Button> 
                <Button variant="danger" onClick={()=>props.onModalDeleteShow(props.data)}>Delete</Button> 
            </td>
            }
           
            {/* {modalDeleteIsOpen && <ModalDelete onClose={deleteCloseHandler} show={modalDeleteIsOpen}/>  } 
            <ModalDelete onClose={deleteCloseHandler} show={modalDeleteIsOpen}/> */}
        </tr>
           
    );
}

export default Employee;