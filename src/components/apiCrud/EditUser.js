import React,{Component} from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class EditUser extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '', 
      age: '',
      gender: 'male',
      jobTitle: null,
      user_id: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(props, current_state) {
    // console.log(current_state)
    // console.log(props.user);
    if (props.user)
    {
      if(current_state.user_id != props.user.id){
        return{
          name: props.user.name,
          age: props.user.age,
          jobTitle: props.user.jobTitle,
          user_id: props.user.id,
        }      
      }
      else
      {
        return {
          name: current_state.name,
          age: current_state.age,
          jobTitle: current_state.jobTitle,
        }
      }
    }
    else
    {
      return {
        name: current_state.name === null ? "" : current_state.name,
        age: current_state.age === null ? "" : current_state.age,
        jobTitle: current_state.jobTitle === null ? "" : current_state.jobTitle,
      }
    }

  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(){
    this.setState({name: "",
      age: "",
      jobTitle: null,
      user_id: null
    })
    this.props.handleSubmit(this.state.user_id, this.state.name, this.state.age, this.state.jobTitle)    
  }

  render(){
    // console.log("render----");
    // console.log(this.state.name)
    return(
      <Row>
        <Col>
        <Form>
          <FormGroup>
            <Label for="name"><strong>Name</strong></Label>
            <Input type="text" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)} />
          </FormGroup>
          <FormGroup>
            <Label for="age"><strong>Age</strong></Label>
            <Input type="text" name="age" value={this.state.age} onChange={(event) => this.handleChange(event)} />
          </FormGroup>
          {/* <FormGroup>
            <Label for="jobTitle">Job Title</Label>
            <Input type="text" name="jobTitle" value={this.state.jobTitle} onChange={(event) => this.handleChange(event)} />
          </FormGroup>           */}
          <FormGroup>
            <Button color="primary" onClick={() => this.handleSubmit(this.state.user_id, this.state.name, this.state.age, this.state.jobTitle)}>
              Submit</Button>
          </FormGroup>

        </Form>
        </Col>
      </Row>
    )
  }

}