import React, {Component} from 'react';
import fireBase from './../../firebase';
import {Listusers} from './Listusers';

// https://firebase.google.com/docs/database/web/read-and-write

export class MainComp extends Component{
  constructor(){
    super();
    this.state = {
      users: null,
      user: null
    }
  }

  componentDidMount() {
    //List
    const usersCollectionRef = fireBase.database().ref('users');  //Used Realtime DB instead of firebase
    
    usersCollectionRef.on('value', (snapshot) => {
      this.setState({
        users: snapshot.val()
      });
    });

    //Create
    // usersCollectionRef.push({
    //   name: 'Nikola Tesla',
    //   job: {
    //       title: 'Inventor'
    //   },
    //   age: 40,
    //   gender: 'Female'
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
    return(
      <div>
        {/* {JSON.stringify(this.state.users)} */}
        <Listusers users={this.state.users} />
      </div>
    )
  }
    
}
