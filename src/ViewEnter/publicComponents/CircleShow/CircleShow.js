import React, {Component} from 'react';
import './CircleShow.css';
import rows from './rows.png'

class CircleShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers:this.props.data.concat(this.props.data),
            Speed: 0,
            Distance: 0,
            ChangeTime:this.props.ChangeTime,
            BActive:this.props.BActive,
        };
        this.timer = null;
        this.NumCircle=this.props.NumCircle;
        this.Mminterval=this.props.Mminterval;
    };
    //组件渲染真实dom加载完钩子
    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.setState({
            Speed:this.refs.warpWidth.clientWidth/this.NumCircle,
        });
        this.FunTimer()
    }
    //组件销毁钩子
    componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
      clearInterval(this.timer);
    }

    //窗口改变事件方法
    onWindowResize=()=>{
      clearInterval(this.timer);
      this.setState({
        Speed:this.refs.warpWidth.clientWidth/this.NumCircle,
        Distance: 0,
        ChangeTime:this.props.ChangeTime,
        BActive:this.props.BActive,
      });
      this.FunTimer()
    };

    //定时器函数
    FunTimer=()=>{
      this.timer = setInterval(() => {
        if(this.state.Distance<=-(this.refs.UlWidth.clientWidth/this.NumCircle)){
          this.setState({
            ChangeTime:0,
            Distance: 0,
            BActive:this.props.BActive+1,
          });
          setTimeout(()=>{
            this.setState({
              ChangeTime:this.props.ChangeTime,
              Distance: -this.state.Speed,
            })
          },0)
        }else {
          this.setState({
            ChangeTime:this.props.ChangeTime,
            Distance: this.state.Distance - this.state.Speed,
            BActive:this.state.BActive+1,
          })
        }
      }, this.Mminterval);
    };

    //左右按钮按下事件方法
    ScrollDown = num => {
        clearInterval(this.timer);
        if (num){
          if(this.state.Distance<=-(this.refs.UlWidth.clientWidth/2)){
            this.setState({
              ChangeTime:0,
              Distance: 0,
              BActive:this.props.BActive+1,
            });
            setTimeout(()=>{
              this.setState({
                ChangeTime:this.props.ChangeTime,
                Distance: -this.state.Speed,
              })
            },0)
          }else {
            this.setState({
              ChangeTime:this.props.ChangeTime,
              Distance: this.state.Distance - this.state.Speed,
              BActive:this.state.BActive+1,
            })
          }
        }else {
          if(Math.floor(this.state.Distance)===0){
            this.setState({
              ChangeTime:0,
              Distance: -(this.refs.UlWidth.clientWidth/2),
              BActive:this.props.BActive+5,
            });
              setTimeout(()=>{
                this.setState({
                  ChangeTime:this.props.ChangeTime,
                  Distance: -(this.refs.UlWidth.clientWidth/2)+this.state.Speed,
                })
              },0)
          }else {
            this.setState({
              ChangeTime:this.props.ChangeTime,
              Distance: this.state.Distance + this.state.Speed,
              BActive:this.state.BActive-1,
            })
          }
        }
    };

    //圆圈经过和移出事件方法
    ChangeTimer=num=>{
        if (num){
            this.FunTimer()
        } else {
            clearInterval(this.timer)
        }
    };

    //渲染真实dom
    render() {
        return (
            <div className="CircleShow">
                <nav
                  onMouseDown={()=>{this.ScrollDown(0)}}
                  onMouseUp={()=>{this.ChangeTimer(1)}}>
                  <img src={rows} alt="left"/>
                </nav>
                <div className="warp" ref="warpWidth">
                  <ul ref="UlWidth" style={{
                        width: `${this.state.numbers.length * this.state.Speed}px`,
                        transform: `translateX(${this.state.Distance}px)`,
                        transition: `${this.state.ChangeTime}s`
                      }}>
                      {this.state.numbers.map((number, index) =>
                        <li key={index} style={{width:`${this.state.Speed}px`,height:`${this.state.Speed}px`}}>
                          <div
                            className={`${this.state.BActive === index ? "BActive" : ""}`}
                            onMouseEnter={()=>{this.ChangeTimer(0)}}
                            onMouseLeave={()=>{this.ChangeTimer(1)}}>
                            <span>{number}</span>
                          </div>
                        </li>
                      )}
                  </ul>
                </div>
                <nav
                  onMouseDown={()=>{this.ScrollDown(1)}}
                  onMouseUp={()=>{this.ChangeTimer(1)}}>
                  <img src={rows} alt="right"/>
                </nav>
            </div>

        );
    }
}

export default CircleShow;
