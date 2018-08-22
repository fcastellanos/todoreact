
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
  constructor() {
    super();
    this.state = {
      tasks: tasks
    }
  }

  init() {
    // Refference https://github.com/99xt/serverless-react-boilerplate/blob/aws-react/web/src/App.js#L26
  }

  addTask() {
    console.log(process.env);

    axios.get( process.env.REACT_APP_BACKEND_URL + '/todos')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    var task = {'time': '5', 'period': 'AM', 'activity_title': 'Jogging', 'activity_description': 'Go for a run!'};
    var tasks = this.state.tasks.concat(task);
    this.setState({tasks: tasks});
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
