import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStopwatch, faCalendarAlt, faUser, faRunning, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faStopwatch, faCalendarAlt, faUser, faRunning, faTrashAlt, faEdit);

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <button type="button" to={"/edit/"+props.exercise._id} className="btn btn-success">edit</button>
      <button type="button" onClick={() => { props.deleteExercise(props.exercise._id) }} className="btn btn-danger">Delete</button>
    </td>
  </tr>

)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User <FontAwesomeIcon icon="user" /></th>
              <th>Workout <FontAwesomeIcon icon="running" /></th>
              <th>Duration <FontAwesomeIcon icon="stopwatch" /></th>
              <th>Date <FontAwesomeIcon icon="calendar-alt" /></th>
              <th>Actions <FontAwesomeIcon icon="edit" style={{marginRight: '5px'}} /><FontAwesomeIcon icon="trash-alt" /></th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}