// 新年活动
import './index.less'
import Images from '../images'
import { share } from '../index'
import { activityId, checkStep } from '../Success'
import { shareconfig } from '@function/Function';
import http from "@function/ActHttp";

import React, { Component } from 'react'
import { Toast } from 'antd-mobile';
// 提交用户分享记录
const sendShare = '/activity/cjh5/share'

export const shareInit = (imgNum, userInfo, suc) => {
    share(`${userInfo.userNickname}竟然抽到了${prizeNameList[imgNum]},`, suc)
}

// 签名
const prizeNameList = ['青春永“猪”', '如有神“猪”', '掌上明“猪”', '“猪”光宝气', '“猪”脚光环']
// 位置
const posList = ['270-508', '370-508', '305-508', '250-508', '370-435']

class NewYearPrize extends Component {
    constructor() {
        super()
        this.state = {
            tipsDisplay: false,
            start: false
        }
        this.refCanvas = node => this.canvas = node
    }

    componentWillMount() {
        checkStep((step, userInfo) => {
            this.userId = userInfo.id
            const { activityImages } = step
            // 分享初始化
            shareInit(activityImages, userInfo, this.submit)
            // 绘制图片
            this.setState({start: true})
            this.creatImg(activityImages, userInfo.userNickname);
        })
    }

    submit = msg => {
        const {userId} = this
        setTimeout(() => {
            http.post(sendShare, {
                activityId,
                userId,
                step: 2
            }).then(res => {
                Toast.info('分享成功', 2)
                window.location.replace('/newyear/form')
            }).catch(err => {
                console.log(err);
            })
        }, 500)
    }

    shareTips = () => {
        this.setState({
            tipsDisplay: true
        })
    }
    closeTips = () => {
        this.setState({
            tipsDisplay: false
        })
    }
    creatImg = (imgNum, userNickname) => {
        const { length } = userNickname
        // 画板
        const ctx = this.canvas.getContext("2d");
        const img = new Image();
        img.src = Images[`canvas${imgNum - 0 + 1}`];
        const pos = posList[imgNum].split('-')
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            ctx.font = "normal 40px Microsoft YaHei"
            ctx.fillStyle = '#fff'
            ctx.textAlign = "center";
            const {width} = ctx.measureText(userNickname)
            if (width > 246) {
                for (let i = length;i > 0; i--) {
                    const name = userNickname.substring(0,i)
                    if (ctx.measureText(name).width > 210) {
                        continue
                    }
                    userNickname = `${name}..`
                    break
                }
            }
            ctx.fillText(userNickname, pos[0], pos[1] - 0, 246)
            this.setState({
                img: this.canvas.toDataURL()
            })
        };
    }
    saveTips = () => {
        Toast.info('请长按图片保存！', 2)
    }

    render() {
        const {start,img, tipsDisplay} = this.state
        return start && (
            <section className="prize">
                <div className="canvas-box">
                    <canvas ref={this.refCanvas} id="canvas" width="750" height="1300"></canvas>
                </div>
                <div className="show-img"><img src={img}/></div>
                <div className="bottom">
                    <span onClick={this.saveTips}>保存图片</span>
                    <span onClick={this.shareTips}>分享到朋友圈抽大奖</span>
                </div>
                <div className="tips" onClick={this.closeTips}
                     style={{ display: tipsDisplay ? 'block' : 'none' }}>
                    <img src={Images.fenxiang} alt=""/>
                </div>
            </section>
        )
    }

}

export default NewYearPrize;
