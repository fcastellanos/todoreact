import React, {Component} from 'react';
import {Modal, Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

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
    }
  }

  handleRequestClose() {
    this.props.onHide();
  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  render() {
    function FieldGroup({ id, label, help, ...props }) {
      return (
        <FormGroup controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
    }

    return (
      <Modal show={this.props.show} onHide={this.handleRequestClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSubmit}>
            <FieldGroup
              id="formTaskTitle"
              type="text"
              label="Title"
              placeholder="Enter Title"
              onChange={this.handleChange.bind(this, "title")}
              value={this.state.fields["title"]}
            />
            <FieldGroup
              id="formTaskDescription"
              componentClass="textarea"
              label="Description"
              placeholder="Enter Description"
              onChange={this.handleChange.bind(this, "description")}
              value={this.state.fields["description"]}
            />
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
