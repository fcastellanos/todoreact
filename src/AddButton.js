import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddButton extends Component {
  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={10}></Col>
          <Col xs={2}>
            <Button bsStyle='danger' bsSize='large' onClick={this.handleClick.bind(this)}>
              <FontAwesomeIcon icon='calendar-plus' />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddButton;
