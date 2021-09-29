import Unit from './Unit';

function UnitList() {
   
    return (
       <section>
            <h1 className="mt-4">Units</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Units</li>
            </ol>
          <Unit/>
       </section>
    );
}

export default UnitList;