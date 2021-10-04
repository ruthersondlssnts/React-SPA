import { Button } from 'react-bootstrap';

function User(props) {
   
    return (
        <tr>
            <td>{props.data.email}</td>
            <td>{props.data.name}</td>
            <td>{props.data.roles.map(role=> role.name).join(',')}</td>
           
            <td>
            <Button variant="secondary" className="me-1"  onClick={()=>props.onModalEditShow(props.data)}  >edit</Button> 
            <Button variant="info" className="me-1 text-white" onClick={()=>props.onModalChangePassShow({email:props.data.email, username: props.data.name, id:props.data.id, name:props.data.employee.name })} >change password</Button> 
            <Button variant="danger"  onClick={()=>props.onModalDeleteShow({name :props.data.name, id: props.data.id})}>delete</Button> 
            </td>
            {/* {modalDeleteIsOpen && <ModalDelete onClose={deleteCloseHandler} show={modalDeleteIsOpen}/>  } 
            <ModalDelete onClose={deleteCloseHandler} show={modalDeleteIsOpen}/> */}
        </tr>
           
    );
}

export default User;