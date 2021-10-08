
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button,Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import { TreeSelect } from 'antd';



const { TreeNode } = TreeSelect;

function ModalCreateEdit({onClose,show,data,onConfirm,isEdit}) {
  const [employee,setEmployee] = useState({
      name:'',
      contact:'',
      department_id:'',
      id:'',
      error_list:[],
      error_summary:''
  });
 
  const handleTree = (val) => {
    setEmployee({
      ...employee,
      department_id:val
    });
  };

  const [btnSubmitPending, setbtnSubmitPending] = useState(false)

  useEffect(() => {
    if (show) {
      if(isEdit){
        setEmployee({...employee,
          name:data.name,
          contact:data.contact,
          department_id:data.department_id,
          id:data.id,
        })
      }
    }
    else{
      setEmployee({
        name:'',
        contact:'',
        department_id:'',
        id:'',
        error_list:[],
        error_summary:''
      });
    }
  }, [show])

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
    
  const [units, setUnits] = useState([]);
  let tree=[];
  function getNodeById(id, node){
    let reduce = [].reduce;
    function runner(result, node){
        if(result || !node) return result;
        return node.id == id && node || //is this the proper node?
            runner(null, node.children) || //process this nodes children
            reduce.call(Object(node), runner, result);  //maybe this is some ArrayLike Structure
    }
    return runner(null, node);
  } 


  const renderChildren =(i)=> {
      if(i.children){
        return (
          <TreeNode key={i.id} value={i.id} title={i.name} selectable={i.selectable}>
              {i.children.map(renderChildren)}
          </TreeNode>
        );
      }
      else{
        return  (<TreeNode key={i.id} value={i.id} title={i.name} selectable={i.selectable} />)
      }
  }
  
  useEffect(() => {
    if(show){
      axios.get('/api/v1/unit')
      .then(function (response) {
          // handle success
          //setUnits(response.data.data);
          let tempUnits=response.data.data;
          tempUnits.map(u=>{
              let item = {}
              item["name"] = u.name;
              item["id"] = u.id;
              item["ascendants"] = u.ascendants;
              item["selectable"]=u.selectable==1?true:false;
              item["children"] = [];
                    
              tree.push(item);
          });
          
          tree.map(u=>{
            if(u.ascendants){
              let parentId= u.ascendants.substr(u.ascendants.length - 2,1);
              let parent= getNodeById(parseInt(parentId),tree);
              parent.children.push(u)
            }
          });

          tree = tree.filter(u=>{
            return !u.ascendants
          });

          setUnits(tree)
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      })
      .then(function () {
      });
    }
  }, [show]);

    return (
      <>
        <Modal show={show} onHide={onClose} animation={true} 
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
                    <input type="text" name="name" onChange={handleInput} value={employee.name} className="form-control form-control-sm" id="exampleFormControlInput1" />
                    <span>{employee.error_list.name}</span>
                
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Contact</label>
                    <input type="text" name="contact" onChange={handleInput} value={employee.contact} className="form-control form-control-sm" id="" />
                    <span>{employee.error_list.contact}</span>
                
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Department</label>
                    {units&&
                      <TreeSelect
                      style={{ width: '100%' }}
                      value={employee.department_id}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select department"
                      onChange={handleTree}
                    >
                        {
                          units.map(renderChildren)
                        }
                      </TreeSelect>
                      
                      }
                    <span>{employee.error_list.department_id}</span>
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
                <Button variant="secondary" onClick={onClose}>
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