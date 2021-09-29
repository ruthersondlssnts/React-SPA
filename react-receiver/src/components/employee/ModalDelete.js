
import { Button,Modal } from 'react-bootstrap';

function ModalDelete({onClose,show,name,onConfirm}) {
  

    return (
      <>
        <Modal show={show} onHide={onClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body> Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ModalDelete;