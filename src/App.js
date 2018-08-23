
import React, { Component } from 'react';

import TaskList from './TaskList.js';
import Date from './Date.js';
import Avatar from './Avatar.js';
import AddButton from './AddButton.js';
import './App.css';

require('dotenv').config();

var tasks = [];

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks
    };

    this.init = this.init.bind(this);
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

  render() {
    return (
      <div style={{padding: '30px 30px'}}>
        <Avatar />
        <br />
        <Date />
        <br />
        <TaskList tasks={this.state.tasks} />
        <br />
        <AddButton onClick={this.addTask.bind(this)} />
      </div>
    );
  }
}

export default App;
