import './index.less'
import getMsg from './data'
import Images from '../images'
import { plus } from "@function/Function";
import { isLogin } from "@function/wxFunc";
import http from "@function/ActHttp";
import { share } from "../index";

import React, { Component } from 'react'
import { Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';

const apis = {
    // 查询进度接口
    getStep: '/activity/checkIsTakePartIn',
    // 获取中奖信息
    getCode: '/activity/cjh5/getAwardCodeH5'
}

const { bg5, logo1, gongxi, quan, erweima } = Images

export const activityId = 4

export const checkStep = cb => {
    const pageUrls = ['index', 'prize', 'form', 'suc']
    isLogin(userInfo => {
        const { id } = userInfo
        http.post(apis.getStep, {
            activityId,
            userId: id
        }).then(stepInfo => {
            // const { endTime } = stepInfo
            // const nowTime = Date.parse(new Date())
            // if (endTime < nowTime) {
            //     return Toast.fail('活动已结束', 3, () => window.location.replace('/'))
            // } else {
            //     setTimeout(() => {
            //         Toast.fail('活动已结束', 3, () => window.location.replace('/'))
            //     }, endTime - nowTime)
            // }
            // 地址
            const { pathname } = window.location
            for (let i in pageUrls) {
                // 确认步骤，页面不对应则跳转，对应则执行回调
                if (!stepInfo[`isStep${i - 0 + 1}`]) {
                    const url = pageUrls[i]
                    if (pathname.indexOf(url) === -1) {
                        window.location.replace(`/newyear/${url}`)
                        break
                    } else {
                        typeof cb === 'function' && cb(stepInfo, userInfo)
                        break
                    }
                }
            }
        })
    }, '/newyear/index')
}

class NewYearSuc extends Component {
    constructor() {
        super()
        this.state = {
            show: false,
            redeemcode: '',
            prizeName: '',
            left: 0
        }
        this.timeId = 0;
        this.msgRef = ref => this.msgList = ref;
    }

    componentWillMount() {
        plus.rem2();
        // 查询获奖信息
        checkStep(this.getPrizeInfo)
    }

    getPrizeInfo = (stepInfo, userInfo) => {
        const { userNickname, id } = userInfo
        // 获取中奖信息
        http.get(apis.getCode, {
            activityId,
            userId: id
        }).then(res => {
            const { redeemcode, prizeName } = res
            // 分享初始化
            share(`${userNickname}居然抽到了${prizeName.join('+')},`)
            // 获取消息数据
            this.msgData = getMsg()
            // 填充
            this.setState({
                show: true,
                redeemcode, prizeName
            }, () => {
                this.setAnimate(this.msgList.clientWidth)
            })
        }).catch(err => {
            console.log(err);
        })
    }

    setAnimate(width) {
        clearInterval(this.timeId)
        this.timeId = setInterval(() => {
            let { left } = this.state
            this.setState({
                left: left < width / 2 ? left + 1 : 0
            })
        }, 15)
    }

    // 头部消息
    Msg = () => (
        <section className="msgWrap">
            <img src={Images.msgIcon} alt="" className="msgIcon"/>
            <div className="msgBox">
                <div ref={this.msgRef} className="msgList"
                     style={{ left: `${-1 * this.state.left}px` }}>
                    {this.msgData.map((item, i) => <div className="msgItem" key={i}>{item}</div>)}
                </div>
            </div>
        </section>
    )

    // 复制兑奖码
    handleCopyCode = e => {
        Toast.success('复制成功！');
    }

    render() {
        const { state, Msg, handleCopyCode } = this
        const { show, redeemcode, prizeName } = state
        return show && (
            <section className="pSucWrap" style={{ backgroundImage: `url(${bg5})` }}>
                {Msg()}
                <img className="logo" src={logo1} alt=""/>
                <img className="gongxi" src={gongxi} alt=""/>
                <div className="title">
                    {/*<div className="tit1">恭喜您获得了菠萝在线送出的</div>*/}
                    {
                        prizeName.map(item => <div className="tit2" key={item}>{item}</div>)
                    }
                </div>
                <div className="codeBox" style={{ backgroundImage: `url(${quan})` }}>
                    <div className="codeTit">兑奖码</div>
                    <div className="codeTxt">{redeemcode}</div>
                    <CopyToClipboard text={redeemcode} onCopy={handleCopyCode}>
                        <a href="javascript:void(0);" className="codeBtn">复制</a>
                    </CopyToClipboard>
                </div>
                <img src={erweima} alt="" className="erweima"/>
                <div className="subTit">请您添加菠萝老师微信：shudaiedu进行兑奖</div>
                <div className="desc">
                    <p>兑奖须知：</p>
                    <p>1.请您保存好您的兑奖码、中奖页面截图以及朋友圈页面分享截图</p>
                    <p>2.凭以上凭证添加菠萝老师微信：shudaiedu进行兑奖</p>
                    <p>3.兑奖日期：2019.02.01-2019.02.15 19:00-21:00</p>
                    <p>4.本活动解释权归菠萝在线所有</p>
                </div>
            </section>
        )
    }
}

export default NewYearSuc;
