import React from 'react';
import Bundle from './Bundle.js';

// WX公众号登陆
export const WxLogin = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/WxLogin')}>
        {(WxLogin) => <WxLogin {...props} />}
    </Bundle>
);

//PC端
export const Homes = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewWeb/Homes/Homes')}>
        {(Homes) => <Homes {...props}/>}
    </Bundle>
);
export const Error = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewWeb/Error/Error')}>
        {(Error) => <Error {...props}/>}
    </Bundle>
);

export const PCoverlordClass = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewWeb/OverlordClass/OverlordClass')}>
        {(OverlordClass) => <OverlordClass {...props} />}
    </Bundle>
);

export const KoiFish = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewWeb/KoiFish/KoiFish')}>
        {(KoiFish) => <KoiFish {...props} />}
    </Bundle>
);

//移动端
export const TanksGiving = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/TanksGiving/TanksGiving')}>
        {(TanksGiving) => <TanksGiving {...props} />}
    </Bundle>
);

export const TanksSuccess = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/TanksSuccess/TanksSuccess')}>
        {(TanksSuccess) => <TanksSuccess {...props} />}
    </Bundle>
);

export const PrizeDrawLogin = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/PrizeDrawLogin/PrizeDrawLogin')}>
        {(PrizeDrawLogin) => <PrizeDrawLogin {...props} />}
    </Bundle>
);

export const PrizeDrawIndex = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/PrizeDrawIndex/PrizeDrawIndex')}>
        {(PrizeDrawIndex) => <PrizeDrawIndex {...props} />}
    </Bundle>
);

export const OverlordClass = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/OverlordClass/OverlordClass')}>
        {(OverlordClass) => <OverlordClass {...props} />}
    </Bundle>
);

export const KoiFishMobile = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/KoiFish/KoiFish')}>
        {(KoiFish) => <KoiFish {...props} />}
    </Bundle>
);

export const NewYearIndexMobile = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/NewYear/index/index')}>
        {(NewYearIndex) => <NewYearIndex {...props} />}
    </Bundle>
);

export const NewYearPrizeMobile = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/NewYear/prize/index')}>
        {(NewYearPrize) => <NewYearPrize {...props} />}
    </Bundle>
);

export const NewYearActForm = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/NewYear/ActForm')}>
        {(NewYearActForm) => <NewYearActForm {...props} />}
    </Bundle>
);

export const NewYearSuc = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/NewYear/Success')}>
        {(NewYearSuc) => <NewYearSuc {...props} />}
    </Bundle>
);

// 支付
export const PayLogin = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/Pay/PayLogin/PayLogin')}>
        {(PayLogin) => <PayLogin {...props} />}
    </Bundle>
);
export const Payment = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/Pay/Payment/Payment')}>
        {(Payment) => <Payment {...props} />}
    </Bundle>
);
export const OrderDetail = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/Pay/OrderDetail/OrderDetail')}>
        {(OrderDetail) => <OrderDetail {...props} />}
    </Bundle>
);
export const PaymentWechat = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/Pay/PaymentWechat/PaymentWechat')}>
        {(PaymentWechat) => <PaymentWechat {...props} />}
    </Bundle>
);
export const WechatPayLogin = (props) => (
    <Bundle load={() => import('@/ViewEnter/ViewMobile/Pay/WechatPayLogin/index')}>
        {(WechatPayLogin) => <WechatPayLogin {...props} />}
    </Bundle>
);






