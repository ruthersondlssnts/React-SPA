import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Unit from './Unit';

function UnitList() {

    const [units,setUnits]=useState([]);

    const getUnitBranches =(unitId)=> {
        if (unitId==null) {
            unitId='';
        }
        axios.get('/api/v1/unit/getBranches/'+unitId)
        .then(function (response) {
            console.log(response);
            setUnits(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
    }

    useEffect(()=>{
        getUnitBranches();
    },[]);

    return (
        <section>
            <h1 className="mt-4">Units</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Units</li>
            </ol>
            <Button variant="primary"  >Create</Button>

            <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Branches</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    units.map(unit=> <Unit key={unit.id}  data={unit} onGettingBranches={getUnitBranches} />)
                }
            </tbody>
            </table>

        </section>
    );
}

export default UnitList;