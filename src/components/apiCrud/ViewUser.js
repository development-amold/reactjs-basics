import React from 'react';
import lodash from 'lodash';
import { ListGroup, ListGroupItem } from 'reactstrap';

const PascalcaseStr = (str) => {
  //first letter capital and remaining aew small
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const ViewUser = (props) => {
  console.log('Render ')
  return (
    <ListGroup>
      <ListGroupItem><strong>Name:</strong> {props.user.name}</ListGroupItem>
      <ListGroupItem><strong>Age:</strong> {props.user.age}</ListGroupItem>
      <ListGroupItem><strong>Gender:</strong> {PascalcaseStr(props.user.gender)}</ListGroupItem>
      <ListGroupItem><strong>Job:</strong> {PascalcaseStr(props.user.job.title)}</ListGroupItem>
    </ListGroup>
  )
}