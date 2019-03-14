import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'antd-mobile/dist/antd-mobile.css';
import 'element-theme-default';
import 'antd/dist/antd.less';
import './index.css';
import "babel-polyfill";
import { Provider } from 'mobx-react';
import AppStore from '@/stores/AppStore';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DeviceState } from "@function/Function"
import {
    // 错误
    Error,
    // PC
    Homes, TanksGiving, TanksSuccess, PCoverlordClass,
    //锦鲤
    KoiFish, KoiFishMobile,
    // 201812抽奖
    PrizeDrawLogin, PrizeDrawIndex,
    //霸王课
    OverlordClass,
    // 支付
    OrderDetail, PayLogin, Payment, PaymentWechat, WechatPayLogin,
    // 新年活动
    NewYearIndexMobile, NewYearPrizeMobile, NewYearActForm, NewYearSuc,
    // 微信绑定授权
    WxLogin

} from '@/bundle/Page'

const store = new AppStore();
ReactDOM.render(
    <Provider store={store}>
        <section>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Homes}/>
                    {/*<Route path="/thanksGiving" component={TanksGiving}/>*/}
                    {/*<Route path="/thanksSuccess" component={TanksSuccess}/>*/}
                    {/*<Route path="/prizeDrawLogin" component={PrizeDrawLogin}/>*/}
                    {/*<Route path="/prizeDrawIndex" component={PrizeDrawIndex}/>*/}
                    {/*<Route path="/overlordClass" component={DeviceState ? OverlordClass : PCoverlordClass}/>*/}
                    {/*<Route path="/koifish" component={DeviceState ? KoiFishMobile : KoiFish}/>*/}
                    <Route path="/payment" component={Payment}/>
                    <Route path="/paymentWechat" component={PaymentWechat}/>
                    <Route path="/orderdetail" component={OrderDetail}/>
                    <Route path="/paylogin" component={PayLogin}/>
                    <Route path="/codepaylogin" component={WechatPayLogin}/>
                    <Route path="/newyear/index" component={NewYearIndexMobile}/>
                    <Route path="/newyear/prize" component={NewYearPrizeMobile}/>
                    <Route path="/newyear/form" component={NewYearActForm}/>
                    <Route path="/newyear/suc" component={NewYearSuc}/>
                    <Route path="/wxLogin" component={WxLogin}/>
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        </section>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker();

