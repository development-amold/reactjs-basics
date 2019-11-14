import React,{Component} from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

export default class EditUser extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: null, 
      age: null,
      user_id: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(props, current_state) {
    if(current_state.user_id != props.user.id){
      return{
        name: props.user.name,
        age: props.user.age,
        user_id: props.user.id,
        editableView: true
      }      
    }else{
      return {
        name: current_state.name,
        age: current_state.age,
      }      
    }

  }

  handleChange(event){
    // console.log(this.state.name)
    this.setState({[event.target.name]: event.target.value})

  }


  render(){
    // console.log("render----");
    // console.log(this.state.name)
    return(
      <Row>
        <Col>
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)} />
          </FormGroup>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="text" name="age" value={this.state.age} onChange={(event) => this.handleChange(event)} />
          </FormGroup>
        </Form>
        </Col>
      </Row>
    )
  }

}