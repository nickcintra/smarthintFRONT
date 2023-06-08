import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckCircle } from 'react-icons/fa';


const CustomModal = ({ showModal, closeModal }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Cliente cadastrado com sucesso!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: 'center' }}>
          <FaCheckCircle size={100} color="green" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
