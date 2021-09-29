import { Button } from 'react-bootstrap';

function Employee(props) {
   
    function editHandler() {
        // console.log(props.name);
    }
   
    return (
        <div className="card">
            {props.data.id}
            {props.data.name}
            {props.data.contact}
            {props.data.department}
            
            {/* <Button variant="default" onClick={editHandler}>Edit</Button> */}
            {/* {modalDeleteIsOpen && <ModalDelete onClose={deleteCloseHandler} show={modalDeleteIsOpen}/>  } 
            <ModalDelete onClose={deleteCloseHandler} show={modalDeleteIsOpen}/> */}

             <Button variant="danger" onClick={()=>props.onModalDeleteShow(props.data.name)}>Delete</Button> 
        </div>
    );
}

export default Employee;