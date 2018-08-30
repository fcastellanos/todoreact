import React, {Component} from 'react';
import {Row, Col, Image} from 'react-bootstrap';

class Avatar extends Component {
  render() {
    return (
      <Image src="https://avatars2.githubusercontent.com/u/123592?s=200&v=4" height={100} width={100} thumbnail circle />
    );
  }
}

export default Avatar;
