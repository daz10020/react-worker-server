import React,{ Component } from 'react';
import "./Topic.less";
import { plus } from '@function/Function';

class Topic extends Component{

  componentDidMount() {
    plus.rem();
  }

  render(){
    return(
      <div className="two_box_content">
        <div className="two_box_c_left">
          <ul>
            <li>
              <i>•</i>
              <span>数学 Mathematics</span>
            </li>
            <li>
              <i>•</i>
              <span>物理 Physics</span>
            </li>

            <li>
              <i>•</i>
              <span>化学 Chemistry</span>
            </li>
            <li>
              <i>•</i>
              <span>会计 Accounting</span>
            </li>
            <li>
              <i>•</i>
              <span>商业管理 Business</span>
            </li>
          </ul>
        </div>
        <div className="two_box_c_right">
          <ul>
            <li>
              <i>•</i>
              <span>微积分 Calculus</span>
            </li>
            <li>
              <i>•</i>
              <span>经济 Economics</span>
            </li>
            <li>
              <i>•</i>
              <span>生物 Biology</span>
            </li>
            <li>
              <i>•</i>
              <span>历史 History</span>
            </li>
            <li>
              <span> Management</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Topic;