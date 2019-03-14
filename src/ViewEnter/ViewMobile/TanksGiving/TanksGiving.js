import React, { Component } from 'react';
import $ from 'jquery';
import { $http, plus, Trim, enterType } from '@function/Function';
import { Button,Input,Modal } from 'antd';
import logo from '@picture/logo.png';
import { Toast, ActivityIndicator } from 'antd-mobile';
import { Images } from './images.js';
import './TanksGiving.less';
class TanksGiving extends Component {
  constructor() {
    super();
    this.state = {
      codeBtn: "发送验证码",
      getActive: false,
      isTel: false,
      yzm: '',
      mask: 'none',
      animating: false,
      activityCouponUsers:[],
      visible: false,
      queryPhone:''
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  componentWillMount() {
      enterType.call(document);
      const u = navigator.userAgent;
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let url='';
      if (isAndroid) {
          url=window.location.href;
      }
      if (isIOS) {
          url=window.location.href.split('#')[0];  //hash后面的部分如果带上ios中config会不对
      }
      plus.WeChat(["onMenuShareAppMessage","onMenuShareTimeline"], function (wx) {
          wx.onMenuShareAppMessage({
              title: '[周年庆最后一波！2000元感恩节现金折扣免费领！菠萝在线涨价倒计时！]', // 分享标题
              desc: '菠萝在线国际课程一对一，周年庆感恩回馈，千万现金优惠狂欢，剁手屯！错过这一波就涨价啦！', // 分享描述
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: window.location.protocol + "//" + window.location.host + logo, // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                  // 用户确认分享后执行的回调函数
              }
          });
          wx.onMenuShareTimeline({
              title: '[周年庆最后一波！2000元感恩节现金折扣免费领！菠萝在线涨价倒计时！]', // 分享标题
              desc: '菠萝在线国际课程一对一，周年庆感恩回馈，千万现金优惠狂欢，剁手屯！错过这一波就涨价啦！', // 分享描述
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: window.location.protocol + "//" + window.location.host + logo, // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                  // 用户确认分享后执行的回调函数
              }
          });
      });
  }
  componentDidMount() {
    plus.rem();
    let winHeight = $(window).height();
    $('.paylogin-wrap').height(winHeight);
  }
  // 填写电话号
  onChangePhone = (e) => {
    let phone = e.target.value;
    phone = phone.length > 11 ? phone.substr(0, 11) : phone;
    this.setState({ phone });
  }
  onChangephone = (e) => {
    let phone = e.target.value;
    phone = phone.length > 11 ? phone.substr(0, 11) : phone;
    this.setState({ 
      queryPhone:phone
     });
  }
  // 填写验证码
  onChangeYzm = (e) => {
    let yzm = e.target.value;
    yzm = yzm.length > 6 ? yzm.substr(0, 6) : yzm;
    this.setState({ yzm });
  }
  // 填写姓名
  onChangeName = (e) => {
    let usrName = e.target.value;
    usrName = usrName.length > 20 ? usrName.substr(0, 20) : usrName;
    this.setState({ usrName });
  }
  getIdentify = () => {
    let myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;
    console.log(this.state.phone);
    let nameMatched = myreg.test(this.state.phone);
    if (!nameMatched) {
      Toast.fail("请输入正确的手机号", 2);
      this.refs.tel.value = "";
      return;
    } else {
      this.setState({
        animating: true
      })
      $http.get(this, {
        url: "/live/activityUser/front/send",
        dataType: "json",
        data: { "tel": Trim(this.state.phone) },
        success: function (res) {
          if (res.success == true) {
            this.setState({
              animating: false,
              isTel: true
            })
            this.state.codeBtn = 60;
            this.timer = setInterval(
              () => {
                if (this.state.codeBtn === 0) {
                  this.setState({
                    getActive: false,
                    codeBtn: "发送验证码"
                  })
                  clearInterval(this.timer);
                } else {
                  this.setState({
                    getActive: true,
                    codeBtn: this.state.codeBtn - 1
                  })
                }
              }, 1000
            )
            Toast.success(res.data.data, 1);
          } else {
            Toast.info(res.msg, 1);
            this.setState({
              animating: false,
              mask: 'block',
            })
            return;
          }
        },
        error: function (err) {
          this.setState({
            animating: false,
          })
        }
      });

    }
  }
  //点击立即领取
  confirmOrder = () => {
    let myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;
    let nameMatched = myreg.test(this.state.phone);
    let code = Trim(this.state.yzm);
    let usrName = this.state.usrName;
    if (!nameMatched) {
      Toast.fail("请输入正确的手机号", 2);
      this.refs.tel.value = "";
      return;
    } else if (code.length < 6) {
      Toast.fail("请输入6位验证码", 2);
      return;
    } else if(usrName.length==0){
      Toast.fail("请输入名字", 2);
      return;
    }else {
      this.setState({
        animating: true
      })
      let array = [];
      let startTime = Date.parse(new Date());
      let endTime = startTime + 2592000000;
      array.push({
        "couponType":4,
        "content":"满10000减500",
        "discount":0,
        "reachMoney":10000,
        "minusMoney":500,
        "startTime": startTime,
        "endTime": endTime,
        "type":1,
        "source":1
      },{
          "couponType": 4,
          "content": "满20000减1500",
          "discount": 0,
          "reachMoney": 20000,
          "minusMoney": 1500,
          "startTime": startTime,
          "endTime": endTime,
          "type": 1,
          "source": 1
      })
      $http.post(this, {
        url: "/live/activityUser/front/saveActivityUser",
        dataType: "json",
        data: {
          "phone": Trim(this.state.phone),
          "code": Trim(this.state.yzm),
          "userName": this.state.usrName,
          "activityId":8888,
          "activityCouponUsers":JSON.stringify(array)
        },
        success: function (res) {
          this.setState({
            animating: false
          })
          if (res.success == true) {
            localStorage.setItem('phone', this.state.phone);
            localStorage.setItem('status', 1);
            this.props.history.push({
              pathname: `/thanksSuccess/`,
            });
          }else{
            Toast.info(res.msg, 1);
          }
        },
        error: function (err) {
          console.log(err);
        }
      });
    }
  }
  //点击查询
  query = () =>{
    const { cookies } = this.props;
    let myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;
    console.log(this.state.phone);
    let nameMatched = myreg.test(this.state.queryPhone);
    if (!nameMatched) {
      Toast.fail("请输入正确的手机号", 2);
      this.refs.tel.value = "";
      return;
    } else {
      let that = this;
      $http.get(this, {
        url: "/live/activityUser/front/listCoupon",
        dataType: "json",
        data: { "phone": this.state.queryPhone },
        success: function (res) {
          console.log(res);
          if (res.success == true) {
            this.props.history.push({
              pathname: `/thanksSuccess`,
            });
            window.localStorage.setItem('phone', this.state.queryPhone);
            window.localStorage.setItem('status', 2);
          } else {
            Toast.info(res.msg, 1);
            return;
          }
        },
        error: function (err) {
          this.setState({
            animating: false,
          })
        }
      });
    }
  }

