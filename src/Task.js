import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Task extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    let taskToDelete = {
      id: this.props.id,
      title: this.props.activity_title,
      time: this.props.time,
      period: this.props.period
    };
    this.props.onDelete(taskToDelete);
  }

  render() {
    return (
      <Row id={this.props.id}>
        <Col xs={1}>
          <div>
            <p className="taskTime">{this.props.time}
              <br/>
              <span>{this.props.period}</span>
            </p>
          </div>
        </Col>
        <Col xs={10}>
          <h4>{this.props.activity_title}</h4>
          <p>{this.props.activity_description}</p>
        </Col>
        <Col xs={1}>
          <Row style={{paddingTop: '10px'}}>
            <Col xs={6}>
              <Button bsStyle='danger' onClick={this.handleDelete}>
                <FontAwesomeIcon icon='calendar-times' />
              </Button>
            </Col>
            <Col xs={6}>
              <Button bsStyle='success'>
                <FontAwesomeIcon icon='calendar-check' />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Task;
