import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Task from './Task.js';

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleDelete(props) {
    this.props.onDelete(props);
  }

  handleToggle(props) {
    this.props.onToggle(props);
  }

  render() {
    var self = this;

    return (
      <Grid>
        {this.props.tasks.map(function(task, index){
          return <Task
            key={index}
            id={task.id}
            time={task.time}
            date_time={task.date_time}
            activity_title={task.activity_title}
            activity_description={task.activity_description}
            checked={task.checked}
            onDelete={self.handleDelete}
            onToggle={self.handleToggle}
          />
        })}
      </Grid>
    );
  }
}

export default TaskList;
