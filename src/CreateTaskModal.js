import React, {Component} from 'react';
import {Modal, Button, FormControl, FormGroup, ControlLabel, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

require("react-bootstrap/lib/ModalHeader");
require("react-bootstrap/lib/ModalTitle");
require("react-bootstrap/lib/ModalBody");
require("react-bootstrap/lib/ModalFooter");

const axios = require('axios');

class CreateTaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        taskTitle: "",
        taskDescription: "",
        time: "",
        period: "AM"
      },
      errors: {}
    };

    this.handleChange       = this.handleChange.bind(this);
    this.onSubmit           = this.onSubmit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
  }

  handleRequestClose() {
    this.props.onHide();
  }

  onSubmit(event) {
    event.preventDefault();

    console.log(this.state.fields);

    // NOTE: Instead of constructing the post body we can just set this.state.fields
    // if the field ids match the request fields
    // TODO: Change taskTitle => activity_title
    //       Change taskDescription => activity_description

    var self = this;

    axios.post(process.env.REACT_APP_BACKEND_URL + '/todos', {
      "activity_title": this.state.fields['taskTitle'],
      "activity_description": this.state.fields['taskDescription'],
      "time": "3",
      "period": "PM"
    })
      .then(function(response){
        self.handleRequestClose();
      })
      .catch(function(error){
        console.log(error);
      });
  }

  handleChange(event) {
    let fields = this.state.fields;
    fields[event.target.id] = event.target.value;
    this.setState({fields});
  }

  handlePeriodChange(event) {
    let fields = this.state.fields;
    fields["period"] = event.target.value;
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
            <FormGroup>
              <ControlLabel>Time</ControlLabel>
              <FormControl
                id="time"
                type="text"
                placeholder="Enter Time"
                onChange={this.handleChange}
                value={this.state.fields["time"]}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Period</ControlLabel>
              <div>
                <ToggleButtonGroup type="radio" name="period" defaultValue={this.state.fields["period"]}>
                  <ToggleButton onChange={this.handlePeriodChange} value={"AM"}>AM</ToggleButton>
                  <ToggleButton onChange={this.handlePeriodChange} value={"PM"}>PM</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </FormGroup>
            <Button bsStyle="success" type="submit">Submit</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.handleRequestClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateTaskModal;
