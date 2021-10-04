
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button,Modal } from 'react-bootstrap';
import swal from 'sweetalert';

function ModalChangePassword({onClose,show,onConfirm,data}) {
   
  const [userInput,setUser] = useState({
    password:'',
    password_confirmation:'',
    error_list:[],
    error_summary:''
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
        ...userInput,
        [name]:value}
    );
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    const request = {
        password: userInput.password,
        password_confirmation:userInput.password_confirmation,
    }

    // axios.get('/sanctum/csrf-cookie',data).then(res =>{
      axios.patch(`/api/v1/user/${data.id}/adminChangePassword`,request).then(res =>{
        setUser({
            password:'',
            password_confirmation:'',
            error_list:[],
            error_summary:''
        });
        swal("Success",res.data.data.message);
        onConfirm();
      }).catch(error=>{
        if (error.response) {
            setUser({
            ...userInput,
            error_list:error.response.data.errors??[],
            error_summary:error.response.data.message
          });

        }
    });
    // });

  };

  const handleClose = () =>{
    setUser({
        password:'',
        password_confirmation:'',
        error_list:[],
        error_summary:''
    });
    onClose();
  }


    return (
        <>
        <Modal show={show} onHide={handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <dl class="row">
                <dt class="col-sm-3">Name</dt>
                <dd class="col-sm-9">{data.name}</dd>

                <dt class="col-sm-3">Username</dt>
                <dd class="col-sm-9">{data.username}</dd>

                <dt class="col-sm-3">Email</dt>
                <dd class="col-sm-9">
                   {data.email}
                </dd>

            </dl>
              <form id="create-form" onSubmit={handleSubmit}>
              {/* <div class="form-group">
                <label htmlFor="" className="form-label">Employee</label>
                <input type="text" name="employee_id" onChange={handleInput} value={userInput.employee_id} className="form-control" id="exampleFormControlInput1" />
                <span className="text-danger">{userInput.error_list.employee_id}</span>
              </div> */}
               <div className="form-group">
                  <label htmlFor="" className="form-label">Password</label>
                  <input type="text" name="password" onChange={handleInput} value={userInput.password} className="form-control" id="exampleFormControlInput1" />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">Confirm Password</label>
                <input type="text" name="password_confirmation" onChange={handleInput} value={userInput.password_confirmation} className="form-control" id="exampleFormControlInput1" />
                <span  className="text-danger">{userInput.error_list.password_confirmation}</span>
                <span  className="text-danger">{userInput.error_list.password}</span>
              </div>
              </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" form="create-form" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>   
    );
}

export default ModalChangePassword;