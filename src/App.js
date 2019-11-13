import React from 'react';
import './App.css';
import {CompIteratorCRUD} from './components/CompIteratorCRUD';
import {MainComp} from './components/apiCrud/MainComp';
import { Container, Row, Col } from 'reactstrap';

function App() {
  return (
    <Container>
      <Row>
        <Col><CompIteratorCRUD /></Col>
      </Row>
      <hr></hr>
      <Row>
        <Col xs="6"><MainComp /></Col>
        <Col xs="6">.col-6</Col>        
      </Row>
    </Container>
  );
}

export default App;
