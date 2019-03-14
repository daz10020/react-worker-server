import React, {Component} from 'react';
import './MSiderTwoAWC.css';
import George from './wps33CB.tmp(1).jpg';
import July from './wps5974.tmp(2).png'
import leftks3 from "./leftks3.png";
class MSiderTwoAWC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DistanceTwo:-23,
      ChangeTimeTwo:0,
      activeIndexTwo:1,
      EventStateTwo:"auto"
    };
    this.timerTwo=null
  };
  componentWillMount(){
    clearInterval(this.timerTwo)
  }
  componentDidMount(){
    this.timerTwo=setInterval(()=>{this.AMNTwo(1)}, 4000)
    document.getElementById("cpnt").addEventListener('transitionend',()=>{
      clearInterval(this.timerTwo)
      this.timerTwo=setInterval(()=>{this.AMNTwo(1)}, 4000)
      this.setState({
        EventStateTwo:"auto",
      })
      if(this.state.activeIndexTwo===3){
        this.setState({
          DistanceTwo:-23,
          activeIndexTwo:1,
          ChangeTimeTwo:0,
        })
      }
      if(this.state.activeIndexTwo===0){
        this.setState({
          DistanceTwo:-23*2,
          activeIndexTwo:2,
          ChangeTimeTwo:0,
        })
      }
    },false);
  }
  AMNTwo(num){
    clearInterval(this.timerTwo)
    this.setState({
      EventStateTwo:"none",
    })
    if(num===1){
      this.setState({
        ChangeTimeTwo:0.4,
        DistanceTwo:this.state.DistanceTwo-23,
        activeIndexTwo:this.state.activeIndexTwo+num
      });
    }else {
      this.setState({
        ChangeTimeTwo:0.4,
        DistanceTwo:this.state.DistanceTwo+23,
        activeIndexTwo:this.state.activeIndexTwo+num
      })
    }
  }
  render() {
    return (
      <section className="MSider" 
               style={{ backgroundColor: this.props.BgColor, paddingBottom: this.props.marginBottoms}}>
        <aside>
          <ul>
            <div>
              <img src={leftks3} onClick={this.AMNTwo.bind(this,-1)}  style={{pointerEvents:this.state.EventStateTwo}} alt=""/>
            </div>   
            <li className="wrop">
              <ol className="cpnt" id="cpnt" style={{
                transform: `translateX(${this.state.DistanceTwo}rem)`,
                transition: `${this.state.ChangeTimeTwo}s`
                }}>
                <li>
                  <img src={George} alt=""/>
                  <p>George老师</p>
                  <p>北京大学<br />Peking University <br />中科院博士<br />所授课程：数学</p>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li>
                <li>
                  <img src={July} alt=""/>
                  <p>July老师</p>
                  <p>南京大学 <br />Nanjing University <br />数学系<br />所授课程：数学</p>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li>
                <li>
                  <img src={George} alt=""/>
                  <p>George老师</p>
                  <p>北京大学<br /> Peking University <br />中科院博士<br />所授课程：数学</p>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li>
                <li>
                  <img src={July} alt=""/>
                  <p>July老师</p>
                  <p>南京大学 <br />Nanjing University <br />数学系<br />所授课程：数学</p>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li>
                {/* <li>
                  <img src={George} alt=""/>
                  <p>George老师</p>
                  <p>北京大学<br />Peking University <br />中科院博士<br />所授课程：数学</p>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li> */}
              </ol>
            </li>
            <div>
              <img className="rotate180" onClick={this.AMNTwo.bind(this,1)}  style={{pointerEvents:this.state.EventStateTwo}} src={leftks3} alt=""/>
            </div>
          </ul>
          <img src={this.props.Img} alt=""/>
        </aside>
      </section>
    );
  }
}
export default MSiderTwoAWC;
