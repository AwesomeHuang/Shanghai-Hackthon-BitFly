import React, { Component } from 'react';
import './App.css';
import MyComponent from './cmpnt1.js'
import { BrowserRouter } from 'react-router-dom'
import BottomNav from '../../components/BottomNav/index.jsx'
import { contractAddress, transaction, simpleStoreContract  } from '../../simpleStore'

import nervos from '../../nervos'

class App extends Component {

	handleClick = e => {
		// redirect to flag details page

	}

	let flag_items = []
	let flags = simpleStoreContract.methods.getTotalFlags();
	for(let i = 0; i < flags.length; i++){
		let flag = {
			title = '',
			people = 0,
			eth = 0,
			time_left = 0
		}
		flag.title = simpleStoreContract.methods.getTitle(flags[i])
		flags.people = simpleStoreContract.methods.getParticipantNumber(flags[i])
		flags.eth = simpleStoreContract.methods.getDepositTotal(flags[i])
		let time_left = simpleStoreContract.methods.getDdl(flags[i]) - Date.parse(new Date)
		flags.time_left = Math.round(time_left / 3600)
		flag_items.push(<MyComponent flag = {flag}, onClick = {this.handleClick}>)
	}

	render() {
		return (
			<div  className="App">
			<head className="App-header">
			<div className="game">
			</div>
			<div className="flag">
			立个flag
			</div>
			</head>
			
			{flag_items}

			<BottomNav />
		);
	}
}
export default App;
