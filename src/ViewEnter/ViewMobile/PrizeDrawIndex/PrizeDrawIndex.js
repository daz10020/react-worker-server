import './PrizeDrawIndex.less';
import logo from '@picture/logo.png';
import { Images, getBg } from './images.js';
import { enterType, random, VALIDATE_PHONE_REG, plus, shareconfig } from '@function/Function';
import http  from '@function/ActHttp';

import React, { Component } from 'react';
import { Toast, Modal, InputItem, List, ActivityIndicator } from 'antd-mobile';
// import CopyToClipboard from 'react-copy-to-clipboard';

const shareObj = {
    title: '100%中奖，更有免单大奖等你领！菠萝在线2018年终超级福利', // 分享标题
    desc: '菠萝在线国际课程线上一对一_Alevel培训|AP培训|IB培训_国际学校排名', // 分享描述
    imgUrl: window.location.protocol + "//" + window.location.host + logo, // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
};

const apis = {
    // 获取概率
    list: '/web/activity/awardPrize',
    // 验证邀请码
    qcode: '/web/activity/verifyRedeemCode',
    // 抽奖
    prize: '/web/activity/generateRedeemCode',
}

const activityId = 1;
class PrizeDrawIndex extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            prizeLoading: false,
            acting: false,
            open: true,
            suc: false,
            tit: '',
            deg: 0,
            code: '',
            qcode: '',
        };
    }

    componentWillMount() {
        const storage = window.sessionStorage.getItem('prizeDraw');
        if(!storage) {
            return this.props.history.push({
                pathname: `/prizeDrawLogin/`,
            });
        }
        this.storage = JSON.parse(storage);

        enterType.call(document);

        const nobj = Object.assign(shareObj, {url: shareconfig()})
        plus.WeChat(["onMenuShareAppMessage","onMenuShareTimeline"], function (wx) {
            wx.onMenuShareAppMessage(nobj);
            wx.onMenuShareTimeline(nobj);
        });
    }

    componentDidMount() {
        // 获取概率
        http.post(apis.list, {
            activityId
        }).then(res => {
            const { msg, success, data } = res;
            if (success) {
                this.gl = data;
            } else {
                Toast.fail(msg);
            }
        });
    }
    // 点击抽奖
    handleClickBtn = e => {
        const { acting } = this.state;
        if(acting) {
            return ;
        }
        this.autoFocusInst && this.autoFocusInst.focus();
        this.setState({open: true});
    }
    // 填写抽奖码
    qcodeChange = qcode => {
        this.setState({qcode: qcode.trim()});
    }
    // 提交抽奖码
    handleSubmit = e => {
        const { qcode: awardCode } = this.state;
        if(awardCode === '') {
            this.autoFocusInst && this.autoFocusInst.focus();
            return Toast.fail('请填写抽奖码！');
        }
        this.setState({
            loading: true,
        });

        // 提交
        http.post(apis.qcode, {
            awardCode,
            activityId,
            ...this.storage
        }).then(res => {
            const { msg, success } = res;
            if (success) {
                this.setState({
                    loading: false,
                    open: false
                });
            } else {
                this.setState({
                    loading: false
                });
                Toast.fail(msg, 1);
            }
        });
    }

    // 抽奖
    handlePrizeDraw = e => {
        const { qcode: awardCode } = this.state;
        this.setState({
            prizeLoading: true
        });
        // 计算中奖类型
        const rnum = random(1, 100);
        let type = 0;
        let tit = '';
        let total = 0;
        let prizeId = '';
        for (let i in this.gl) {
            const { id, winningRate, prizeName } = this.gl[i];
            const sum = total + winningRate;
            if (total < rnum && rnum <= sum) {
                type = i - 0 + 1;
                tit = prizeName;
                prizeId = id;
                break;
            } else {
                total = sum;
            }
        }
        // 提交
        http.post(apis.prize, {
            awardCode,
            activityId,
            prizeId,
            prizeName: tit,
            ...this.storage
        }).then(res => {
            const { msg, success, data } = res;
            if (success) {
                this.setState({
                    acting: true,
                    qcode: '',
                    tit,
                    deg: -random(type * 36 - 30, type * 36 - 6) - 360 * 2,
                });
                setTimeout(e => {
                    this.setState({
                        prizeLoading: false,
                        acting: false,
                        suc: true,
                        code: data,
                        deg: 0
                    });
                },4000);
            } else {
                this.setState({
                    prizeLoading: false
                });
                Toast.fail(msg, 1);
            }
        }).catch(res => {
            this.setState({
                prizeLoading: false
            });
            Toast.fail(res, 1);
        });
    }

    // 点击复制
    handleCopyClick = e => {
        Toast.success('复制成功！');
    }

    // 再次抽奖
    handleResClick = e => {
        this.setState({
            suc: false,
            open: true
        });
    }

    render() {
        const {
            loading, open, acting, deg, suc, tit, code, qcode, prizeLoading
        } = this.state;

        return (
            <section className="PrizeDrawIndex" style={getBg('bg')}>
                <ActivityIndicator
                    toast
                    text="正在验证..."
                    animating={loading}
                />
                <ActivityIndicator
                    toast
                    className="opc"
                    animating={prizeLoading}
                />
                <img src={Images.logo} alt="" className="logo"/>
                {
                    suc ? (
                        <div className="page2">
                            <img src={Images.tit2} alt="" className="tit" />
                            <div className="txt">{tit}</div>
                            <section className="sucBox" style={getBg('sucBg')}>
                                <div className="rd">兑换码</div>
                                {/*<div className="x"></div>*/}
                                <div className="codeBox">
                                    {code}
                                    {/*<CopyToClipboard text={code} onCopy={this.handleCopyClick}>*/}
                                        {/*<span className="copyBtn">复制</span>*/}
                                    {/*</CopyToClipboard>*/}
                                </div>
                            </section>
                            <div className="desc">请截图保存好中奖页面兑奖哦</div>
                            <a href="javascript: void(0);" className="resBtn" onClick={this.handleResClick}>再次抽奖</a>
                            <section className="desctxt">
                                <p className="p">奖品使用规则：</p>
                                <p className="p">1.免单大奖：每个客户免单总额度上限20000，免单额度不可拆分，不可折现，不可转赠或转让给他人使用；</p>
                                <p className="p">2.续费9折券：续费订单满20000，可使用此券，单张使用打9折，两张使用打88折，三张使用打85折，每个订单最多使用3张续费券；</p>
                                <p className="p">3.课时卡：订单每满10000，可使用1张课时卡，满20000，可使用2张，以此类推；</p>
                                <p className="p">4.奖品以实际发放的实物为准，实物奖品将在活动结束后统一发放。</p>
                            </section>
                            <div className="fdesc">活动最终解释权归菠萝在线所有</div>
                        </div>
                    ) : (
                        <div className="page1">
                            <img src={Images.tit1} alt="" className="tit" />
                            <div className="wrapper">
                                <div className="d" style={acting ? getBg('dImgAct') : getBg('dImg')}>
                                    <div className="circleBox">
                                        <img
                                            src={Images.circle} alt=""
                                            className="circle"
                                            style={{
                                                transition: acting ? 'all 3s' : 'unset',
                                                transform: `rotate(${deg}deg)`
                                            }}
                                        />
                                        <a href="javascript:void(0);" className="btn" style={getBg('btn')} onClick={this.handlePrizeDraw}></a>
                                    </div>
                                </div>
                            </div>
                            <div className="fdesc">活动最终解释权归菠萝在线所有</div>
                        </div>
                    )
                }
                <Modal
                    className="dialog"
                    visible={open}
                    transparent
                    title='请输入抽奖码'
                    footer={[{ text: '抽奖', onPress: this.handleSubmit }]}
                >
                    <List className="inpBox">
                        <InputItem
                            placeholder="请输入抽奖码"
                            clear
                            ref={el => this.autoFocusInst = el}
                            value={qcode}
                            onChange={this.qcodeChange}
                        />
                    </List>
                </Modal>
            </section>
        )
    }
}

export default PrizeDrawIndex;