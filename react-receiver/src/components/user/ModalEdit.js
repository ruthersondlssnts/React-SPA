
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button,Modal } from 'react-bootstrap';
import swal from 'sweetalert';


function ModalEdit({onClose,show,onConfirm,data}) {
 
  const [btnSubmitPending, setbtnSubmitPending] = useState(false)

  const [userInput,setUser] = useState({
    username:'',
    email:'',
    roles:["1"],
    error_list:[],
    error_summary:''
  });

  useEffect(() => {
    setUser({
      username:data.username,
      email:data.email,
      roles:data.roles,
      error_list:[],
      error_summary:''
    });

    setCheckbox(data.roles);
    
  }, [data])

 function setCheckbox() {
    var x = document.getElementsByClassName("checkbox");
    for(let i=0; i<x.length; i++) {
      data.roles.forEach(role => {
        if (x[i].value == role ) {
          x[i].checked = true;
        }
      });
    }  
 }
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
        ...userInput,
        [name]:value}
    );
  }

  const handleCheckbox = e => {
      let newRoles = [...userInput.roles, e.target.value];
      if (userInput.roles.includes(e.target.value)) {
          newRoles = newRoles.filter(role => role !== e.target.value);
      }
      setUser({
          ...userInput,
          roles: newRoles
      });
  };



  const handleSubmit = e => {
    e.preventDefault();
    setbtnSubmitPending(true);
    const request = {
        name: userInput.username,
        email:userInput.email,
        roles: userInput.roles,
    }

    // axios.get('/sanctum/csrf-cookie',data).then(res =>{
      axios.patch(`/api/v1/user/${data.id}/update`,request).then(res =>{
        setUser({
          username:'',
          email:'',
          roles:["1"],
          error_list:[],
          error_summary:''
        });
        swal("Success","User Edited Succesfully");
        onConfirm();
      }).catch(error=>{
        if (error.response) {
            setUser({
            ...userInput,
            error_list:error.response.data.errors??[],
            error_summary:error.response.data.message
          });

        }
    }).then(function () {
      setbtnSubmitPending(false);
      
    });
    // });

  };

  const handleClose = () =>{
    setUser({
      username:'',
      email:'',
      roles:["1"],
      error_list:[],
      error_summary:''
    });
    onClose();
    setbtnSubmitPending(false);
  }


    return (
      <>
        <Modal show={show} onHide={handleClose} animation={true}  backdrop="static"
          keyboard={false}>
          {
              btnSubmitPending?
              <Modal.Header >
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
          :
              <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
          }
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
                <label htmlFor="" className="form-label">Username</label>
                <input type="text" name="username" onChange={handleInput} value={userInput.username} className="form-control" id="exampleFormControlInput1" />
                <span  className="text-danger">{userInput.error_list.name}</span>

              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">Email</label>
                <input type="text" name="email" onChange={handleInput} value={userInput.email} className="form-control" id="exampleFormControlInput1" />
                <span  className="text-danger">{userInput.error_list.email}</span>
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">Roles</label>
                <div className="form-check">

                <div className="form-check">
                    <input className="form-check-input checkbox"  id="chckUser" name="chckUser" type="checkbox" value="1" id="" checked disabled/>
                    <label className="form-check-label" htmlFor="chckUser">
                      user
                    </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input checkbox" id="chckManager" name="chckManager" type="checkbox" value="2" id="" onChange={handleCheckbox}/>
                  <label className="form-check-label" htmlFor="chckManager">
                    manager
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input checkbox" id="chckAdmin" name="chckAdmin" type="checkbox" value="3" id="" onChange={handleCheckbox}/>
                  <label className="form-check-label" htmlFor="chckAdmin">
                    admin
                  </label>
                </div>
                <span  className="text-danger">{userInput.error_list.roles}</span><br/>
              
              </div>
              </div>
                      

              </form>
          </Modal.Body>
          <Modal.Footer>
          {
              btnSubmitPending?
              <button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm mx-1" role="status" ariaHidden="true"></span>
                  Loading...
              </button>:
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" form="create-form" type="submit">
                  Save
                </Button>
              </>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ModalEdit;