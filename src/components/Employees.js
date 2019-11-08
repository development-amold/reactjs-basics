import React, {Component} from 'react';
import './Employees.css';

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
      <td><input type="text" style={{border: (this.state[`id_${ind}_valid`] === false)? '4px solid red':'none' }} name={`id_${ind}`} defaultValue={emp.id} onChange={(event) => this.updateInput(event,ind)} /></td>
      <td><input type="text" name={`name_${ind}`} style={{border: (this.state[`name_${ind}_valid`] === false)? '4px solid red':'none' }} defaultValue={emp.name} onChange={(event) => this.updateInput(event,ind)} /></td>
      <td><input type="text" name={`zipcode_${ind}`} style={{border: (this.state[`zip_${ind}_valid`] === false)? '4px solid red':'none' }} defaultValue={emp.zipcode} onChange={(event) => this.updateInput(event,ind)} /></td>
      <td>
        <button type="button" disabled={updateDisabled} onClick={() => 
          this.props.updateEmp(ind,'update',{
            id: this.state[`id_${ind}`], name: this.state[`name_${ind}`], zipcode: this.state[`zipcode_${ind}`]
          } )}>Update
        </button>|
        <button type="button" onClick={() => this.props.updateEmp(ind,'cancel',this.state)}>Cancel</button>
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
            <td><button type="button" onClick={() => this.props.EditEmp(ind)}>Edit</button>|
            <button type="button" onClick={() => this.props.deleteEmp(ind)}>Delete</button></td>
          </tr>
        )
      }
    });
    return(
      <div>
        <table>
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
        </table>      
      </div>
    )
  }
}

