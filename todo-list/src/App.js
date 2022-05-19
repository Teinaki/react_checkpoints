import React from 'react';
import './App.css';
import Sign from './components/Sign';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserContext } from "./Auth";
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import Groups from './components/Groups';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const { user, loading } = useUserContext();

  return (
    <Router>
        <Routes>
          <Route exact path="/login" element={loading ? <h2>Loading...</h2> : <> {user ? <Navigate to="/" /> : <Sign />} </>}/>
          <Route exact path="/" element={user ? <><Navbar /> <TodoList /></> : <Navigate to="/login" />}/>
          <Route exact path="/groups" element={<Groups />}/>
        </Routes>
    </Router>
  );
}

export default App;