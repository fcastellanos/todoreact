import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddButton extends Component {
  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <Button bsStyle='success' bsSize='large' onClick={this.handleClick.bind(this)}>
        <FontAwesomeIcon icon='calendar-plus' />
      </Button>
    );
  }
}

export default AddButton;
