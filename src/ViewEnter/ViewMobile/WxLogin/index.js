import React, { Component } from 'react';
import http from '@function/ActHttp'
import { appid } from "@function/wxFunc";

const { parse } = require('querystring')

class WxLogin extends Component {

    constructor(props) {
        super()
    }

    componentWillMount() {
        // sessionStorage.setItem("userInfo",'{}');
        // const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        // // 本地未存储用户信息
        // if (!userInfo || !userInfo.unionid) {
        const { href, search } = window.location;
        const { code, cbUrl } = parse(search.substr(1));
        if (!code) {
            window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${href}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
        } else if (code) {
            window.history.replaceState(null, null, '/wxLogin');
            // 通过code获取unionid
            http.get('/authorize/tencent', { code, release: 'SALE' }).then(userInfo => {
                // unionid加入缓存
                window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                // 跳转至原页面
                cbUrl && window.location.replace(cbUrl);
            }).catch(err => {});
        }
        // }
    }

    render() {
        return <section></section>
    }
}

export default WxLogin;
