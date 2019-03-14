import React, { Component } from 'react';
import './SchoolComparisonTwo.less'

class SchoolComparison extends Component{
  render(){
    return(
      <section className="comparison">
        <h2>菠萝在线与其他机构对比</h2>
        <b></b>
        <div>
          <ul>
            <li></li>
            <li>
              <ul style={{ fontWeight: 600 }}>
                <li></li>
                <li>
                  <span>课程价格</span>
                </li>
                <li>
                  <span>课程类型</span>
                </li>
                <li>
                  <span>师资<br />能力评价</span>
                </li>
                <li>
                  <span>学生监管</span>
                </li>
                <li>
                  <span>咨询<br />能力评价</span>
                </li>
                <li>
                  <span>教辅类<br />配套产品</span>
                </li>
                <li>
                  <span>教学<br />模式评价</span>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li></li>
            <i className="headBox" />
            <i className="footBox" />
            <li>
              <ul>
                <li>菠萝在线</li>
                <li>
                  <span>
                    一对一课程中菠萝在线性价比最高<br />
                    可自由报课续费
                  </span>
                </li>
                <li>
                  <span>菠萝在线线上一对一教程辅导</span>
                </li>
                <li>
                  <span>
                  教师具有海外留学或国内重点大学背景；<br />
                  30:1的教师录取率，全职任教
                  </span>
                </li>
                <li>
                  <span>
                  有专职班主任负责督导，与学生和家长沟通反馈<br />学习情况，帮助学生调整状态
                  </span>
                </li>
                <li>
                  <span>
                  菠萝在线顾问对考试、竞赛、择校、等有全面了解，<br />
                  更有免费科学测评供咨询参考
                  </span>
                </li>
                <li>
                  <span>菠萝在线教研组统一准备讲义、教辅、教材内容</span>
                </li>
                <li>
                  <span>根据学生当前能力定制个性化教学方案</span>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li></li>
            <li>
              <ul>
                <li>机构A</li>
                <li>
                  <span>
                    4500元
                  </span>
                </li>
                <li>
                  <span>
                  录播课程
                  </span>
                </li>
                <li>
                  <span>
                  有部分教师有过留学经历，但<br />
                  兼职教师过多，存在一门课程<br />
                  多个老师教的情况
                  </span>
                </li>
                <li>
                  <span>
                  督导和销售分离，但无班主任，<br />
                  可能没有办法顾及所有学生，无<br />
                  法对学生的学习状况进行及时反<br />
                  馈
                  </span>
                </li>
                <li>
                  <span>
                  对考试理解程度不够深刻，对<br />
                  考点不精通，详细内容需要与<br />
                  讲师进行沟通咨询
                  </span>
                </li>
                <li>
                  <span>
                  教师自备讲义，无教辅产品
                  </span>
                </li>
                <li>
                  <span>
                  所有学生进度相同
                  </span>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li></li>
            <li>
              <ul>
                <li>机构B</li>
                <li>
                  <span>10999元（4-6人班）</span>
                </li>
                <li>
                  <span>
                    线下面授
                  </span>
                </li>
                <li>
                  <span>
                  全职教师，教师教学经历丰富<br />
                  但教师流动性较大，师资力<br />
                  量不够稳定，排课时间跨度大
                  </span>
                </li>
                <li>
                  <span>
                  有专门班主任。学生管理严格<br />
                  程度一般，学生情况反馈及后<br />
                  续跟进体系较为完善
                  </span>
                </li>
                <li>
                  <span>
                  咨询人员不负责学科规划，几<br />
                  乎不接收不具备国际高中学习<br />
                  背景的学生
                  </span>
                </li>
                <li>
                  <span>教师自备讲义，有教辅产品，<br />
                  需要提前与自己喜欢的讲师预<br />
                  留时间</span>
                </li>
                <li>
                  <span>所有学生进度相同</span>
                </li>
              </ul>
            </li>
          </ul>
          <div className="clear" />
        </div>
        <div className="comparison_left"></div>
        <div className="comparison_right"></div>
      </section>
    )
  }
}

export default SchoolComparison;