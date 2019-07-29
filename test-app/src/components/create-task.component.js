import React, { Component } from 'react';
import axios from 'axios';



//rest contiene todos los valores del state con excepción del error
const formValid = ({ errors, ...rest }) => {

    let valid = true;

    //Cuenta si hay errores en el objeto error
    Object.values(errors).forEach(val => {

        val.length > 0 && (valid = false)
    });

    //Valida que no queden campos vacios
    Object.values(rest).forEach(val => {
        val === "" && (valid = false);
    })

    return valid;
};
export default class Create extends Component {

    constructor(props) {
        super(props);

        this.onChangeTaskPriority = this.onChangeTaskPriority.bind(this);

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
                task_completed: false

            }
        }
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

            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => console.log(this.state));

    }


    onChangeTaskPriority = e => {
        e.preventDefault();
        this.setState({
            task_priority: e.target.value
        });
    }





    onSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {

            console.log(`
            
            --SUBMITTING--
            Task Description: ${this.state.task_description}
            Task Area: ${this.state.task_area}
            Task Priority: ${this.state.task_priority}
            Task Date: ${this.state.task_date}
            Task Completed: ${this.state.task_completed}
            Task Load: ${this.state.task_load}
            `
            )

            const newTask = {

                task_description: this.state.task_description,
                task_area: this.state.task_area,
                task_priority: this.state.task_priority,
                task_date: this.state.task_date,
                task_completed: this.state.task_completed

            }

            axios.post('http://localhost:4000/task/add', newTask)
                .then(res => console.log(res.data));

            this.setState({
                task_description: '',
                task_area: '',
                task_priority: '',
                task_date: '',
                task_completed: false,
                task_load: 1
            })

        }

        else {

            console.error(
                'FORM INVALID DISPLAY ERROR'


            )

            this.setState({
                task_load: 2
            })

        }

    }

    render() {

        const { errors } = this.state;

        return (
            <div className="" style={{ margin: 0, maxWidth: "100%" }}>
                <h3>Crear una nueva tarea</h3>
                <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                        <label>Descripción*:</label>
                        <input type="text"
                            name={"task_description"}
                            value={this.state.task_description}
                            className={errors.task_description.length > 0 ? "border border-danger form-control" : "form-control"}


                            style={{ marginTop: 3 }}
                            onChange={this.handleChange}
                        />
                        {errors.task_description.length > 0 && (
                            <p className="text-danger">{errors.task_description}</p>
                        )}


                    </div>
                    <div className="form-group">
                        <label>
                            Área encargada:

                            <select
                                className={errors.task_area.length > 0 ? "border border-danger form-control" : "form-control"}
                                value={this.state.task_area}
                                name="task_area"
                                onChange={this.handleChange}
                            >
                                <option value="">Seleccione</option>
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
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Crear Tarea" className="btn btn-primary" />
                        <p className={this.state.task_load === 1 ? "text-success" : "text-danger"}
                            role="alert">
                            {(() => {
                                switch (this.state.task_load) {

                                    case 1: return "Tarea guardada exitosamente"

                                    case 2: return "No se pudo guardar la tarea, verifique que los campos esten completos"


                                    default:
                                        break



                                }

                            })()}
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}