
import { Button,Modal } from 'react-bootstrap';

function ModalDelete({onClose,show,data,onConfirm}) {
  

    return (
      <>
        <Modal show={show} onHide={onClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body> Are you sure you want to delete <b>{data.name}</b>?</Modal.Body>
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