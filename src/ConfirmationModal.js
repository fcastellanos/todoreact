import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

require('react-bootstrap/lib/ModalHeader');
require('react-bootstrap/lib/ModalTitle');
require('react-bootstrap/lib/ModalBody');
require('react-bootstrap/lib/ModalFooter');

class ConfirmationModal extends Component {
  constructor(props) {
    super(props);

    this.handleRequestClose  = this.handleRequestClose.bind(this);
    this.handleConfirmAction = this.handleConfirmAction.bind(this);
  }

  handleRequestClose() {
    this.props.onHide();
  }

  handleConfirmAction() {
    this.props.onConfirm(this.props.taskToDelete);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the task <b>{this.props.taskToDelete['title']}</b>
        </ Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={this.handleRequestClose}>Cancel</Button>
          <Button bsStyle='danger' onClick={this.handleConfirmAction}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmationModal;
