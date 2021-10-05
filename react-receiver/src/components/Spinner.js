
function Spinner() {
    return (
        <section>
       
        <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status" style={{margin: "10%"}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      </section>
    );
  }
  
  export default Spinner;
  