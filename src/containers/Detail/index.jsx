import React from 'react'
import nervos from '../../nervos'
import BottomNav2 from '../../components/BottomNav2'
import {Link} from 'react-router-dom'
import { contractAddress, transaction, simpleStoreContract  } from '../../simpleStore'
require('./detail.css')



class Detail extends React.Component {
	state = {
		flag:{}
	}
	// title, description, proof, people, eth, time_left

	render(){
		const {amount} = this.state;
		return(
			<div>
			<div className="head">
			<Link to="/">
			<div className="back">
			返回
			</div>
			</Link>
			<div className="halfprofile">
			<div className="show__timeline"></div>
			</div>
			<div className="halflag">
			</div>
			<div className="profile">
			</div>
			<div className="behindhalfflag">
			flag：六级过500
			</div>
			<div className="halfwd1">
			详述flag及动机：激励自己学习英语，备考六级…<br/>如何证明完成：拍摄12.30六级证书
			</div>
			<div className="flow">
			<div className="litl">
			</div>
			<div className="litt">
			</div>
			<div className="bitcoin">
			</div>
			<div className="word1">
			参与人数：6
			</div>
			<div className="word2">
			剩236小时
			</div>
			<div className="word3">
			奖池ETH 0.3
			</div>
			</div>
			<div className="process1">
			<div className="p1p">
			2018/10/28
			</div>
			<div className="flag">
			</div>
			<div className="flagword">
			立了flag!
			</div>
			</div>

			<div className="process2">
			<div className="p1p" style={{top:"12px",left:"88px"}}>
			2018/10/28
			</div>
			<div className="text">
			</div>
			</div>

			<div className="process3">
			<div className="p1p">
			2018/11/30
			</div>
			<div className="flag">
			</div>
			<div className="flagword">
			flag截止日期
			</div>
			</div>
			
			</div>
			<BottomNav2 />
			</div>
		);
	}
}
export default Detail
