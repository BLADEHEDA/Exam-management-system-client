import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({ value, onClose, onConfirm }) {
  return (
    <Modal
      show
      onHide={onClose}
      centered
      dialogClassName="confirm-modal"
    >
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Delete {value}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this {value}?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
