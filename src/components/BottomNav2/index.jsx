import React from 'react'
import { Link } from 'react-router-dom'
import './bottomNav.css'
import { contractAddress, transaction, simpleStoreContract  } from '../../simpleStore'
import nervos from '../../nervos'

class BottomNav2 extends React.Component {
	state = {
		amount:0,
		side:0
	}

	setAmount = e => { 
		this.setState({amount: +e.target.value})
	}
	setZeroAndSend = e => {
		var side = 0;
		var participant = {
			time: Date.parse(new Date()) / 1000,
			amount: this.state.amount,
			yesorno: 0
		}

		nervos.appchain
		.getBlockNumber()
		.then(current => {
				const tx = {
						...transaction,
						//from: window.neuron.getAccount(),
						from: nervos.appchain.defaultAccount,
						quota: 999999999,
						value: parseFloat(participant.amount),
						validUntilBlock: +current + 88,
				}
				return simpleStoreContract.methods.addParticipant(participant.time, participant.amount, participant.yesorno).send(tx)
		})
		.then(res => {
				console.log(res)
				if (res.hash) {
						return nervos.listeners.listenToTransactionReceipt(res.hash)
				} else {
						throw new Error('No Transaction Hash Received')
				}
		})
		.then(receipt => {
				if (!receipt.errorMessage) {
						//this.setState({ submitText: submitTexts.submitted })
				} else {
						throw new Error(receipt.errorMessage)
				}
		})
		.catch(err => {
				console.log(err);
				this.setState({ errorText: JSON.stringify(err) })
		})	
	}
	setOneAndSend = e => {
		var side = 0;
		var participant = {
			time: Date.parse(new Date()) / 1000,
			amount: this.state.amount,
			yesorno: 1
		}

		nervos.appchain
		.getBlockNumber()
		.then(current => {
				const tx = {
						...transaction,
						//from: window.neuron.getAccount(),
						from: nervos.appchain.defaultAccount,
						quota: 999999999,
						value: parseFloat(participant.amount),
						validUntilBlock: +current + 88,
				}
				return simpleStoreContract.methods.addParticipant(participant.time, participant.amount, participant.yesorno).send(tx)
		})
		.then(res => {
				console.log(res)
				if (res.hash) {
						return nervos.listeners.listenToTransactionReceipt(res.hash)
				} else {
						throw new Error('No Transaction Hash Received')
				}
		})
		.then(receipt => {
				if (!receipt.errorMessage) {
						//this.setState({ submitText: submitTexts.submitted })
				} else {
						throw new Error(receipt.errorMessage)
				}
		})
		.catch(err => {
				console.log(err);
				this.setState({ errorText: JSON.stringify(err) })
		})	
	}

	render() {
		const {amount, side} = this.state;
		return(
			<div className="bottomnav__bar--container">
			<textarea
			cols="32"
			rows="1"
			className="add__content--textarea"
			placeholder="输入押注金额"
			onChange = {this.setAmount}
			value = {amount}
			/>


			<div className="bottomnav__navs--container">
			<div className="frame">
			<div className="bad" onClick = {this.setZeroAndSend}>
			</div>
			</div>
			<div className="frame" style={{left:"45px"}}>
			<div className="good" onClick = {this.setOneAndSend}>
			</div>
			</div>
			</div>
			</div>
		)
	}
}

export default BottomNav2
