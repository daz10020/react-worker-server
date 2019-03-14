import React, { Component } from 'react';
import { plus} from '@function/Function';
import Topic from '../Topic/Topic'
import './SubjectPublic.less'

class SubjectPublic extends Component{
 

  componentDidMount() {
    plus.rem();
  }
  render(){
    return(
      <div>
        <div className="va_five_course_subjects">
          <div className="va_five_course_subject">
            <span>开设科目</span>
          </div>
          <Topic/>
        </div>
        <div className="va_five_course_subjects va_five_course_housr">
          <div className="va_five_course_subject va_five_course_kecheng">
            <span>建议课时</span>
          </div>
          <div className="va_five_course_kecheng_c">
            <ul>
              <li>
                <span>基础模块</span>
                <p>20课时</p>
              </li>
              <li>
                <span>提升模块</span>
                <p>20课时</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SubjectPublic;