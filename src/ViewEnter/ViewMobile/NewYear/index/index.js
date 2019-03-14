// 新年活动
import './index.less'
import Images from '../images'
import { activityId, checkStep } from '../Success'
import { random, shareconfig, plus } from '@function/Function';
import http from "@function/ActHttp";

import React, { Component } from 'react'
import { Toast, ActivityIndicator } from 'antd-mobile';
import sharepic from '@picture/sharepic.png';
const { logo1, liwu, chouqu, biaoti1, biaoti2, qian1, qian2 } = Images

// 提交用户中奖图片及id
const api = '/web/activity/signUp'

// 分享
export const share = (title, suc) => {
    const { origin, href} = window.location
    const shareObj = {
        title: `${title}菠萝在线春节福猪！100%中奖！666现金红包、星巴克猪年限定礼盒、小猪佩奇电影套票等春节大礼等你来抽！`, // 分享标题
        desc: '菠萝在线春节大礼：666现金红包、星巴克猪年限定礼盒、小猪佩奇电影套票、故宫文创等你来抽！100%中奖！', // 分享描述
        imgUrl: `${origin}${sharepic}`,  // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        link: `${origin}/newyear/index`,
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
        url: href,
        success(res) {
            const {errMsg} = res
            errMsg && errMsg.indexOf('ok') !== -1 && typeof suc === 'function' && suc(errMsg)
        }
    }
    plus.WeChat(["onMenuShareAppMessage", "onMenuShareTimeline"], function (wx) {
        wx.onMenuShareAppMessage(shareObj);
        wx.onMenuShareTimeline(shareObj);
    });
}


class NewYearIndex extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            layerShow: true,
            drawShow:false,
            start: false
        }
    }

    componentWillMount() {
        checkStep((step, userInfo) => {
            this.userInfo = userInfo
            this.bgUrl = random(0, 4)
            this.setState({ start: true })
            share('')
        });
    }

    goPrize = () => {
        this.setState({
            loading: true,
        });
        const { userNickname, id, mobile, images } = this.userInfo
        http.post(api, {
            userName: userNickname,
            mobile,
            activityId,
            userId: id,
            image: images,
            isStep1: 1,
            activityImages: this.bgUrl
        }).then(res => {
            this.setState({
                loading: false,
            });
            Toast.info('抽签成功！', 2)
            window.location.replace('/newyear/prize')
        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false,
            });
        })
    }
    layerShow = () => {
        this.setState({
            drawShow:true,
            layerShow: false
        })
    }

    render() {
        const { start, loading, layerShow,drawShow } = this.state
        return start && (
            <section className="newyear">
                <section className="layer" style={{ display: layerShow ? 'block' : 'none' }}>
                    <div className="logo"><img src={logo1} alt=""/></div>
                    <div className="title"><img src={biaoti1} alt=""/></div>
                    <div className="gift">
                        <img src={liwu} alt=""/>
                        <span onClick={this.layerShow}><img src={chouqu} alt=""/></span>
                    </div>
                </section>
                <section className="draw" style={{ display: drawShow ? 'block' : 'none' }}>
                    <ActivityIndicator
                        toast
                        text="抽签中..."
                        animating={loading}
                    />
                    <div className="logo"><img src={logo1} alt=""/></div>
                    <div className="title"><img src={biaoti2} alt=""/></div>
                    <div className="content" onClick={this.goPrize}>
                        <div><img src={qian1} alt=""/><img src={qian2} alt=""/><img src={qian1} alt=""/></div>
                        <div><img src={qian2} alt=""/><img src={qian1} alt=""/><img src={qian2} alt=""/></div>
                        <div><img src={qian1} alt=""/><img src={qian2} alt=""/><img src={qian1} alt=""/></div>
                    </div>
                </section>
            </section>
        )
    }
}

export default NewYearIndex;
