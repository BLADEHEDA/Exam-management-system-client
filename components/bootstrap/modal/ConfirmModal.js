import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({ value, onClose, onConfirm }) {
  return (
<<<<<<< HEAD
    <Modal show centered onHide={onClose}>
      <Modal.Header closeButton>
=======
    <Modal
      show
      onHide={onClose}
      centered
      dialogClassName="confirm-modal"
    >
      <Modal.Header closeButton onClick={onClose}>
>>>>>>> 3bc382a (proper working branch)
        <Modal.Title>Delete {value}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this {value}?</p>
      </Modal.Body>

      <Modal.Footer>
<<<<<<< HEAD
        <Button variant="primary" onClick={onClose}>Cancel</Button>
=======
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
>>>>>>> 3bc382a (proper working branch)
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
