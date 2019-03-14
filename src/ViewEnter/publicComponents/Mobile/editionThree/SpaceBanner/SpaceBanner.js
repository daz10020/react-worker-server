import "./SpaceBanner.less";
import prev from './images/prev.png'
import next from './images/next.png'

import React, {Component, Fragment, Children} from 'react';

class SpaceBanner extends Component {
    constructor(props) {
        super(props);

        // class, 轮播时间, 过渡时间，位移时间间隔，宽度，间距
        const {cls = '', timeOut = 3000, speed = 500, ctime = 50, width = 80, margin = 4, children, btns = true} = this.props;
        // 长度
        const sum = width + margin;
        // 距屏幕
        const space = 50 - width / 2;
        // 移动点数
        const cm = sum * ctime / speed;
        // 移动次数
        const times = speed / ctime;
        // 轮播数据
        let list = children.concat();
        // 轮播数量
        const len = list.length;

        list.unshift(list[len - 1]);
        list.unshift(list[len - 1]);
        list.push(list[2]);
        list.push(list[3]);
        // 配置项
        this.opt = {
            cls, speed, width, space, sum, margin, cm, list, len, times, btns, timeOut, ctime
        };

        this.state = {
            idx: 1,
            left: -sum * 2 + 10,
            timer: '',
            num: 0,
        };

        this.startPos = {};
        this.goFlg = true;
        // 切换
        this.change = this.change.bind(this);
    };

    componentWillMount() {
    }

    componentDidMount() {
        // this.change(true);
    }

    componentDidUpdate() {
    }

    // 下一个
    change = flg => {
        const that = this;
        let { timer, idx, left, num } = this.state;
        const { len, sum, space, cm, times, ctime, timeOut } = this.opt;
        flg ? ++idx : --idx;

        if (idx <= 0) {
            idx = len;
            num = 0;
            left = -(len + 2) * sum + space;
        } else if (idx > len) {
            idx = 1;
            left = -sum + space;
            num = 0;
        }

        clearTimeout(timer);

        timer = setInterval(e => {
            let {left, timer, idx, num} = this.state;
            if (++ num >= times) {
                num = 0;
                left = -(idx + 1) * sum + space;
                clearInterval(timer);
                timer = setTimeout(e => {
                    that.change(true);
                }, timeOut);
            } else {
                left = -(idx + (flg ? 0 : 2)) * sum + num * cm * (flg ? -1 : 1) + space;
            }

            that.setState({left, timer, num});
        }, ctime);

        this.setState({timer, idx, left, num});
    }
    onTouchStart = e => {
        //当屏幕有多个touch或者页面被缩放过，就不执行move操作
        if (e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;
        const touch = e.targetTouches[0];
        this.startPos = {
            x: touch.pageX,
            y: touch.pageY,
        }
    }
    onTouchMove = e => {
        //当屏幕有多个touch或者页面被缩放过，就不执行move操作
        if (e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;
        const touch = e.targetTouches[0];
        const {startPos} = this;
        const endPos = {x: touch.pageX - startPos.x, y: touch.pageY - startPos.y};
        const isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
        if (isScrolling === 0) {
            e.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
            this.goFlg = endPos.x < 0;
        }
    }
    onTouchEnd = e => {
        this.change(this.goFlg);
    }

    render() {
        const { left } = this.state;
        const {len, sum, cls, btns, width, list, margin} = this.opt;
        const obj = {
            width: `${width}vw`,
            marginRight: `${margin}vw`
        }
        return (
            <div className={`spaceBanner ${cls}`}>
                <div className="swpList" style={{left: `${left + (len + 4) / 2 * sum - 50}vw`}}>
                    {
                        Children.map(list, (child, idx) => {
                            return (
                                <div style={obj} key={idx}>{child}</div>
                            )
                        })
                    }
                </div>
                {
                    btns && <div className="arrowBtns">
                        <div className="arrowBtn" onClick={() => {
                            this.change(false)
                        }}>
                            <img src={prev} alt="" className="arrowImg"/>
                        </div>
                        <div className="arrowBtn" onClick={() => {
                            this.change(true)
                        }}>
                            <img src={next} alt="" className="arrowImg"/>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default SpaceBanner;