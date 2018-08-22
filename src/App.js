import React, { Component } from 'react';
import TaskList from './TaskList.js';
import Date from './Date.js';
import Avatar from './Avatar.js';
import AddButton from './AddButton.js';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {
          'time': '12',
          'period': 'AM',
          'activity_title': 'Finish Tutorial Series',
          'activity_description': '#ReactForNewbies'
        },
        {
          'time': '9',
          'period': 'AM',
          'activity_title': 'Meeting with Team Leads',
          'activity_description': 'New Project Kickoff'
        },
        {
          'time': '11',
          'period': 'AM',
          'activity_title': 'Call Mom',
          'activity_description': 'Return her call before she kills me'
        },
        {
          'time': '3',
          'period': 'PM',
          'activity_title': 'Fix Wifey\'s website',
          'activity_description': 'FB Ads Integration not working'
        },
        {
          'time': '6',
          'period': 'PM',
          'activity_title': 'Do DB Backups',
          'activity_description': 'Related to upcoming server migration'
        }
      ]
    }
  }

  addTask() {
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
