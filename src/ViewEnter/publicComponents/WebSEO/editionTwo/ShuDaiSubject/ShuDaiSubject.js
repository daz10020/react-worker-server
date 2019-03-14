import React, { Component} from 'react';

import './ShuDaiSubject.less';
import Mathematics from './数学设备.png';
import Physics from './物理与天文学.png';
import Business from './商业决策.png'
import Chemistry from './化学.png';
import Economics from './经济指数.png'
import Calculus from './微积分.png'
import Historys from './历史.png';
import Biology from './生物制药.png'

import Mathematics1 from './数学设备1.png';
import Physics1 from './物理与天文学1.png';
import Business1 from './商业决策1.png'
import Chemistry1 from './化学1.png';
import Economics1 from './经济指数1.png'
import Calculus1 from './微积分1.png'
import Historys1 from './历史1.png';
import Biology1 from './生物制药1.png'

class ShuDaiSubject extends Component{
  render(){
    return(
      <section>
        <div className="session_content">
          <ul>
            <li onClick={this.props.CloseBlock}>
              <img className="hoverImg" src={Mathematics} alt="" />
              <img className="morenIng" src={Mathematics1} alt="" />
              <p className="session_name">数学</p>
              <span>Mathematics</span>

              {/* <div>
                <p onClick={this.CloseBlock}>咨询课程</p>
              </div> */}
            </li>
            <li onClick={this.props.CloseBlock}>
              <img className="hoverImg" src={Physics} alt="" />
              <img className="morenIng" src={Physics1} alt="" />
              <p className="session_name">物理</p>
              <span>Physics</span>
              {/* <div>
                <p onClick={this.CloseBlock}>咨询课程</p>
              </div> */}
            </li>
            <li onClick={this.props.CloseBlock}>
              <img className="hoverImg" src={Biology} alt="" />
              <img className="morenIng" src={Biology1} alt="" />
              <p className="session_name">生物</p>
              <span>Biology</span>
              {/* <div>
                <p onClick={this.CloseBlock}>咨询课程</p>
              </div> */}
            </li>
            <li onClick={this.props.CloseBlock}>
              <img className="hoverImg" src={Chemistry} alt="" />
              <img className="morenIng" src={Chemistry1} alt="" />
              <p className="session_name">化学</p>
              <span>Chemistry</span>
              {/* <div>
                <p onClick={this.CloseBlock}>咨询课程</p>
              </div> */}
            </li>
            <li onClick={this.props.CloseBlock}>
              <img className="hoverImg" src={Calculus} alt="" />
              <img className="morenIng" src={Calculus1} alt="" />
              <p className="session_name">微积分</p>
              <span>Calculus</span>
              {/* <div>
                <p onClick={this.CloseBlock}>咨询课程</p>
              </div> */}
            </li>
            <li onClick={this.props.CloseBlock}>
              <img className="hoverImg" src={Economics} alt="" />
              <img className="morenIng" src={Economics1} alt="" />
              <p className="session_name">经济</p>
              <span>Economics</span>
              {/* <div>
                <p onClick={this.CloseBlock}>咨询课程</p>
              </div> */}
            </li>
            <li onClick={this.props.CloseBlock}>
              <img className="hoverImg" src={Historys} alt="" />
              <img className="morenIng" src={Historys1} alt="" />
              <p className="session_name">历史</p>
              <span>History</span>
              {/* <div>
                <p onClick={this.CloseBlock}>咨询课程</p>
              </div> */}
            </li>
            <li onClick={this.props.CloseBlock}>
              <img className="hoverImg" src={Business} alt="" />
              <img className="morenIng" src={Business1} alt="" />
              <p className="session_name">商业管理</p>
              <span>Business management</span>
              {/* <div>
                <p onClick={this.CloseBlock}>咨询课程</p>
              </div> */}
            </li>
          </ul>
        </div>
        <div className="session_fouter">
          <p>
            <b></b>
            <span>菠萝在线特长科目</span>
            <b></b>
          </p>
        </div>
      </section>
    )
  }
}

export default ShuDaiSubject