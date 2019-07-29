import React, { Component } from 'react';
import axios from 'axios';

const formValid = ({ errors, ...rest }) => {

    let valid = true;

    //Cuenta si hay errores en el objeto
    Object.values(errors).forEach(val => {

        val.length > 0 && (valid = false)
    });

    //Valida que no queden campos vacios
    Object.values(rest).forEach(val => {
        val === "" && (valid = false);
    })

    return valid;
};

export default class Update extends Component {

    constructor(props) {

        super(props);


        this.onChangeTaskPriority = this.onChangeTaskPriority.bind(this);
        this.onChangeTaskCompleted = this.onChangeTaskCompleted.bind(this);


        this.state = {
            task_description: '',
            task_area: '',
            task_priority: '',
            task_date: '',
            task_load: 0,
            task_completed: false,
            errors: {

                task_description: '',
                task_area: '',
                task_priority: '',
                task_date: '',
                task_load: 0,
                task_completed: false,


            }
        }
    }

    componentDidMount() {

        axios.get('http://localhost:4000/task/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    task_description: response.data.task_description,
                    task_area: response.data.task_area,
                    task_priority: response.data.task_priority,
                    task_date: response.data.task_date,
                    task_completed: response.data.task_completed,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;

        switch (name) {

            case 'task_description':
                errors.task_description = value.length < 5
                    ? 'Minimo 5 caracteres requeridos'
                    : ''

                break;

            case 'task_date':
                errors.task_date = value.length < 5
                    ? 'Fecha requerida'
                    : ''

                break;

            case 'task_area':
                errors.task_date = value.length < 2
                    ? 'Fecha requerida'
                    : ''

                break;

            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => console.log(this.state));

    }

    onChangeTaskPriority(e) {
        this.setState({
            task_priority: e.target.value,

        })
    }



    onChangeTaskCompleted(e) {
        this.setState({
            task_completed: !this.state.task_completed,

        })
    }

    onSubmit = e => {

        e.preventDefault();
        if (formValid(this.state)) {

            const obj = {
                task_description: this.state.task_description,
                task_area: this.state.task_area,
                task_priority: this.state.task_priority,
                task_date: this.state.task_date,
                task_completed: this.state.task_completed
            };

            axios.post('http://localhost:4000/task/update/' + this.props.match.params.id, obj)
                .then(res => console.log(res.data));

            this.props.history.push('/');

        }

        else {
            this.setState({
                task_load: 2
            })
        }


    }



    render() {
        const { errors } = this.state;
        return (
            <div>

                <h3>Actualizar</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">

                        <label>Descripción: </label>
                        <input type="text"
                            className={errors.task_description.length > 0 ? "border border-danger form-control" : "form-control"}
                            value={this.state.task_description}
                            name="task_description"
                            onChange={this.handleChange}
                        ></input>
                        {errors.task_description.length > 0 && (
                            <p className="text-danger">{errors.task_description}</p>
                        )}

                    </div>

                    <div className="form-group">

                        <label>Area:
                        <select
                                className="form-control"
                                value={this.state.task_area}
                                name="task_area"
                                onChange={this.handleChange}
                            >
                                <option value="TI">TI</option>
                                <option value="Infraestrucura">Infraestrucura</option>
                                <option value="Tesorería">Tesorería</option>
                                <option value="Mercadeo">Mercadeo </option>
                                <option value="Compras">Compras</option>
                            </select>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Fecha:
                        <input
                                type="date"
                                className="form-control"
                                value={this.state.task_date}
                                name="task_date"
                                onChange={this.handleChange}


                            >
                            </input>
                            {errors.task_date.length > 0 && (
                                <p className="text-danger">{errors.task_date}</p>
                            )}
                        </label>

                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.task_priority === 'Low'}
                                onChange={this.onChangeTaskPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.task_priority === 'Medium'}
                                onChange={this.onChangeTaskPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.task_priority === 'High'}
                                onChange={this.onChangeTaskPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox"
                                className="form-check-input"
                                id="completedCheckbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTaskCompleted}
                                checked={this.state.task_completed}
                                value={this.state.task_completed}>
                            </input>

                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completado
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Actualizar" className="btn btn-primary"></input>
                            <p className={this.state.task_load === 1 ? "text-success" : "text-danger"}
                                role="alert">
                                {(() => {
                                   if (this.state.task_load ===2){

                                    return "No se pudo actualizar el registro, compruebe los campos";
                                   }
                                })()}
                            </p>
                        </div>
                    </div>
                </form>
            </div >

        )

    }

}