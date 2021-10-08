
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button,Form,Modal } from 'react-bootstrap';
import swal from 'sweetalert';

function ModalCreateEdit({onClose,show,data,ascendants,onConfirm,isEdit}) {
  const [unit,setUnit] = useState({
      name:'',
      id:'',
      ascendants:'',
      selectable:false,
      error_list:[],
      error_summary:''
  });
  const [btnSubmitPending, setbtnSubmitPending] = useState(false)


  useEffect(() => {
    if(show){
    if(isEdit){
        setUnit({...unit,
        name:data.name,
        selectable:data.selectable==1?true:false,
        id:data.id,
        ascendants:ascendants??'',
      })
      setCheckbox(data.selectable==1?true:false)
    }
  }
  else{
    setUnit({
      name:'',
      id:'',
      ascendants:'',
      selectable:false,
      error_list:[],
      error_summary:''
    });
  }
    
  }, [show])

  const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setUnit({
          ...unit,
          [name]:value}
      );
  }
    
  const CreateUnit =() =>{
    const data = {
      name: unit.name,
      ascendants: ascendants,
      selectable: unit.selectable
    }

    axios.post('/api/v1/unit/',data).then(res =>{
     
      swal("Success","Created Succesfully");
      onConfirm(data.ascendants.slice(0, -1));

    }).catch(error=>{
        if (error.response) {
            setUnit({
            ...unit,
            error_list:error.response.data.errors??[],
            error_summary:error.response.data.message
          });
            
        }
    }).then(function () {
      setbtnSubmitPending(false);
    });;
  }

  const EditUnit =() =>{
    const data = {
      name: unit.name,
      ascendants: ascendants,
      selectable:unit.selectable,
      id:unit.id
    }

    axios.put('/api/v1/unit/'+data.id,data).then(res =>{
        swal("Success","Edited Succesfully");
        onConfirm(data.ascendants.slice(0, -1));
    }).catch(error=>{
        if (error.response) {
            setUnit({
            ...unit,
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
      EditUnit();
    else
      CreateUnit();
  };
  const handleCheckbox = e => {
   console.log(e.target.value);

    setUnit({
      ...unit,
      selectable: unit.selectable?false:true
    });
  };
  function setCheckbox(selectable) {
    var x = document.getElementsByClassName("unitCheckBox");
    console.log(x);
    if(selectable){
      x[0].checked = true;
    }
 }
 

    return (
      <>
        <Modal show={show} onHide={onClose} animation={true}
         backdrop="static"
         keyboard={false}>

           {
              btnSubmitPending?
              <Modal.Header >
                <Modal.Title>{isEdit?"Edit":"Create"} Unit</Modal.Title>
              </Modal.Header>
          :
              <Modal.Header closeButton>
                  <Modal.Title>{isEdit?"Edit":"Create"} Unit</Modal.Title>
              </Modal.Header>
          }

            <Modal.Body>
              <form id="create-form" onSubmit={handleSubmit}>
              <span>{unit.error_summary}</span>

                <input type="hidden" className="form-control" id="exampleFormControlInput1" value={unit.id} />
                <input type="hidden" className="form-control" id="exampleFormControlInput1" value={ascendants} />
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Name</label>
                    <input type="text" name="name" onChange={handleInput} value={unit.name} className="form-control" id="exampleFormControlInput1" />
                    <span>{unit.error_list.name}</span>
                </div>
                <div className="form-check">
                    <input className="form-check-input unitCheckBox"  id="chckUser" name="chckUser" type="checkbox" value="" id="" onChange={handleCheckbox}   />
                    <label className="form-check-label" htmlFor="chckUser">
                      Selectable
                    </label>
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