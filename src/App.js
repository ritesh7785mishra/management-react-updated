import React from 'react'
import Login from './components/Login.js'
import Home from './components/Home'
import './App.css'
import Edit from './components/Edit.js'
import Admin from './components/Admin'

import {BrowserRouter as Router,Routes, Route} from "react-router-dom"

function App() {
  return (
    <div>
      <Router>
      <Routes>
          <Route exact path="/" element ={
            <Login/>
          }/>
          <Route exact path="/edit" element ={
            <Edit/>
          }/>
          <Route exact path="/home" element ={
            <Home/>
          }/>
          <Route exact path="/admin" element ={
            <Admin/>
          }/>

      </Routes>
      </Router>
        
    </div>
  )
}

export default App