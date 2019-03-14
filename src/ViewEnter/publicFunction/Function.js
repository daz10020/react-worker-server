import React from 'react';
import {
    Redirect
} from "react-router-dom";
import { Toast } from 'antd-mobile';

export function redirect() {
    if (localStorage.getItem('token') == null || this.state.LoginState == false) {
        return <Redirect to={
            {
                pathname: '/login',
                state: {
                    targetUrl: window.location.pathname
                }
            }
        }
        />
    }
}

//日期格式化2016-9-9变成2016-09-09与前几天日期
export function getDay(num, str) {
    let today = new Date();
    let nowTime = today.getTime();
    let ms = 24 * 3600 * 1000 * num;
    today.setTime(parseInt(nowTime + ms));
    let oYear = today.getFullYear();
    let oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    let oDay = today.getDate().toString();
    if (oDay.length <= 1) oDay = '0' + oDay;
    return oYear + str + oMoth + str + oDay;
}


//去字符串所有空格
export function Trim(Str) {
    return Str.replace(/(^\s+)|(\s+$)/g, "")
}

//fetch封装
export const $http = {

    //http://admin.shudailaoshi.com 正式服务器
    //http://101.132.242.122:3030/shudailaoshi-web 测试服务器

    // URL: 'http://192.168.0.115:8080/shudailaoshi-web',
    // URL: 'http://boluo.nat100.top/shudailaoshi-web',
    URL: window.config.url,
    UrlEncode: (obj) => {
        if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
            return '';
        }
        let params = [];
        for (let key in obj) {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return params.join('&');
    },
    get: (Nothis, Objson) => {
        let Alldata = "";
        if (Objson.data) {
            Alldata = "?" + $http.UrlEncode(Objson.data);
        }
        fetch(`${$http.URL}${Objson.url}${Alldata}`, {
            method: 'get',
            mode: "cors",
            headers: {
                'Access-Token': localStorage.getItem("token")
            },
        }).then((res) => {
            if (res.status !== 200) {
                throw res.status
            } else {
                let Data;
                switch (Objson.dataType) {
                    case "json": {
                        Data = res.json()
                    }
                        break;
                    case "text": {
                        Data = res.test()
                    }
                        break;
                }
                return Data
            }
        }).then((res) => {
            Objson.success.call(Nothis, res)
        }).catch((error) => {
            if (Objson.error) {
                Objson.error.call(Nothis, error)
            }
        });
    },

    post: (Nothis, Objson) => {
        let formData = new FormData();
        if (Objson.data) {
            let OB = Objson.data;
            for (let i in OB) {
                formData.append(i, OB[i])
            }
        }
        fetch(`${$http.URL}${Objson.url}`, {
            method: 'post',
            mode: "cors",
            headers: {
                'Access-Token': localStorage.getItem("token")
            },
            body: formData
        }).then((res) => {
            if (res.status !== 200) {
                throw res.status
            } else {
                let Data;
                switch (Objson.dataType) {
                    case "json": {
                        Data = res.json()
                    }
                        break;

                    case "text": {
                        Data = res.test()
                    }
                        break;
                }
                return Data
            }
        }).then((res) => {
            Objson.success.call(Nothis, res)
        }).catch((error) => {

            if (Objson.error) {
                Objson.error.call(Nothis, error)
            }
        });
    },
    jump: () => {
        fetch(`${$http.URL}/m/live/schedule/facingOneSchedule`, {
            method: 'get',
            mode: "cors",
            headers: {
                'Access-Token': localStorage.getItem("token")
            },
        }).then((res) => {
            if (res.status !== 200) {
                throw res.status
            }
        }).catch((error) => {
            if (isNaN(error)) {
                if (error.message.substring(0, 6) === "Failed") {
                    Toast.fail("服务器出错，请联系相关人员")
                }
                return
            }
            if (error === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("thisToken");
                localStorage.setItem("exitState", "2")
                window.location.href = window.location.protocol + "//" + window.location.host + "/login";
            }
        });
    }
};

//判断登录状态码
export const statusCode = (Cthis, Num, Str) => {
    fetch(`${$http.URL}/m/live/schedule/facingOneSchedule`, {
        method: 'get',
        mode: "cors",
        headers: {
            'Access-Token': localStorage.getItem("token")
        },
    }).then((res) => {
        if (res.status === Num) {
            Toast.fail(Str);
            Cthis.setState({
                LoginState: false
            })
        }
    }).catch(() => {
        console.log('error');
    });
};


//时间补0
export function fillZero(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

//时间戳转换13位数
export function transDate(str) {
    let oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),

        oTime = fillZero(oYear) + '-' + fillZero(oMonth) + '-' + fillZero(oDay); //最后拼接时间
    return oTime;
}

//时间戳转换10位数
export function transDates(str) {
    let oDate = new Date(str * 1000),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        // oHour = oDate.getHours(),
        // oMin = oDate.getMinutes(),
        // oSen = oDate.getSeconds(),
        oTime = fillZero(oYear) + '年' + fillZero(oMonth) + '月' + fillZero(oDay) + "日"; //最后拼接时间
    return oTime;
}

//时间戳模板2018-09-08
export function DateTemp(Date) {
    let oDate = Date,
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oTime = fillZero(oYear) + '-' + fillZero(oMonth) + '-' + fillZero(oDay); //最后拼接时间
    return oTime;
}


