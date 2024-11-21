import React from 'react'
import { NavLink } from 'react-router-dom'
const HeaderComponent = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
        &nbsp;&nbsp;&nbsp;Employee Management System
        </a>
         <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <NavLink className='nav-link' to="/employees">Employees</NavLink>
        </li>
        <li class="nav-item">
        <NavLink className='nav-link' to="/departments">Deparments</NavLink>
        </li>
      </ul>
    </div>
        </nav>
    </div>
  )
}
export default HeaderComponent