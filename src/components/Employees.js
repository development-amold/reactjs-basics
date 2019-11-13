import React, {Component} from 'react';
import './Employees.css';
import { Button, Table, Input} from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class Employees extends Component{
  constructor(props){
    super(props);
    this.updateInput = this.updateInput.bind(this);
    this.editable_tr = this.editable_tr.bind(this);
    this.state = {   //it's mandatory for Edit action
      
    }
  }

  updateInput = (event, index) => {
    // debugger
    var idRegExp = new RegExp("id_" + index);
    if(idRegExp.test(event.target.name) && !(/^[0-9]+$/).test(event.target.value) ){
      this.setState({[`id_${index}_valid`]:false})
    }else{
      this.setState({[`id_${index}_valid`]:true})
    }
    var zipRegExp = new RegExp("zipcode_" + index);
    if(zipRegExp.test(event.target.name) && !(/^[0-9]+(-)*[0-9]*(-)*$/).test(event.target.value) ){
      this.setState({[`zip_${index}_valid`]:false})
    }else{
      this.setState({[`zip_${index}_valid`]:true})
    }
    var nameRegExp = new RegExp("name_" + index);
    if(nameRegExp.test(event.target.name) && !(/^[a-zA-Z\s]+$/i).test(event.target.value) ){
      this.setState({[`name_${index}_valid`]:false})
    }else{
      this.setState({[`name_${index}_valid`]:true})
    }    
    this.setState({[event.target.name]: event.target.value})  //assigned array of values with keys name
  }

  editable_tr = (ind, emp) => {
    // debugger
    let updateDisabled = (this.state[`id_${ind}_valid`] === false || this.state[`name_${ind}_valid`] === false || 
      this.state[`zip_${ind}_valid`] === false) ? 'disabled' : '';
    return <tr key={ind}>
      <td><Input type="text" 
        style={{border: (this.state[`id_${ind}_valid`] === false)? '4px solid red':'1px solid #ced4da' }}
        name={`id_${ind}`} defaultValue={emp.id} onChange={(event) => this.updateInput(event,ind)} /></td>
      <td><Input type="text" name={`name_${ind}`} 
        style={{border: (this.state[`name_${ind}_valid`] === false)? '4px solid red':'1px solid #ced4da' }} 
        defaultValue={emp.name} onChange={(event) => this.updateInput(event,ind)} /></td>
      <td><Input type="text" name={`zipcode_${ind}`} 
        style={{border: (this.state[`zip_${ind}_valid`] === false)? '4px solid red':'1px solid #ced4da' }} 
        defaultValue={emp.zipcode} onChange={(event) => this.updateInput(event,ind)} /></td>
      <td>
        <Button color="primary" type="button" disabled={updateDisabled} onClick={() => 
          this.props.updateEmp(ind,'update',{
            id: this.state[`id_${ind}`], name: this.state[`name_${ind}`], zipcode: this.state[`zipcode_${ind}`]
          } )}>Update
        </Button>|
        <Button color="primary" type="button" onClick={() => this.props.updateEmp(ind,'cancel',this.state)}>
          Cancel</Button>
      </td>
    </tr>
  }

  render(){
    // console.log("Employee Renders")
    var emp_td = [];
    this.props.employees_arr.map((emp,ind) => {
      if(emp.is_editable){
        return emp_td.push(
          this.editable_tr(ind,emp)
        )    
      }
      else
      {
        return emp_td.push(
          <tr key={ind}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.zipcode}</td>
            <td>
              <Button color="primary" type="button" onClick={() => this.props.EditEmp(ind)}>Edit</Button>|
              <Button color="primary" type="button" onClick={() => this.props.deleteEmp(ind)}>Delete</Button>
            </td>
          </tr>
        )
      }
    });
    return(
      <div>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Zip Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {emp_td}
          </tbody>
        </Table>      
      </div>
    )
  }
}

