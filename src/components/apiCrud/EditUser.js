import React,{Component} from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class EditUser extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '', 
      age: '',
      gender: '',
      jobTitle: '',
      user_id: null,
      is_valid: true,
      is_submit_disabled: true
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
          jobTitle: props.user.job.title,
          gender: props.user.gender,
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
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    let is_valid = true;
    // console.log(fieldName+"----"+fieldValue)
    if(fieldName == 'name' && typeof fieldValue != 'undefined' && !(/[a-zA-Z]+$/).test(fieldValue) )
    {
      alert("Only Letters are allowed");
      is_valid = false;
    }
    else if (fieldName == 'age' && typeof fieldValue != 'undefined' && !(/[0-9]+$/).test(fieldValue) )
    {
      alert("Only Numbers are allowed");
      is_valid = false;
    }
    if(is_valid) {
      this.setState({[event.target.name]: event.target.value, is_submit_disabled: false})
    }
  }

  handleSubmit(){
    this.setState({name: "",
      age: "",
      jobTitle: null,
      user_id: null
    })
    this.props.handleSubmit(this.state.user_id, this.state.name, this.state.age, this.state.jobTitle, this.state.gender)    
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
          <FormGroup>
            <Label for="jobTitle"><strong>Select Job</strong></Label>
            <Input type="select" name="jobTitle" value={this.state.jobTitle} id="jobTitle" onChange={(event) => this.handleChange(event)}>
              <option key="" value="">Select Job</option>
              <option key="Scientist" value="scientist">Scientist</option>
              <option key="Programmer" value="programmer">Programmer</option>
              <option key="Doctor" value="doctor">Doctor</option>
              <option key="Engineer" value="engineer">Engineer</option>
            </Input>
          </FormGroup>

          <FormGroup tag="fieldset" row> 
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="gender" value="male" checked={this.state.gender == 'male' ? "checked" : ""} onChange={(event) => this.handleChange(event)} />
                  Male
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="gender" value="female" checked={this.state.gender == 'female' ? "checked" : ""} onChange={(event) => this.handleChange(event)} />
                  Female
                </Label>              
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup>
            <Button color="primary" 
              onClick={() => this.handleSubmit(this.state.user_id, this.state.name, this.state.age, this.state.jobTitle)} disabled={this.state.is_submit_disabled}>
              Submit</Button>
          </FormGroup>

        </Form>
        </Col>
      </Row>
    )
  }

}