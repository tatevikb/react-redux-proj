import React from 'react';
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from './components/Navbar';
import Home from "./components/Home";
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar/>
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/add" component={() => <CreateUser />} />
      <Route exact path="/edit/:id" component={() => <UpdateUser />} />
    </div>
  );
}

export default App;
