
import axios from 'axios';
import {  useEffect, useState } from 'react';
import { Button,Modal } from 'react-bootstrap';
import swal from 'sweetalert';


function ModalCreate({onClose,show,onConfirm}) {
  const [userInput,setUser] = useState({
    username:'',
    email:'',
    password:'',
    password_confirmation:'',
    roles:["1"],
    employee_id:'',
    error_list:[],
    error_summary:''
  });
  const [btnSubmitPending, setbtnSubmitPending] = useState(false)
  const [employees, setEmployees] = useState([]);
  const [employeeInput, setEmployeeInput] = useState('');
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    if(show){
      axios.get('/api/v1/employee/getAllNotUser')
      .then(function (response) {
          setEmployees(response.data);
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      })
    }
  
  }, [show])

  const handleAutoCompleteInput= (text) => {
    let matches = []
    if (text.length>0) {
      matches=employees.filter(emp=>{
        const regex = new RegExp(`${text}`,"gi");
        return emp.name.match(regex)
      })
    }
    setSuggestions(matches);
    setEmployeeInput(text)
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
        ...userInput,
        [name]:value}
    );
  }
  
  const handleSuggest=(emp)=>{
    setEmployeeInput(emp.name);
    setUser({
      ...userInput,
      employee_id:emp.id,
    });
    console.log(emp);
    setSuggestions([]);
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
    const data = {
        name: userInput.username,
        email:userInput.email,
        password:userInput.password,
        roles: userInput.roles,
        employee_id: userInput.employee_id,
        password_confirmation: userInput.password_confirmation
    }
    console.log(data)
    // axios.get('/sanctum/csrf-cookie',data).then(res =>{
      axios.post('/api/v1/register',data).then(res =>{
        setUser({
          username:'',
          email:'',
          password:'',
          password_confirmation:'',
          roles:["1"],
          employee_id:'',
          error_list:[],
          error_summary:''
        });
        setEmployeeInput('');
        setEmployees([]);
        setSuggestions([])
        swal("Success","User Created Succesfully");
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
      password:'',
      password_confirmation:'',
      roles:["1"],
      employee_id:'',
      error_list:[],
      error_summary:''
    });
    setEmployeeInput('');
    setSuggestions([]);
    setEmployees([]);
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
                <Modal.Title>Create User</Modal.Title>
              </Modal.Header>
          :
              <Modal.Header closeButton>
                   <Modal.Title>Create User</Modal.Title>
              </Modal.Header>
          }
        
          <Modal.Body>
              <form id="create-form" onSubmit={handleSubmit} style={{position:"relative"}}>
              <div className="form-group">
                <label htmlFor="" className="form-label">Employee</label>
                <input autoComplete="off" type="text" name="employee_id" onChange={e=> handleAutoCompleteInput(e.target.value)} value={employeeInput} className="form-control" id="exampleFormControlInput1" 
                  onBlur={()=>{
                    setTimeout(()=>{
                      // if (suggestions[0]) {
                      //   setEmployeeInput(suggestions[0].name);
                      //   setUser({
                      //     ...userInput,
                      //     employee_id:suggestions[0].id,
                      //   });
                      // }
                      //setSuggestions([])
                    },100);
                }}
                />
                <div className="suggestion-container col-12">
                  <div >{suggestions && suggestions.map((suggestion,i)=>
                    <div onClick={()=>handleSuggest({name:suggestion.name,id:suggestion.id})} 
                      className="suggestion p-1 justify-content-md-center" key={i}>{suggestion.name}</div>
                  )}</div>
                </div>
                {/* <input type="text" name="employee_id" onChange={handleInput} value={userInput.employee_id} className="form-control" id="exampleFormControlInput1" />*/}
                <span className="text-danger">{userInput.error_list.employee_id}</span> 
              </div>
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
                  <label htmlFor="" className="form-label">Password</label>
                  <input type="text" name="password" onChange={handleInput} value={userInput.password} className="form-control" id="exampleFormControlInput1" />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">Confirm Password</label>
                <input type="text" name="password_confirmation" onChange={handleInput} value={userInput.password_confirmation} className="form-control" id="exampleFormControlInput1" />
                <span  className="text-danger">{userInput.error_list.password_confirmation}</span>
                <span  className="text-danger">{userInput.error_list.password}</span>
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">Roles</label>
                <div className="form-check">

                <div className="form-check">
                    <input className="form-check-input "  id="chckUser" name="chckUser" type="checkbox" value="1" id="" checked disabled/>
                    <label className="form-check-label" htmlFor="chckUser">
                      user
                    </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input " id="chckManager" name="chckManager" type="checkbox" value="2" id="" onChange={handleCheckbox}/>
                  <label className="form-check-label" htmlFor="chckManager">
                    manager
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input " id="chckAdmin" name="chckAdmin" type="checkbox" value="3" id="" onChange={handleCheckbox}/>
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

export default ModalCreate;