import { Button } from 'react-bootstrap';

function Unit(props) {
   
    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
            <td><Button variant="link" onClick={()=> {props.data.ascendants?props.onGettingBranches(props.data.ascendants+""+props.data.id):props.onGettingBranches(props.data.id)}} >Branches</Button></td>
            <td>
                <Button variant="light"  >Edit</Button> 
                <Button variant="danger" >Delete</Button> 
            </td>
        </tr>
           
    );
}

export default Unit;