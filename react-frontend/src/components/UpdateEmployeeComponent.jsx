import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);

    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({
                firstName: employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId
            });
        });
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

    updateEmployee() {
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
        console.log('employee => ' + JSON.stringify(employee));

        EmployeeService.updateEmployee(employee, this.state.id).then(res => {
            this.props.history.push("/getEmployees");
        });
    }

    cancel() {
        this.props.history.push('/getEmployees');
    }

    render() {
        return (
            <div className='row'>

                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Update Employee</h3>
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <label> First Name:</label>
                                <input placeholder='Enter First Name' name='firstName' className='form-control'
                                    value={this.state.firstName} onChange={this.changeFirstNameHandler}></input>
                            </div>
                            <div className='form-group'>
                                <label> Last Name:</label>
                                <input placeholder='Enter last Name' name='lastName' className='form-control'
                                    value={this.state.lastName} onChange={this.changeLastNameHandler}></input>
                            </div>
                            <div className='form-group'>
                                <label>Email Id:</label>
                                <input placeholder='Enter email Id' name='emailId' className='form-control'
                                    value={this.state.emailId} onChange={this.changeEmailIdHandler}></input>
                            </div>
                            <div>
                                <Link to="/">
                                    <button className='btn btn-success' onClick={this.updateEmployee.bind(this)}>Update</button>
                                </Link >
                                <Link to="/getEmployees">
                                    <button className='btn btn-danger' onClick={() => this.cancel} style={{ margin: '10px' }}> cancel</button>
                                </Link>
                            </div>
                        </form>

                    </div>

                </div>

            </div>
        );
    }
}

export default withRouter(UpdateEmployeeComponent);