  //验证码输入框获取焦点事件
  verify = () => {
    this.setState({
      yzm: this.refs.yzminput.value
    })
  }
  closeMask = () => {
    this.setState({
      mask: 'none'
    })
  }

  render() {
    return (
      <div className="thanks-giving">
        
        <h1><img src={Images.logo} alt="" />菠萝在线 国际课程在线一对一</h1> 
        <div className="banner">
          <img src={Images.banner} alt="" />
        </div> 
        <div className="ticket">
          <div className="tick">
            <div className="ticketType">现金券</div>
            <div className="ticketContent">
              <p>
                <span className="money">500</span><span className="word">元</span>
              </p>
              <div className="ticketNote">订单满10000可用</div>
            </div>
          </div>
          <div className="tick">
            <div className="ticketType">现金券</div>
            <div className="ticketContent">
              <p>
                <span className="money">1500</span><span className="word">元</span>
              </p>
              <div className="ticketNote">订单满20000可用</div>
            </div>
          </div>
        </div>
        <div className="hint">填写信息立即领取价值2000现金券 </div>
        <form action="" className="activeForm">
          <div className="label">
            <Input
            className="bannerInp"
            placeholder="请输入您的姓名"
            maxLength={11}
            value={this.state.usrName}
            onChange={this.onChangeName}
          />
          </div>
          <div className="label">
            <Input
              ref="tel"
              className="bannerInp"
              placeholder="请输入您的手机号"
              maxLength={11}
              type="number"
              value={this.state.phone}
              onChange={this.onChangePhone}
            />
          </div>
          <div className="label">
            <Input
              className="bannerInp"
              placeholder="请输入验证码"
              maxLength={11}
              type="number"
              value={this.state.yzm}
              onChange={this.onChangeYzm}
            />
            <Button
              className={this.state.getActive ? 'orange' : ' '}
              disabled={this.state.codeBtn === "发送验证码" ? false : true}
              onClick={this.getIdentify.bind(this)}>
              {this.state.codeBtn === "发送验证码" ? "发送验证码" : `${this.state.codeBtn}S`}</Button>
          </div>
          <div className="button" onClick={this.confirmOrder}>立即领取</div>
        </form>
        <Button type="primary" className="mine" onClick={this.showModal}>
          我的优惠券
        </Button>
        <Modal
          title=""
          visible={this.state.visible}
          footer="" 
          wrapClassName="TicModal"
          onCancel={this.handleCancel}
        >
          <h1 className="title">填写手机号立即查询优惠券码</h1>
          <Input
            ref="tel"
            className="mInput"
            placeholder="请输入您的手机号"
            maxLength={11}
            type="number"
            value={this.state.queryPhone}
            onChange={this.onChangephone}
          />
          <Button className="btn" onClick={this.query}>立即查询</Button>
        </Modal>
        <div className="activeNote">
          温馨提示： <br />1.优惠券面值以券面显示为准，可通过“关注公众号（菠萝在线国际课程）-菜单栏-优惠券”查看活动； <br />2.优惠券每人仅限领取一次，不与其他活动优惠叠加使用； <br />3.优惠券自领取之日起30日内有效，过期作废； <br />4.活动最终解释权归菠萝在线所有。
        </div>
        
        {/* <section className="paylogin-content">
          <div className="paylogin-box">
            <h1>支付登陆</h1>
            <div className="input-box-mobile">
              <span>手机号</span>
              <input ref="tel" type="text" maxLength="11" placeholder="请输入您用于支付的手机号" />
            </div>
            <div className="input-box-verification">
              <span className="yzm">验证码</span>
              <input onChange={this.verify} maxLength="6" ref="yzminput" type="text" placeholder="请输入验证码" />
              <Button
                className={this.state.getActive ? 'orange' : ' '}
                disabled={this.state.codeBtn === "发送验证码" ? false : true}
                onClick={this.getIdentify.bind(this)}>
                {this.state.codeBtn === "发送验证码" ? "发送验证码" : `${this.state.codeBtn}s`}</Button>
            </div>

            <div className="confirm">
              {(this.state.yzm.length == 6 && this.state.isTel) ? <Button onClick={this.confirmOrder} className="active">进入订单</Button> : <Button disabled="disabled">进入订单</Button>}
            </div>
          </div>
        </section> */}
        
      </div>
    )
  }
}
export default TanksGiving;