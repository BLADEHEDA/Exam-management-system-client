import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({value,onClose,OnConfirm}) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={onClose} >
          <Modal.Title>Delete {value} </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this {value} </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={OnConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ConfirmModal;