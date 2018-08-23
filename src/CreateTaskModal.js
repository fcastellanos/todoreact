import React, {Component} from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class CreateTaskModal extends Component {
  handleAfterOpen() {
    console.log("AfterOpen Modal");
  }

  handleRequestClose() {
    this.props.requestClose();
  }

  handleCreate() {
    console.log("Clicked create!");
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}
        onAfterOpen={this.handleAfterOpen.bind(this)}
        onRequestClose={this.handleRequestClose.bind(this)}
        style={customStyles}
        contentLabel=""
      >
        <div>
          <Row>
            <Col xs={10}></Col>
            <Col xs={2}>
              <Button bsSize="xsmall" bsStyle="danger" onClick={this.handleRequestClose.bind(this)}>
                <FontAwesome name='times' />
              </Button>
            </Col>
          </Row>
          <Row>
            <Form horizontal>
              <FormGroup controlId="formHorizontalTaskTitle">
                <Col componentClass={ControlLabel} sm={2}>
                  Title
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Task Title" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalTaskDescription">
                <Col componentClass={ControlLabel} sm={2}>
                  Description
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Task Description" />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">Create Task</Button>
                </Col>
              </FormGroup>
            </Form>
          </Row>
        </div>
      </Modal>
    );
  }
}

export default CreateTaskModal;
