
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button,Modal } from 'react-bootstrap';
import swal from 'sweetalert';

function ModalCreateEdit({onClose,show,data,initialState,onConfirm,isEdit}) {
  const [employee,setEmployee] = useState({
      name:'',
      contact:'',
      department_id:'',
      id:'',
      error_list:[],
      error_summary:''
  });
 
  const [btnSubmitPending, setbtnSubmitPending] = useState(false)

  useEffect(() => {
    if(isEdit){
      setEmployee({...employee,
        name:data.name,
        contact:data.contact,
        department_id:data.department_id,
        id:data.id,
      })
    }
    
  }, [data])

  const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setEmployee({
          ...employee,
          [name]:value}
      );
  }
    
  const CreateEmployee =() =>{
    const data = {
      name: employee.name,
      contact:employee.contact,
      department_id:employee.department_id
    }

    axios.post('/api/v1/employee/',data).then(res =>{
      setEmployee({...initialState,
          error_list:[],
          error_summary:''
      });
      swal("Success","Created Succesfully");
      onConfirm();
    }).catch(error=>{
        if (error.response) {
          setEmployee({
            ...employee,
            error_list:error.response.data.errors??[],
            error_summary:error.response.data.message
          });
            
        }
    }).then(function () {
      setbtnSubmitPending(false);
    });
  }

  const EditEmployee =() =>{
    const data = {
      name: employee.name,
      contact:employee.contact,
      department_id:employee.department_id,
      id:employee.id
    }

    axios.put('/api/v1/employee/'+data.id,data).then(res =>{
      setEmployee({...initialState,
          error_list:[],
          error_summary:''
      });
      onConfirm();
      swal("Success","Edited Succesfully");
    }).catch(error=>{
        if (error.response) {
          setEmployee({
            ...employee,
            error_list:error.response.data.errors??[],
            error_summary:error.response.data.message
          });
            
        }
    }).then(function () {
      setbtnSubmitPending(false);
    });
 }

  const handleSubmit = e => {
    e.preventDefault();
    setbtnSubmitPending(true);
    if(isEdit)
      EditEmployee();
    else
      CreateEmployee();
  };
    
  function handleClose() {
    setEmployee({
      name:'',
      contact:'',
      department_id:'',
      id:'',
      error_list:[],
      error_summary:''
    })
    onClose();
  }
    return (
      <>
        <Modal show={show} onHide={handleClose} animation={true} 
          backdrop="static"
          keyboard={false}>

        {
              btnSubmitPending?
              <Modal.Header >
              <Modal.Title>{isEdit?"Edit":"Create"} Employee</Modal.Title>
            </Modal.Header>
          :
            <Modal.Header closeButton>
              <Modal.Title>{isEdit?"Edit":"Create"} Employee</Modal.Title>
            </Modal.Header>
          }
          
          <Modal.Body>
              <form id="create-form" onSubmit={handleSubmit}>
              <span>{employee.error_summary}</span>

                <input type="hidden" className="form-control" id="exampleFormControlInput1" value={employee.id} />
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Name</label>
                    <input type="text" name="name" onChange={handleInput} value={employee.name} className="form-control" id="exampleFormControlInput1" />
                    <span>{employee.error_list.name}</span>
                
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Contact</label>
                    <input type="text" name="contact" onChange={handleInput} value={employee.contact} className="form-control" id="" />
                    <span>{employee.error_list.contact}</span>
                
                </div>
                <select className="form-select" aria-label="Default select example" onChange={handleInput} value={employee.department_id} name="department_id">
                    <option value="">Select Department</option>
                    <option value="5">IT</option>
                    <option value="6">HR</option>
                    <option value="7">Marketing</option>
                </select>
                <span>{employee.error_list.department_id}</span>

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
  
export default ModalCreateEdit;