import React, {Component} from 'react';
import fireBase from './../../firebase';
import {Listusers} from './Listusers';
import {Row, Col} from 'reactstrap';
import { ViewUser} from './ViewUser';
import EditUser from './EditUser';

// https://firebase.google.com/docs/database/web/read-and-write

export class MainComp extends Component{
  constructor(){
    super();
    this.state = {
      users: null,
      user: null,
      userEditable: false
    }
    this.showUser = this.showUser.bind(this);
    // this.editUser = this.editUser.bind(this);
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

  // editUser(){

  // }

  componentDidMount() {
    //List
    const usersCollectionRef = fireBase.database().ref('users');  //Used Realtime DB instead of firebase
    
    usersCollectionRef.on('value', (snapshot) => {
      this.setState({
        users: snapshot.val()
      });
    });

    // Create
    // usersCollectionRef.push({
    //   name: 'Ricky',
    //   job: {
    //       title: 'Scientist'
    //   },
    //   age: 49,
    //   gender: 'Male'
    // }).then(() => {
    //     console.log('Data is saved!');
    // }).catch((e) => {
    //     console.log('Failed.', e);
    // });

    // //Update
    // const userRefDB = fireBase.database();
    // userRefDB.ref('users/LtYZTwz-wvzh1VtkxvF').update({
    //   age: 67,
    //   name: 'Navvya',
    //   gender: 'Female'
    // }).then(() => {
    //   console.log('Data is updated!');
    // }).catch((e) => {
    //   console.log('Failed.', e);
    // });

    // //delete
    // userRefDB.ref('users/LtYZTwz-wvzh1VtkxvF').remove();


  }

  render(){
    var viewUser = null;
    var editUser = null;
    if(this.state.user && this.state.userEditable){
      editUser = <Col><EditUser user={this.state.user} /></Col>
    }else if(this.state.user && !this.state.userEditable){
      viewUser = <Col><ViewUser user={this.state.user} /></Col>
    }
    // console.log(this.state.user)
    return(
      <Row>
        <Col xs="6"><Listusers users={this.state.users} showUser={this.showUser} /></Col>
        {viewUser}
        {editUser}
      </Row>
    )
  }
    
}
