import React, { Component } from 'react';
import $ from 'jquery';
import { $http, plus, Trim, GetQueryString, enterType } from '@function/Function';
import logo from '@picture/logo.png';
import { Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Images } from './images.js';
import './TanksSuccess.less';
class TanksSuccess extends Component {
  constructor() {
    super();
    this.state = {
      codeBtn: "发送验证码",
      getActive: false,
      isTel: false,
      yzm: '',
      mask: 'none',
      animating: false,
      listData: [],
      strs:''
    }
  }
  componentWillMount () {
    if (!localStorage.getItem('status')){
      this.props.history.push({
        pathname: `/thanksgiving`,
      });
    }else{
      let str = '';
      if (localStorage.getItem('status') == 1) {
        str = '恭喜! 领取成功!';
      } else {
        str = '您已领取!';
      }
      this.setState({
        phone: localStorage.getItem('phone'),
        strs: str
      })
      let that = this;
      $http.get(this, {
        url: "/live/activityUser/front/listCoupon",
        dataType: "json",
        data: { "phone": localStorage.getItem('phone') },
        success: function (res) {
          console.log(res);
          if (res.success == true) {
            let listData = res.data;
            this.setState({
              listData
            })
            console.log(that, this);
          } else {
            Toast.info(res.msg, 1);
            that.setState({
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
  onCopy() {
    Toast.info('复制成功，去粘贴', 1);
  }
  render() {
    let list = [];
    this.state.listData.map((item, index) => {
      list.push(
        <div className="ticket">
          <span className="word">￥&nbsp;{item.minusMoney}:&nbsp;&nbsp;{item.couponCode}</span>
          <CopyToClipboard text={item.couponCode} onCopy={this.onCopy}>
            <span className="btn">复制</span>
          </CopyToClipboard>
        </div>
      )
    })
    return (
      <div className="thanks-success">
        
        <h1><img src={Images.logo} alt="" />菠萝在线 国际课程在线一对一</h1>
        <div className="successTitle">
          {this.state.strs}
        </div>
        <div className="ticketDetail">
          <div className="title">
            优惠券码
          </div>
          <div className="ticketlist">
            {list}
          </div>
        </div>
        <div className="hint">保存此图，购课时即可享受活动优惠 </div>
        <div className="erw">
          <img src={Images.ewm} alt="" />
        </div>
        <div className="erwNote">
          添加菠萝在线真人微信 <br/>免费领取2018全套国际学校择校资料
        </div>
        <div className="activeNote">
          温馨提示： <br />1.优惠券面值以券面显示为准，可通过“关注公众号（菠萝在线国际课程）-菜单栏-优惠券”查看活动； <br />2.优惠券每人仅限领取一次，不与其他活动优惠叠加使用； <br />3.优惠券自领取之日起30日内有效，过期作废； <br />4.活动最终解释权归菠萝在线所有。
        </div>
      </div>
    )
  }
}
export default TanksSuccess;