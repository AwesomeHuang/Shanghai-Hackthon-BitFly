import React from 'react'
import { Link } from 'react-router-dom'
import './bottomNav.css'

const BottomNav = ({ active, showAdd = true }) => (
  <div className="bottomnav__bar--container">
    <div
      className="bottomnav__button--add"
      style={{
        display: showAdd ? 'flex' : 'none',
      }}
    >
      <Link to="/add">
      	  <div className="picsadd">
	  </div>
      </Link>
    </div>

    <div className="bottomnav__navs--container">
      <Link to="/" className={active === 'home' ? 'active' : ''}>
      	      <div className="picshome">
	      </div>
      </Link>
      <Link to="/show" className={active === 'detail' ? 'active' : ''}>
	      <div className="picsmine">
	      </div>
      </Link>
    </div>
  </div>
)

export default BottomNav
