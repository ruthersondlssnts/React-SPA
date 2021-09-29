import '../assets/css/styles.css';
import '../assets/js/scripts';
import React from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Employee from '../components/Employee';
import ModalDelete from '../components/ModalDelete';
import { Button,Modal } from 'react-bootstrap';
import {useState} from 'react';
function MasterLayout() {
    const [show, setShow] = useState(false);
    const [employeeName, setEmployeeName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setEmployeeName(e);
        setShow(true);
    }
    const handleDeleteConfirm = (e) => {
       alert("Deleted");
       setShow(false);
       setEmployeeName("");
    }
  return (
    <div className="sb-nav-fixed">
         <Topbar/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <Sidebar/>
                
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                         <Employee name="Rutherson" contact="095664" department="IT" onModalShow={handleShow}  ></Employee> 
                         <Employee name="Delos" contact="095664" department="IT" onModalShow={handleShow}  ></Employee> 

                        {/* <Button variant="primary" onClick={handleShow}>
                            Launch demo modal
                        </Button> */}

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>{employeeName}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleDeleteConfirm}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* <ModalDelete onClose={deleteCloseHandler} show={modalDeleteIsOpen}/> */}
                      
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
        
    </div>
  );
}

export default MasterLayout;
