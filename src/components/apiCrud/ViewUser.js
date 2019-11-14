import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export const ViewUser = (props) => {
  console.log('Render ')
  return (
    <ListGroup>
      <ListGroupItem><strong>Name:</strong> {props.user.name}</ListGroupItem>
      <ListGroupItem><strong>Age:</strong> {props.user.age}</ListGroupItem>
      <ListGroupItem><strong>Gender:</strong> {props.user.gender}</ListGroupItem>
      <ListGroupItem><strong>Job:</strong> {props.user.job.title}</ListGroupItem>
    </ListGroup>
  )
}