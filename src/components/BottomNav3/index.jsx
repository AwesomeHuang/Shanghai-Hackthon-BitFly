import React from 'react'
import { Link } from 'react-router-dom'
import './bottomNav.css'

const BottomNav3 = ({ active, showAdd = true }) => (
  <div className="bottomnav__bar--container">

<div className="bottomnav__navs--container">
<Link to="/" className={active === 'home' ? 'active' : ''}>
<div className="viewmoney">
查看钱包
</div>
</Link>
<Link to="/detail" className={active === 'detail' ? 'active' : ''}>
<div className="setflag">
我也立flag
</div>
</Link>
</div>
  </div>
)

export default BottomNav3
