import React, { Component } from 'react';
import './App.css';
import MyComponent from './cmpnt1.js';
import { BrowserRouter } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/index.jsx'
import { contractAddress, transaction, simpleStoreContract } from '../../simpleStore'
import { Link  } from 'react-router-dom'

import nervos from '../../nervos'

class App extends Component {
	// var flag_items = []
	state = {
		title:'',
		people:0,
		eth:0,
		time_left:0,
		flag_items: []
	}
	componentDidMount(){
		setTimeout(this.load, 3000)
	}

	load=()=>{
			let a = Promise.resolve(simpleStoreContract.methods.getTotalList().call())
		let b = a.then(v => {
			if(v.length <= 0){
				return;
			}
			let flags = v
			let flag_items = []
			console.log(flags)
			Promise.all(flags.map(flag => {
				console.log(flag)
				return Promise.all([
					//simpleStoreContract.methods.getTitle(Number(flag)).call(),
					  //simpleStoreContract.methods.getParticipantNumber(Number(flag)).call(),
					  //simpleStoreContract.methods.getDepositTotal(Number(flag)).call(),
					  //simpleStoreContract.methods.getDdl(Number(flag)).call(),
					simpleStoreContract.methods.getAFlag(+flag).call({
						from: window.nervos.appchain.defaultAccount
						// from: '0x18ccf2f125e566e21b521f58cf392ab52959983f'
					})
				])
			})).then(value => {
				// console.log('value:')
				console.log(value);
				let flags = []
				for(var i = 0; i < value.length; i++){
					let flag = {
						title:'',
						people:0,
						eth:0,
						time_left:0
					};
					flag.title = value[i][0][0];
					flag.people = value[i][0][1],
					flag.eth = value[i][0][2],
					flag.time_left = Math.round((+value[i][0][3] - Date.parse(new Date()) / 1000) / 3600)
					console.log('hhh')
					console.log(flag)
					flags.push(<MyComponent flag={flag} onClick={this.handleClick}/>)
				}
				this.setState({flag_items: flags})
			})
		})
	}

	render() {
		const {flag_items} = this.state
		return (
			<div className="App">
			<head className="App-header">
				<div className="game" >
			</div>
			<div className="flag-home">
			My Flags
			</div>
			</head>

			<Link to='/detail'>
				{flag_items}
			</Link>
			<BottomNav />
			</div>
		);
	}
}

export default App;

