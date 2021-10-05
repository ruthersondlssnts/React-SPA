import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Unit from './Unit';
import ModalCreateEdit from './ModalCreateEdit';
import ModalDelete from './ModalDelete';
import swal from 'sweetalert';
import { RolesContext } from '../../layout/MasterLayout';
import Spinner from '../Spinner';

function UnitList() {
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showCreateEditModal, setCreateEditModal] = useState(false);
    const [isEdit, setIfEdit] = useState(false);
    const [spinner, setSpinner] = useState(true)

    const [unit, setUnit] = useState({
        id:'',
        name:'',
        ascendants: ''
    });

    const [units,setUnits]=useState([]);
    const [ancestors,setAncestors]=useState([]);

    const getUnitBranches =(unitId,isBack)=> {
        if (unitId==null) {
            unitId=0;
        }
    
        axios.get('/api/v1/unit/getBranches/'+unitId)
        .then(function (response) {
            console.log(response);
            let units = response.data.data.units;
            let ascendants = response.data.data.ascendants;
            if (!isBack) {
                console.warn(isBack)
                setAncestors([...ancestors,ascendants]);
            }
            setUnits(units);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            setSpinner(false);
        });
    }

    const handleBack =()=> {
        setSpinner(true);
        getUnitBranches(ancestors[ancestors.length-2]?ancestors[ancestors.length-2].slice(0, -1):ancestors[ancestors.length-2],true)
        setAncestors(ancestors.filter(item => item !== ancestors[ancestors.length-1]));
    }

    useEffect(()=>{
        getUnitBranches();
    },[]);


      //Delete
     const handleDeleteModalClose = () => {
        setDeleteModal(false);
        setUnit({
            id:'',
            name:'',
            ascendants: ''
        });
    }

    const handleDeleteModalShow = (u) => {
        setUnit(u);
        setDeleteModal(true);
    }
    const handleDeleteConfirm = (u) => {
        axios.delete('/api/v1/unit/'+unit.id)
        .then(function (response) {
            if(unit.ascendants){
                getUnitBranches(unit.ascendants.slice(0, -1),true);
            }
            else{
                getUnitBranches(null,true);
            }
            swal("Success","Deleted Succesfully");
        })
        setDeleteModal(false);
        setUnit({
            id:'',
            name:'',
            ascendants: ''
        });
    }


//Create Edit
    const handleCreateEditClose = () => {
        setCreateEditModal(false);
        setUnit({
            id:'',
            name:'',
            ascendants: ''
        });
    }

    const handleCreateEditShow = (u) => {
        u.id?setIfEdit(true):setIfEdit(false)
        setUnit(u)
        setCreateEditModal(true);
    }
    const handleCreateEditConfirm = (u) => {
        setCreateEditModal(false);
        getUnitBranches(u,true);
    }


    let context=useContext(RolesContext);
    let admin = context.toLowerCase().includes("admin");
    let manager = context.toLowerCase().includes("manager");
    let isRender=false;
    if ((admin && manager) || manager ) {
        isRender = true;
    }

    
    if(spinner){
        return <Spinner page="Units"></Spinner>
    }

    return (
        <section>
            <h1 className="mt-4">Units</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Units</li>
            </ol>
           {isRender&&<Button variant="success"  className="me-1" onClick={handleCreateEditShow}>Create</Button>} 
            {ancestors.length>1?<Button variant="light" onClick={handleBack}>Go Back</Button>:''}

            <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Employees</th>
                <th scope="col">Branches</th>
                {isRender&&<th scope="col">Action</th>}
                </tr>
            </thead>
            <tbody>
                {
                    units.map(unit=> <Unit key={unit.id} isRender={isRender}  data={unit} onGettingBranches={getUnitBranches} onModalEditShow={handleCreateEditShow} onModalDeleteShow={handleDeleteModalShow} />)
                }
            </tbody>
            </table>
            {
                isRender&&
                <>
                <ModalDelete show={showDeleteModal} data={unit} onClose={handleDeleteModalClose} onConfirm={handleDeleteConfirm} ></ModalDelete> 
                <ModalCreateEdit show={showCreateEditModal} ascendants={ancestors[ancestors.length-1]??null} data={unit} isEdit={isEdit} onClose={handleCreateEditClose} onConfirm={handleCreateEditConfirm} ></ModalCreateEdit>
                </>
            }
            
       
        </section>
    );
}

export default UnitList;