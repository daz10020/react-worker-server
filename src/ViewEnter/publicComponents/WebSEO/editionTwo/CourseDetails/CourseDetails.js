import React, { Component } from 'react';
import "./CourseDetails.css"

import xiong from './资源2拷贝.png'

class CourseDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="four_content_table">
        <div className="four_table_left">
          <ul>
            <li>
              <span>科目</span>
            </li>
            <li>
              <span>课程</span>
            </li>
            <li>
              <span>课时</span>
            </li>
          </ul>
        </div>
        <div className="four_table_right">
          <div className="four_right_top">
            <ul>
              <li>数学 Mathematics</li>
              <li>微积分 Calculus</li>
              <li>化学 Chemistry</li>
              <li>历史 History</li>
              <li>物理 Physics</li>
              <li>经济 Economics</li>
              <li>会计 Accounting</li>
              <li>生物 Biology</li>
              <li>商业管理 Business Management</li>
              {/* <li>......</li> */}
            </ul>
          </div>
          <div className="four_right_bottom">
            <ul>
              <li>基础模块</li>
              <li>提升模块</li>
            </ul>
          </div>
          <div className="four_right_bottom">
            <ul>
              <li>20课时</li>
              <li>20课时</li>
            </ul>
          </div>
        </div>
        <img src={xiong} alt="" style={{ display: this.props.shuDaiXiong }} />
      </div>
    )
  }
}

export default CourseDetails;