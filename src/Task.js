import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const axios = require('axios');

class Task extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(event) {
    axios.delete(process.env.REACT_APP_BACKEND_URL + '/todos/' + this.props.id)
      .then(function(response){
        console.log("Deleted the task!");
      })
      .catch(function(error){
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={1}>
            <div>
              <p style={{textAlign: 'center', fontWeight: 'bold', paddingTop: '10px'}}>{this.props.time}
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
                <FontAwesome name='times' onClick={this.deleteTask} />
              </Col>
              <Col xs={6}>
                <FontAwesome name='check' />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Task;
