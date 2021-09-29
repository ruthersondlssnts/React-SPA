import Role from './Role';

function RoleList() {
   
    return (
       <section>
            <h1 className="mt-4">Roles</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Roles</li>
            </ol>
          <Role/>
       </section>
    );
}

export default RoleList;