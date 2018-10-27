import React from 'react'
import Submit from '../../components/Submit'
import BottomNav from '../../components/BottomNav'
import './add.css'
import { contractAddress, transaction, simpleStoreContract } from '../../simpleStore'
import nervos from '../../nervos'

//var Nervos = require('@nervos/chain')

const timeFormatter = time => ('' + time).padStart(2, '0')

const submitTexts = {
	normal: '提交',
	submitting: '提交中',
	submitted: '提交成功',
}

class Add extends React.Component {
	state = {
		title: '',
		description: '',
		proof:'',
		deposit: 0.0,
		start: Date.parse(new Date()) / 1000,
		end: 0,
		time: new Date(),
		submitText: submitTexts.normal,
		errorText: '',
	}
	setTitle = e => {
		this.setState({ title: e.target.value })
	}
	setDescription = e => {
		this.setState({ description: e.target.value })
	}
	setProof = e => {
		this.setState({ proof: e.target.value })
	}
	setDeposit = e => {
		this.setState({ deposit: e.target.value })
	}
	setEnd = e => {
		this.setState({ end: e.target.value * 24 * 3600 +  this.state.start})
		console.log(this.state.end)
		console.log(typeof this.state.end)
	}
	handleSubmit = e => {
		//console.log(this.state)
		var flag = {
			title: this.state.title,
			description: this.state.description,
			proof: this.state.proof,
			deposit: +this.state.deposit,
			start: +this.state.start,
			end: +this.state.end
		}
		console.log(flag);
		console.log(nervos.appchain)
		//console.log(nervos.appchain.getAccounts());
		//console.log(nervos.appchain.getBalance());
		

		//console.log(window.neuron.getAccount());
		const { time, title } = this.state
		nervos.appchain
			.getBlockNumber()
			.then(current => {
				const tx = {
					...transaction,
					//from: window.neuron.getAccount(),
					from: nervos.appchain.defaultAccount,
					quota: 999999999,
					value: parseFloat(flag.deposit),
					validUntilBlock: +current + 88,
				}
				this.setState({
					submitText: submitTexts.submitting,
				})
				console.log(typeof flag.deposit)
				return simpleStoreContract.methods.addFlag(flag.title, flag.description, flag.proof, flag.deposit, flag.end, flag.start).send(tx)
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
					this.setState({ submitText: submitTexts.submitted })
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
		const { time, text, submitText, errorText } = this.state
		return (
			<div className="add__content--container">
			<div className="add__content--prompt">
			<span>一句话描述你的Flag</span>
			</div>
			<textarea
			cols="32"
			rows="1"
			className="add__content--textarea"
			placeholder="我六级要过600！"
			onChange={this.setTitle}
			value={text}
			/>
			<div className="add__content--prompt">
			<span>详细描述你的Flag</span>
			</div>
			<textarea
			cols="32"
			rows="5"
			className="add__content--textarea"
			placeholder="激励自己学习英语，备考六级..."
			onChange={this.setDescription}
			value={text}
			/>
			<div className="add__content--prompt">
			<span>如何证明完成</span>
			</div>
			<textarea
			cols="32"
			rows="5"
			className="add__content--textarea"
			placeholder="六级证书..."
			onChange={this.setProof}
			value={text}
			/>

			<div className="add__content--prompt">
			<span>时限(天)</span>
			</div>
			<textarea
			cols="32"
			rows="1"
			className="add__content--textarea"
			placeholder="10"
			onChange={this.setEnd}
			value={text}
			/>

			<div className="add__content--prompt">
			<span>激励金(ETH)</span>
			</div>
			<textarea
			cols="32"
			rows="1"
			className="add__content--textarea"
			placeholder="0.1"
			onChange={this.setDeposit}
			value={text}
			/>
			<Submit text={submitText} onClick={this.handleSubmit} disabled={submitText !== submitTexts.normal} />
			{errorText && <span className="warning">{errorText}</span>}
			<BottomNav showAdd={false} />
			</div>
		)
	}
}
export default Add
