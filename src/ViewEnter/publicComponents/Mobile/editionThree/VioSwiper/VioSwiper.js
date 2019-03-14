import React,{Component} from 'react';
import './VioSwiper.less';
class VioSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: 1,
            time: ''
        };
        this.startPos = {};
        this.goFlg = true;
        // 切换
        this.change = this.change.bind(this);
        const {vioData}=this.props;
    };
    
    componentDidMount() {
        this.change(true);
    }
    // 下一个
    change = flg => {
        const that = this;
        const {vioData}=this.props;
        let { idx, timer } = this.state;
        clearInterval(timer);
        timer = setInterval(e => {
            that.change(true);
        }, 3000);
        flg ? ++idx : --idx;
        idx = idx <= 0 ? vioData.length : idx > vioData.length ? 1 : idx;
        this.setState({ idx, timer });
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
        const { startPos } = this;
        const endPos = { x: touch.pageX - startPos.x, y: touch.pageY - startPos.y };
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
        const {vioData}=this.props;
        let { idx } = this.state;
        let prev = idx <= 1 ? vioData.length : idx - 1,
            next = idx + 1 > vioData.length ? 1 : idx + 1;
        return (
            <section className="vioSwiper">
                {
                    vioData.map((item,index) => {
                        const { name,subject,school,imgsrc,tips} = item;
                        return (
                            <div
                                key={index}
                                onTouchStart={this.onTouchStart}
                                onTouchMove={this.onTouchMove}
                                onTouchEnd={this.onTouchEnd}
                                className={`swiperItem ${(index+1) === idx ? 'act' : (index+1) === prev ? 'prev' : (index+1) === next ? 'next' : 'none'}`}
                            >
                                <div className="swpCon">
                                    <img src={imgsrc} className="vioImg" />
                                    <div className="vioName">{name}</div>
                                    <div className="vioTit">{subject}</div>
                                    <div className="vioTxt">{school}</div>
                                    {tips?<div className='tips'>{tips}</div>:''}

                                </div>
                            </div>
                        )
                    })
                }
                <div className="swpBtns">
                    {
                        vioData.map((item,index) => {
                            return (
                                <div key={index} className={`swpBtn ${index === idx ? 'act' : ''}`}></div>
                            )
                        })
                    }
                </div>
            </section>
        )
    }
}
export default VioSwiper;