import React from 'react'
import nervos from '../../nervos'
import BottomNav3 from '../../components/BottomNav3'
import { simpleStoreContract } from '../../simpleStore'
require('./end.css')

class End extends React.Component {
render(){
return(
<div>
<div className="head">
<div className="whos">
Bitfly妹的flag
</div>
<div className="halfprofile">
</div>
<div className="profile">
</div>
<div className="halfwdend">
恭喜你为 Bitfly妹的flag 点赞获得胜利啦!<br/>你共赢得奖金ETH0.13!
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
剩14天24小时
</div>
<div className="word3">
奖金池ETH0.3(原始ETH0.1)
</div>
</div>
<div className="process1">
<div className="p1p">
2018/10/30
</div>
<div className="flag">
</div>
<div className="flagword">
立了flag!
</div>
</div>

<div className="process2">
<div className="p1p" style={{top:"12px",left:"88px"}}>
2018/10/30
</div>
<div className="text">
</div>
<div className="flagword" style={{top:"33px",left:"88px"}}>
模拟卷阅读全对！
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
<BottomNav3 />
</div>

);
}
}
export default End
