import React, { Component } from 'react';
import axios from 'axios';

export default class Delete extends Component {

    constructor(props) {

        super(props);

        this.onYes = this.onYes.bind(this);
        this.onNo = this.onNo.bind(this);

        this.state = {

            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    onYes(e) {

        e.preventDefault();


        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/task/delete/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');

    }

    onNo(e) {

        e.preventDefault();
        this.props.history.push('/');

    }

    render() {

        return (

            <div>

                <h3>Eliminar</h3>


                <p> ¿Esta seguro que desea elminar el registro?</p>


                <div className="form-group">
                    <button onClick={this.onYes} className="btn btn-outline-secondary" style={{ marginRight: 10 }}>Si</button>

                    <button onClick={this.onNo} className="btn btn-outline-secondary">No</button>

                </div>



            </div>
        )
    }

}

