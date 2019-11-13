import React, {Component} from 'react';
import './Listusers.css';
import { Table, Button } from 'reactstrap';

export class Listusers extends Component{
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }
  render(){
    let usersList = this.props.users;
    if(usersList){
      var usersArr= []
      Object.values(usersList).map((user,index) => {
        return usersArr.push(
          <tr>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>
              <Button color="primary">Show</Button>|
              <Button color="primary">Edit</Button>|
              <Button color="primary">Destroy</Button>
            </td>
          </tr>
        )
      })
    }
    else{
      return null
    }
    return(
      <Table bordered responsive striped>
      <thead>
        <tr>
          
          <th>Name</th>
          <th>Age</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {usersArr}
      </tbody>
    </Table>

    )
  }

}