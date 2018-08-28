import React, { Component } from 'react';
import Task from './Task.js';

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(props) {
    this.props.onDelete(props);
  }

  render() {
    var self = this;

    return (
      <div>
        {this.props.tasks.map(function(task, index){
          return <Task
            key={index}
            id={task.id}
            time={task.time}
            period={task.period}
            activity_title={task.activity_title}
            activity_description={task.activity_description}
            onDelete={self.handleDelete}/>
        })}
      </div>
    );
  }
}

export default TaskList;