//上下轮播图封装
export function animates(e, t, num) {
    num = num || 10;
    clearInterval(e.timer);
    e.timer = setInterval(function () {
        //先获取原来的位置
        var leader = e.offsetTop;
        var step = t > leader ? num : -num;
        //判断leader与target的距离， 如果超过step，就可以跑，否则，就清除定时器                 
        if (Math.abs(t - leader) >= Math.abs(step)) {
            leader += step;
            e.style.top = leader + "px";
        } else {
            clearInterval(e.timer);
            //手动设置到终点                         
            e.style.top = t + "px";
        }
    }, 15);
}

// 左右轮播图
export function animateLeft(element, target, num) {
    num = num || 10;
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        //先获取原来的位置
        var leader = element.offsetLeft;
        var step = target > leader ?
            num :
            -num;
        //判断leader与target的距离， 如果超过step，就可以跑，否则，就清除定时器
        if (Math.abs(target - leader) >= Math.abs(step)) {
            leader += step;

            element.style.left = leader + "px";
        } else {
            clearInterval(element.timer);
            //手动设置到终点
            element.style.left = target + "px";
        }
    }, 15);
}


//移动端封装
export const plus = {
    // wx:window.wx,
    rem: () => {
        (function (doc, win) {
            let docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    let clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';
                    window.plusRem = 10 * (clientWidth / 320);
                };
            recalc();
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
        })(document, window);
        return plus
    },
    // wx:window.wx,
    rem2: () => {
        const docEl = document.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = () => {
                let clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 10 * (clientWidth / 375) + 'px';
                window.plusRem = 10 * (clientWidth / 375);
            };
        recalc();
        if (!window.addEventListener) return;
        window.addEventListener(resizeEvt, recalc, false);
    },
    WeChat: (Array, Func) => {
        let wx = window.wx;
        $http.get(this, {
            url: "/m/wx/front/getSignature2",
            dataType: "json",
            data: {
                "url": window.location.href
            },
            success: function (res) {
                const { timestamp, noncestr, signature } = res.data;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wxe6f2d53112685daf', // 必填，公众号的唯一标识
                    timestamp: parseInt(timestamp), // 必填，生成签名的时间戳
                    nonceStr: noncestr, // 必填，生成签名的随机串
                    signature, // 必填，签名
                    jsApiList: Array // 必填，需要使用的JS接口列表
                });
                wx.ready(function () {
                    Func(wx)
                });
            },
        });

    },
};

//数组去重
export function unique(arr) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {//获取没重复的最右一值放入新数组
                ++i;
            }
        }
        newArr.push(arr[i]);
    }
    return newArr;
}

//判断手机端和PC端
export function IsPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//判断手机端域名
export const DeviceState = (function Device() {
    if (window.location.host.slice(0, 1) === "m" || !IsPC()) {
        return true
    } else {
        return false
    }
})();

//取地址栏参数
export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//判断是域名还是IP地址,IP==true,域名==false
export function JudgeIP() {

    if (document.domain === "localhost") {
        return true
    }
    else if (!isNaN(document.domain.substring(0, 1))) {
        return true
    } else {
        return false
    }

}

//安装百度功能
export function addBaidu() {
    window._hmt = window._hmt || [];
    if (typeof (window._hmt.id) === "undefined") {
        var hm = document.createElement("script");
        // hm.src = "https://hm.baidu.com/hm.js?f3ce3c9cdd6b2999e5c68eb4089afac8";
        hm.src = "https://hm.baidu.com/hm.js?ed1364e7bd5a4072661663a6c2c518c5";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }
}


//移除百度功能
export function removeBaidu() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf("baidu") !== -1) {
            scripts[i].parentNode.removeChild(scripts[i]);
        }
    }
    var links = document.getElementsByTagName("link");
    for (var j = 0; j < links.length; j++) {
        if (links[j].href.indexOf("baidu") !== -1) {
            links[j].parentNode.removeChild(links[j]);
        }
    }
}

//获取浏览器来源
export function getBrowserSource() {
    const pageUrl = document.location.href
    let browserType = ' ';
    if (pageUrl.indexOf('?') != -1) {//存在问号
        const browserData = pageUrl.slice(pageUrl.indexOf('?') + 1)
        if (browserData.indexOf('&') != -1) {//存在&
            browserType = browserData.slice(0, browserData.indexOf('&'))
        } else {
            browserType = browserData;
        }
    }
    return browserType
};

// 给后台传remark参数，告诉后台页面是菠萝来源还是树袋来源
export function remarkSource() {
    let reurl = window.location.href;
    let remark = reurl.substring(0, 28);
    if (remark == 'https://www.boluozaixian.com') {
        this.setState({
            remark: 'bl'
        })
    } else {
        this.setState({
            remark: 'bl'
        })
    }
}

// 判断活动页面从首页哪个栏目点击进来
export function enterType() {
    const path = window.location.pathname;
    if (path.indexOf('prize') > -1) {
        return this.title = '100%中奖，更有免单大奖等你领！菠萝在线2018年终超级福利';
    }
    if (path.indexOf('overlordClass') > -1) {
        return this.title = '菠萝在线“霸王课”上线！国际课程“免费”体验！独家引爆上海国际教育圈！'
    }
    let type = GetQueryString('type');
    if (type && type == 'test') {
        this.title = '同步课程_菠萝在线'
    } else if (!type) {
        this.title = '菠萝在线国际课程线上一对一_Alevel培训|AP培训|IB培训_国际学校排名'
    }
}

// 生成范围内的随机数
export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const VALIDATE_PHONE_REG = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;

// 分享配置
export function shareconfig() {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let url = '';
    if (isAndroid) {
        url = window.location.href;
    }
    if (isIOS) {
        url = window.location.href.split('#')[0];  //hash后面的部分如果带上ios中config会不对
    }
    return url;
}
