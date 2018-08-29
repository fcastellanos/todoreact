
import React, { Component } from 'react';

import TaskList from './TaskList.js';
import Date from './Date.js';
import Avatar from './Avatar.js';
import AddButton from './AddButton.js';
import CreateTaskModal from './CreateTaskModal.js';
import ConfirmationModal from './ConfirmationModal.js';
import './App.css';

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
        time: '',
        period: ''
      }
    };

    this.init             = this.init.bind(this);
    this.openModal        = this.openModal.bind(this);
    this.closeModal       = this.closeModal.bind(this);
    this.openDeleteModal  = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.confirmDelete    = this.confirmDelete.bind(this);
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
  }

  closeDeleteModal() {
    this.setState({deleteModalIsOpen: false});
  }

  confirmDelete(taskData) {
    var self = this;

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

  render() {
    return (
      <div style={{padding: '30px 30px'}} className='App'>
        <Avatar />
        <br />
        <Date />
        <br />
        <TaskList tasks={this.state.tasks} onDelete={this.openDeleteModal} />
        <br />
        <AddButton onClick={this.openModal} />
        <CreateTaskModal show={this.state.modalIsOpen} onHide={this.closeModal} />
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
