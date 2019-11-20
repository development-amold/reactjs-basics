import React, {Component} from 'react';
import fireBase from './../../firebase';
import {Listusers} from './Listusers';
import { Row, Col, Button } from 'reactstrap';
import { ViewUser} from './ViewUser';
import EditUser from './EditUser';

// https://firebase.google.com/docs/database/web/read-and-write

export class MainComp extends Component{
  constructor(){
    super();
    this.state = {
      users: null,
      user: null,
      userEditable: false,
      newUser: false
    }
    this.showUser = this.showUser.bind(this);
    // this.editUser = this.editUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  showUser(user_id, args){
    // console.log(args.editable)
    // let compDidThis = this;
    if(user_id){
      //get a single document
      const usersCollectionRef = fireBase.database().ref('users');
      usersCollectionRef.on('value', (snapshot) => {
        for (let [objKey, objValue] of Object.entries(snapshot.val())) {
          if(objKey === user_id){
            this.setState({
              userEditable: args.editable,
              user: {...snapshot.val()[objKey], id: objKey}
            })
          }
        }
      });
    }
  }

  handleSubmit(user_id, name, age, jobTitle, gender){
    if(name == "" || age == ""){
      alert("Name and Age mandatory")
    }else{
      const userRefDB = fireBase.database();
      if (user_id){
        userRefDB.ref(`users/${user_id}`).update({
          age: age,
          name: name,
          job: {
            title: jobTitle
          },
          gender: gender
        }).then(() => {
          console.log('Data is updated!');
          this.setState({newUser: true, user: null})
        }).catch((e) => {
          console.log('Failed.', e);
        });
      }else{
        const usersCollectionRef = fireBase.database().ref('users');
        console.log(jobTitle)
        usersCollectionRef.push({
          name: name,
          age: age,
          job: {
            title: jobTitle
          },
          gender: gender               
        }).then(() => {
          console.log('Data is saved!');
          this.setState({newUser: true, user: null})
        }).catch((e) => {
            console.log('Failed.', e);
        });
      }      
    }
  }

  handleDestroy = (user_id) => {
    const userRefDB = fireBase.database();
    userRefDB.ref(`users/${user_id}`).remove();
  }

  addNew(){
    this.setState({newUser: true, user: null})
  }

  componentDidMount() {
    //List
    const usersCollectionRef = fireBase.database().ref('users');  //Used Realtime DB instead of firebase
    
    usersCollectionRef.on('value', (snapshot) => {
      this.setState({
        users: snapshot.val()
      });
    });
  }

  render(){
    var viewUser = null;
    var editUser = null;
    if(this.state.user && this.state.userEditable){
      editUser = <Col><EditUser user={this.state.user} handleSubmit={this.handleSubmit} /></Col>
    }else if(this.state.user && !this.state.userEditable){
      viewUser = <Col><ViewUser user={this.state.user} /></Col>
    }
    else if(this.state.newUser){
      // console.log(this.state.user)
      viewUser = <Col><EditUser user={this.state.user} handleSubmit={this.handleSubmit}/></Col>
    }
    // console.log(this.state.user)
    return(
      <div>
        <Row>
          <Col>
          <Button color="success" onClick={() => this.addNew()}>Add New</Button>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col xs="6"><Listusers users={this.state.users} showUser={this.showUser} handleDestroy={this.handleDestroy}/></Col>
          {viewUser}
          {editUser}
        </Row>
      </div>  
    )
  }
    
}
