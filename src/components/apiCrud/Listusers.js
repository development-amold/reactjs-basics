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
    var usersArr= []
    if(usersList){
      // console.log(usersList)
      // debugger
      for (let [objKey, objValue] of Object.entries(usersList)) {
        // console.log(objKey)
        usersArr.push(
          <tr key={objKey}>
            <td>{objValue.name}</td>
            <td>{objValue.age}</td>
            <td>
              <Button color="primary" onClick={(event) => this.props.showUser(objKey, {editable: false})}>Show</Button>|
              <Button color="primary" onClick={(event) => this.props.showUser(objKey, {editable: true})}>Edit</Button>|
              <Button color="primary">Destroy</Button>
            </td>
          </tr>
        )
      }
      
      // Object.values(usersList).map((user,index) => {
      //   return usersArr.push(
      //     <tr key={index}>
      //       <td>{user.name}</td>
      //       <td>{user.age}</td>
      //       <td>
      //         <Button color="primary" onClick={() => this.showUser()}>Show</Button>|
      //         <Button color="primary">Edit</Button>|
      //         <Button color="primary">Destroy</Button>
      //       </td>
      //     </tr>
      //   )
      // })



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