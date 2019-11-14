import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

export const Home = () => {
  return(
    <div>
      <Row>
        <Col><strong>Technolgy: ReactJS+Firebase Api</strong></Col>
      </Row>
      <Row>  
        <Col>
          <strong>Features:</strong>
          <ListGroup>
            <ListGroupItem>Inline editing with array data and it's validations</ListGroupItem>
            <ListGroupItem>CRUD using Firebase DB Api</ListGroupItem>
          </ListGroup>  
        </Col>
      </Row>
    </div>    
  )
}