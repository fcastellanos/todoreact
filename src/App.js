
import React, { Component } from 'react';

import TaskList from './TaskList.js';
import Date from './Date.js';
import Avatar from './Avatar.js';
import AddButton from './AddButton.js';
import CreateTaskModal from './CreateTaskModal.js';
import './App.css';

require('dotenv').config();

var tasks = [];

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks,
      modalIsOpen: false
    };

    this.init = this.init.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    var self = this;

    axios.get( process.env.REACT_APP_BACKEND_URL + '/todos')
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

  addTask() {
    console.log('Add task!');
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div style={{padding: '30px 30px'}} className="App">
        <Avatar />
        <br />
        <Date />
        <br />
        <TaskList tasks={this.state.tasks} />
        <br />
        <AddButton onClick={this.openModal} />
        <CreateTaskModal isOpen={this.state.modalIsOpen} requestClose={this.closeModal} />
      </div>
    );
  }
}

export default App;
