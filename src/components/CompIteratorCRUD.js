import React,{Component} from 'react';
import {Employees} from './Employees';
import faker from 'faker';
import { Button } from 'reactstrap';

//README: It shows flow of child to parent component with component iterations with CRUD array operations

export class CompIteratorCRUD extends Component{
  constructor(){
    super();
    var employees_collections = [];
    for (let i=0;i<=5;i++){
      employees_collections.push(
        {
          id: Math.round(faker.random.number(2000)), 
          name: faker.name.findName(), 
          zipcode: faker.address.zipCode(),
          is_editable: false
        }        
      );
    }
    this.state = {employees: employees_collections}
    this.deleteEmpParent = this.deleteEmpParent.bind(this); 
    this.EditEmpParent = this.EditEmpParent.bind(this); 
    //this is mandatory else it will give childrens props as a this
  }

  addEmp(){
    this.setState({employees: 
      [...this.state.employees, 
        {
          id: Math.round(faker.random.number(20)), 
          name: faker.name.findName(), 
          zipcode: faker.address.zipCode(),
          is_editable: false
        }
      ]});
  }

  EditEmpParent = (index) => {
    let temp_emps = this.state.employees;
    temp_emps[index].is_editable = true;
    this.setState({employees: temp_emps});
  }

  updateEmp = (index,action,...args) => {
    // console.log(args[0][`id_${index}`])
    var emp_obj = Object.keys(args[0]).reduce((acc, key) => 
      (args[0][key] === undefined || args[0][key] === null ? acc : {...acc, [key]: args[0][key]}), {});  //reduce function removes null & undefined values of keys
    let temp_emps = this.state.employees;
    temp_emps[index].is_editable = false;
    var is_valid = true;
    if (action === 'update') {
      if(typeof emp_obj.name != 'undefined' && !(/[a-zA-Z]+$/).test(emp_obj.name) ){
        alert("Only Letters are allowed");
        is_valid = false;
      }
      else if( (typeof emp_obj.id != 'undefined' && !(/[0-9]+$/).test(emp_obj.id) ) || (typeof emp_obj.zipcode != 'undefined' && !emp_obj.zipcode.match(/[0-9]+$/) ) )
      {
        alert("Only numbers are allowed");
        is_valid = false;
      }
      if(is_valid) Object.assign(temp_emps[index],emp_obj);
    } //merged 2 objects
    this.setState({employees: temp_emps});    
  }

  deleteEmpParent(index){
    let temp_emps = this.state.employees;
    temp_emps.splice(index,1);
    this.setState({employees: temp_emps});
  }  

  render(){
    return(
      <div>
        <p>CRUD using Array</p>
        <Employees employees_arr={this.state.employees} deleteEmp={this.deleteEmpParent} 
          EditEmp={this.EditEmpParent} updateEmp={this.updateEmp} />
        <Button color="success" type="button" onClick={() => this.addEmp()}>Add New Emp</Button>
      </div>
    )
  }

}
