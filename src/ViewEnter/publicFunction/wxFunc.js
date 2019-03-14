import { Toast } from "antd-mobile";
import http from '@function/ActHttp';

export const appid = 'wxe6f2d53112685daf';

// 获取用户信息
export const getUserInfo = (data, cb, errCb) => {
    http.get('/user/selectByUnionid', data).then(res => {
        const { unionid, id, userNickname } = res;
        window.sessionStorage.setItem('userInfo', JSON.stringify({ unionid, id, userNickname }));
        typeof cb === 'function' && errCb(res)
    }).catch(error => {
        typeof errCb === 'function' && errCb(error)
    });
}

export const isLogin = (cb, href = window.location.href) => {
    // localStorage.setItem("userInfo",'{}');
    // alert(JSON.stringify(localStorage.getItem("userInfo")))
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.unionid) {
        window.location.replace(`/wxLogin?cbUrl=${href}`);
    } else {
        typeof cb === 'function' && cb(userInfo)
    }
}

export const isWeixinBrowser = () => {
    const agent = navigator.userAgent.toLowerCase();
    if (agent.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
