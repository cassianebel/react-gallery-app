import React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="butterflies">Butterflies</NavLink></li>
        <li><NavLink to="flowers">Flowers</NavLink></li>
        <li><NavLink to="frogs">Frogs</NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav