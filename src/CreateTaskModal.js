import React, {Component} from 'react';
import {Modal, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

require("react-bootstrap/lib/ModalHeader");
require("react-bootstrap/lib/ModalTitle");
require("react-bootstrap/lib/ModalBody");
require("react-bootstrap/lib/ModalFooter");

class CreateTaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleRequestClose() {
    this.props.onHide();
  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
  }

  handleChange(event) {
    let fields = this.state.fields;
    fields[event.target.id] = event.target.value;
    console.log(fields);
    // this.setState({fields});
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleRequestClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSubmit}>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                id="taskTitle"
                type="text"
                placeholder="Enter Title"
                onChange={this.handleChange}
                value={this.state.fields["taskTitle"]}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                id="taskDescription"
                componentClass="textarea"
                placeholder="Enter Description"
                onChange={this.handleChange}
                value={this.state.fields["taskDescription"]}
              />
            </FormGroup>
            <Button bsStyle="success" type="submit">Submit</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.handleRequestClose.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateTaskModal;
