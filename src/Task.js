import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'moment';

class Task extends Component {
  constructor(props) {
    super(props);

    this.handleDelete  = this.handleDelete.bind(this);
  }

  handleDelete() {
    let taskToDelete = {
      id: this.props.id,
      title: this.props.activity_title,
      date_time: this.props.date_time
    };
    this.props.onDelete(taskToDelete);
  }

  formatTime() {
    return Moment(this.props.date_time).format('hh');
  }

  formatPeriod() {
    return Moment(this.props.date_time).format('A');
  }

  setTaskClassName() {
    if (this.props.checked) {
      return 'taskCompleted';
    } else {
      return '';
    }
  }

  render() {
    return (
      <Row id={this.props.id}>
        <Col xs={1} className={this.setTaskClassName()}>
          <div>
            <p className="taskTime">{this.formatTime()}
              <br/>
              <span>{this.formatPeriod()}</span>
            </p>
          </div>
        </Col>
        <Col xs={10} className={this.setTaskClassName()}>
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
