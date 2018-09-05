
import React, { Component } from 'react';

import TaskList from './TaskList.js';
import Date from './Date.js';
import Avatar from './Avatar.js';
import AddButton from './AddButton.js';
import CreateTaskModal from './CreateTaskModal.js';
import ConfirmationModal from './ConfirmationModal.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarTimes, faCalendarCheck, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { Grid, Row, Col } from 'react-bootstrap';
import './App.css';
// TODO: Find a way to use the css coming from the package, see CreateTaskModal
import './DatePicker.css';

library.add(faCalendarTimes, faCalendarCheck, faCalendarPlus)

require('dotenv').config();

var tasks = [];

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks,
      modalIsOpen: false,
      deleteModalIsOpen: false,
      taskToDelete: {
        id: '',
        title: '',
        date_time: ''
      }
    };

    this.init             = this.init.bind(this);
    this.openModal        = this.openModal.bind(this);
    this.closeModal       = this.closeModal.bind(this);
    this.openDeleteModal  = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.confirmDelete    = this.confirmDelete.bind(this);
    this.createTask       = this.createTask.bind(this);
    this.toggleTask       = this.toggleTask.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    var self = this;

    axios.get(process.env.REACT_APP_BACKEND_URL + '/todos')
      .then(function (response) {
        self.setState({tasks: response.data});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  openDeleteModal(taskData) {
    this.setState({taskToDelete: taskData});
    this.setState({deleteModalIsOpen: true});

    document.getElementById(taskData.id).classList.add('taskToDelete');
  }

  closeDeleteModal() {
    document.getElementById(this.state.taskToDelete.id).classList.remove('taskToDelete');

    this.setState({deleteModalIsOpen: false});
    this.setState({taskToDelete: {
      id: '',
      title: '',
      date_time: ''
    }});
  }

  createTask(taskData) {
    var self = this;

    axios.post(process.env.REACT_APP_BACKEND_URL + '/todos', taskData)
      .then(function(response){
        self.state.tasks.push(taskData);
        self.setState({modalIsOpen: false});
        self.setState({tasks: self.state.tasks});
      })
      .catch(function(error){
        console.log(error);
      });
  }

  confirmDelete(taskData) {
    var self = this;

    document.getElementById(taskData.id).classList.remove('taskToDelete');

    axios.delete(process.env.REACT_APP_BACKEND_URL + '/todos/' + taskData['id'])
      .then(function(response){
        var index = self.state.tasks.findIndex(x => x.id === taskData.id);
        self.state.tasks.splice(index, 1);

        self.setState({deleteModalIsOpen: false});
        self.setState({tasks: self.state.tasks});
      })
      .catch(function(error){
        console.log(error);
      });
  }

  toggleTask(taskData) {
    var self = this;

    console.log(taskData);
  }

  render() {
    return (
      <div style={{padding: '30px 30px'}} className='App'>
        <Grid>
          <Row>
            <Col lg={11} lgOffset={11}>
              <Avatar />
            </Col>
          </Row>
          <Row>
            <Col>
              <Date />
            </Col>
          </Row>
          <Row>
            <TaskList
              tasks={this.state.tasks}
              onDelete={this.openDeleteModal}
              onToggle={this.toggleTask}
            />
          </Row>
          <Row>
            <Col lgOffset={10}>
              <AddButton onClick={this.openModal} />
            </Col>
          </Row>
        </Grid>
        <CreateTaskModal
          show={this.state.modalIsOpen}
          onHide={this.closeModal}
          onCreate={this.createTask}
        />
        <ConfirmationModal
          show={this.state.deleteModalIsOpen}
          onHide={this.closeDeleteModal}
          taskToDelete={this.state.taskToDelete}
          onConfirm={this.confirmDelete}
        />
      </div>
    );
  }
}

export default App;
