import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link, useParams } from 'react-router-dom';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}


class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveorUpdateEmployee = this.saveorUpdateEmployee.bind(this);
    }

    componentDidMount() {

        if (this.state.id === '_add') {
            return
        }
        else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                });
            });
        }
    }



    saveorUpdateEmployee() {
        // e.preventDefault();
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
        console.log('employee => ' + JSON.stringify(employee));

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/getEmployees');
            });
        }
        else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push("/getEmployees");
            });
        }


    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeEmailIdHandler = (event) => {
        this.setState({ emailId: event.target.value });

    }

    cancel() {
        this.props.history.push('/getEmployees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>;

        }
        else{
            return <h3 className="text-center">Update Employee</h3>;
        }
    }

    render() {
        return (
            <div style={{paddingTop:"50px"}}>
                <div className="container" style={{margin:"50px"}}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">

                                <form>
                                    <div className="form-group">
                                        <label>FirstName: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}></input>

                                    </div>

                                    <div className="form-group">
                                        <label>LastName: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}></input>

                                    </div>

                                    <div className="form-group">
                                        <label>Email Address: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailIdHandler}></input>

                                    </div>

                                    <Link to={'/getEmployees'}>
                                        <button className="btn btn-success" onClick={this.saveorUpdateEmployee}>Save</button>
                                    </Link>

                                    <Link to={'/getEmployees'}>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ margin: "10px" }}>Cancel</button>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateEmployeeComponent);