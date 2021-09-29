
import { Button,Modal } from 'react-bootstrap';

function ModalDelete({onClose,show}) {
  

    function handleDeleteConfirm() {
    }


    return (
      <>
        <Modal show={show} onHide={onClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body> Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ModalDelete;