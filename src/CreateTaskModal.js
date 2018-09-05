import React, {Component} from 'react';
import {Modal, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import * as Datetime from 'react-datetime';

// require('react-datetime');

require('react-bootstrap/lib/ModalHeader');
require('react-bootstrap/lib/ModalTitle');
require('react-bootstrap/lib/ModalBody');
require('react-bootstrap/lib/ModalFooter');

var emptyTask = {
  activity_title: '',
  activity_description: '',
  date_time: ''
};

class CreateTaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: emptyTask,
      errors: {}
    };

    this.onSubmit           = this.onSubmit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChange       = this.handleChange.bind(this);
    this.handleDateChange   = this.handleDateChange.bind(this);
  }

  handleRequestClose() {
    this.props.onHide();
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onCreate(this.state.fields);

    // TODO: Find a way to use the emptyTask variable.
    this.setState({fields: {
      activity_title: '',
      activity_description: '',
      date_time: ''
    }});
  }

  handleChange(event) {
    let fields = this.state.fields;
    fields[event.target.id] = event.target.value;
    this.setState({fields});
  }

  handleDateChange(event) {
    let fields = this.state.fields;
    fields['date_time'] = event.format();
    this.setState({fields});
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSubmit}>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                id='activity_title'
                type='text'
                placeholder='Enter Title'
                onChange={this.handleChange}
                value={this.state.fields['activity_title']}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                id='activity_description'
                componentClass='textarea'
                placeholder='Enter Description'
                onChange={this.handleChange}
                value={this.state.fields['activity_description']}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Date / Time</ControlLabel>
              <Datetime onChange={this.handleDateChange} closeOnSelect={true} />
            </FormGroup>
            <Button bsStyle='success' type='submit'>Submit</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.handleRequestClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateTaskModal;
