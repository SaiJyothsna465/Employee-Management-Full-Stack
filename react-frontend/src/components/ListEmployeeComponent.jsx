import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            employees: []
        }
        this.addEmployee=this.addEmployee.bind(this);
        this.editEmployee=this.editEmployee.bind(this);
        this.deleteEmployee=this.deleteEmployee.bind(this);
        this.viewEmployee=this.viewEmployee.bind(this);
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees: this.state.employees.filter(employee=>employee.id !== id)});
        });
    }
    
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }


    componentDidMount(){
        EmployeeService.getEmployees().then((res) =>{
            this.setState({employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <br></br>
                <h2 className="text-center" style={{marginTop:"30px"}}>Employees List</h2>
                <div className="row">
                    <Link to="/add-employee/_add">
                        <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                    </Link>
                    
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>


                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                            <Link to={`/add-employee/${employee.id}`}>
                                                <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                            </Link>

                                            <Link to={'/getEmployees'}>
                                                <button style={{marginLeft:"10px"}} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                            </Link>

                                            <Link to={`/view-employee/${employee.id}`}>
                                                <button style={{marginLeft:"10px"}} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        );
    }
}

export default ListEmployeeComponent;