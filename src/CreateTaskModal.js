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
        activity_title: "",
        activity_description: "",
        time: "",
        period: "AM"
      },
      errors: {}
    };

    this.onSubmit           = this.onSubmit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChange       = this.handleChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
  }

  handleRequestClose() {
    this.props.onHide();
  }

  onSubmit(event) {
    event.preventDefault();

    var self = this;

    axios.post(process.env.REACT_APP_BACKEND_URL + '/todos', this.state.fields)
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

  // TODO: Find a way to make the period input work with the handleChange function
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
                id="activity_title"
                type="text"
                placeholder="Enter Title"
                onChange={this.handleChange}
                value={this.state.fields["activity_title"]}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                id="activity_description"
                componentClass="textarea"
                placeholder="Enter Description"
                onChange={this.handleChange}
                value={this.state.fields["activity_description"]}
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
