import React,{Component} from 'react';
import './ParentsFeedBack.less';
class ParentsFeedBack extends Component {
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
        const {parentsfeedBack}=this.props;
    };
    
    componentDidMount() {
        this.change(true);
    }
    // 下一个
    change = flg => {
        const that = this;
        const {parentsfeedBack}=this.props;
        let { idx, timer } = this.state;
        clearInterval(timer);
        timer = setInterval(e => {
            that.change(true);
        }, 4000);
        flg ? ++idx : --idx;
        idx = idx <= 0 ? parentsfeedBack.length : idx > parentsfeedBack.length ? 1 : idx;
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
        const {parentsfeedBack,dots,buttons}=this.props;
        let { idx } = this.state;
        let prev = idx <= 1 ? parentsfeedBack.length : idx - 1,
            next = idx + 1 > parentsfeedBack.length ? 1 : idx + 1;
        return (
            <section className="parentsfeedBack">
                {
                    parentsfeedBack.map((item,index) => {
                        return (
                            <div
                                key={index}
                                onTouchStart={this.onTouchStart}
                                onTouchMove={this.onTouchMove}
                                onTouchEnd={this.onTouchEnd}
                                className={`swiperItem ${(index+1) === idx ? 'act' : (index+1) === prev ? 'prev' : (index+1) === next ? 'next' : 'none'}`}
                            >
                                <div className="swpCon">
                                    <img src={item} className="vioImg" />

                                </div>
                            </div>
                        )
                    })
                }
                {dots&&<div className="swpdots" >
                    {
                        parentsfeedBack.map((item,index) => {
                            return (
                                <div key={index} className={`swpBtn ${index === idx ? 'act' : ''}`}></div>
                            )
                        })
                    }
                </div>}
                {buttons&&<div className="swpbutton">
                    <span className="pre" onClick={this.change.bind(this,false)}></span>
                    <span className="next" onClick={this.change.bind(this,true)}></span>
                </div>}
                
            </section>
        )
    }
}
export default ParentsFeedBack;