import React, { Component } from 'react';
import './App.css';

import { contractAddress, transaction, simpleStoreContract  } from '../../simpleStore'

import nervos from '../../nervos'

class MyComponent(flag, onClick) extends Component {
   /* flag = {*/
		//title = '',
		//people = 0,
		//eth = 0,
		//time_left = 0
	/*}*/
	render(){
		return (
			<div className="target">

			<div className="picspr">
			</div>

			<div className="tword1">
			{flag.title}
			</div>
			<div className="picsp">
			</div>
			<div className="tword2">
			参与人数：{flag.people}
			</div>
			<div className="picst">
			</div>
			<div className="tword2" style={{left:"226px",width:"77px"}}>	    
			剩{flag.time_left}小时
			</div>
			<div className="picsm">
			</div>
			<div className="twordmoney">	    
			ETH {flag.eth}
			</div>
			</div>
		);
	};
}

export default MyComponent;
