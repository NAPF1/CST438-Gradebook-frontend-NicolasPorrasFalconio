import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'

class newAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {assignmentName: "", dueDate: "", courseId: ""};
        this.handleChange = this.handleChange.bind(this); // From react.js
        this.handleSubmit = this.handleSubmit.bind(this); // From react.js
    }

    // Lets user edit state of assignment (from react.js forms)
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name + ": " + value);
    }

    // Saves the new assignment 
    handleSubmit = (event) => {
        console.log("newAssignment.handleSubmit");
        const token = Cookies.get('XSRF-TOKEN');

        fetch(`${SERVER_URL}/course/${this.state.courseId}/assignment`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',
                       'X-XSRF-TOKEN': token }, 
            body: JSON.stringify({
                assignmentName: this.state.assignmentName,
                dueDate: this.state.dueDate,
                courseId: this.state.courseId })
        }).then(res => {
            if (res.ok) {
                toast.success("Assignment created.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.setState({assignmentName: "", dueDate: "", courseId: ""})
                // Go back to assignment.js?
            } 
            else {
                toast.error("Unable to add assignment", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        }).catch(err => {
            toast.error("Unable to add assignment", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
        });
    }

    render() {          
        return(
            // Need handleChange because otherwise it wont let me change the state of the three params******
            <div align="center" >
                <h3>New Assignment:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Name: </label>
                    <input type="text" name="assignmentName" value={this.state.assignmentName} onChange={this.handleChange}></input>
                    <br></br><br></br>
                    <label>Due Date: </label>
                    <input type="text"  name="dueDate" value={this.state.dueDate} onChange={this.handleChange}></input>
                    <br></br><br></br>
                    <label>Course Id: </label>
                    <input type="text"  name="courseId" value={this.state.courseId} onChange={this.handleChange}></input>
                    <br></br><br></br>
                    <input type='submit' value='Submit'></input>
                </form>
                <ToastContainer autoClose={1500} />   
            </div>
        ); 
    };
}

export default newAssignment;