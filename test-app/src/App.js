import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from "./components/create-task.component";
import Update from "./components/edit-task.component";
import Lista from "./components/task-list.components";
import Delete from "./components/delete-task.component";
import logo from "./logo.png";



function App() {
  return (

    <Router>
      <div className="container" >

        <nav className="navbar navbar-expand-lg navbar-light bg-light">

          <a className="navbar-brand" href="/">

            <img src={logo} width="70%" height="50%" alt="logo" />

          </a>

          <div className="collapse navbar-collapse">

            <ul className="navbar-nav mr-auto">
              <li className="navbar-item align-self-center">

                <Link to="/" className="nav-link">Lista</Link>

              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Crear</Link>
              </li>

            </ul>

          </div>

        </nav>
        <Route path="/" exact component={Lista}></Route>
        <Route path="/edit/:id" component={Update}></Route>
        <Route path="/delete/:id" component={Delete}></Route>
        <Route path="/create" component={Create}></Route>
      </div>

    </Router>
  );
}

export default App;
