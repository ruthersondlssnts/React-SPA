import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


function Unit(props) {
   const [totalEmployees, setTotalEmployees] = useState(0);

    
    useEffect(()=>{
        // axios.get('/api/v1/unit/getBranchEmployees/'+props.data.id)
        // .then(function (response) {
        //     setTotalEmployees(response.data.data.length);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })
        // .then(function () {
        // });
        // return () => {
        //     setTotalEmployees(0); 
        // };
    },[]);


    return (
        
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.total}</td>
            <td>{!props.data.selectable&&<Button variant="link" onClick={()=> {props.data.ascendants?props.onGettingBranches(props.data.ascendants+""+props.data.id):props.onGettingBranches(props.data.id)}} >Branches</Button>}</td>
            {props.isRender&&
                <td>
                    <Button variant="light" className="me-1" onClick={()=>props.onModalEditShow(props.data)}  >Edit</Button> 
                    <Button variant="danger" onClick={()=>props.onModalDeleteShow(props.data)} >Delete</Button> 
                </td>
            }
        </tr>
           
    );
}

export default Unit;