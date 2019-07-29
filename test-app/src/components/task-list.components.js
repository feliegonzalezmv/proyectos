import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Task = props => (
    <tr>
        <td className={props.task.task_completed ? 'completed' : ''}>{props.task.task_description}</td>
        <td className={props.task.task_completed ? 'completed' : ''}>{props.task.task_area}</td>
        <td className={props.task.task_completed ? 'completed' : ''}>{props.task.task_priority}</td>
        <td className={props.task.task_completed ? 'completed' : ''}>{props.task.task_date}</td>
         

        <td style={{margin: 0}}> 
            <Link to={"/edit/" + props.task._id} className="btn btn-warning" style={{marginRight: 10}}>Editar</Link>
            <Link to={"/delete/" + props.task._id} className="btn btn-danger">Eliminar</Link>

        </td>
    </tr>


)


export default class Lista extends Component {

    constructor(props) {

        super(props);

        this.state = { tasks: [] };
    }

    componentDidMount() {

        axios.get('http://localhost:4000/task/')
            .then(response => {

                this.setState({ tasks: response.data });
            })
            .catch(function (error) {

                console.log(error);
            })
    }

    componentDidUpdate() {

        axios.get('http://localhost:4000/task/')
        .then(response => {

            this.setState({ task: response.data });
        })
        .catch(function (error) {

            console.log(error);
        })
    }

   

    taskList() {  

        return this.state.tasks.map(function (currentTask, i) {
            return <Task task={currentTask} key={i} />;
        });
    }''

    render() {

        return (
            <div>

                <h3>Lista</h3>
                <table className="table table-striped" style={{ marginTop: 20, border: "1px solid #e1e1e1" }}>

                    <thead>
                        <tr>
                            <th>Descripcion</th>
                            <th>Responsable</th>
                            <th>Prioridad</th>
                            <th>Fecha</th>
                            <th>Acciones</th>

                        </tr>
                    </thead>

                    <tbody>
                        {this.taskList()}
                    </tbody>

                </table>

            </div>

        )


    }

}