import React, { Component } from 'react';
import './SchoolComparison.less'

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
                    菠萝在线的师资团队成熟：<br />
                    学科教师匹配均衡，教师具有海外留学或国内<br />
                    重点大学背景；不开设没有成熟稳定师资团队<br />
                    的科目
                  </span>
                </li>
                <li>
                  <span>
                    菠萝在线具有成熟的督导监管制度：<br />
                    有专职班主任负责督导，督导严格，经常和学生<br />
                    与家长沟通反馈学习情况、进度不开设没有成熟<br />
                    稳定师资团队的科目
                  </span>
                </li>
                <li>
                  <span>
                    菠萝在线顾问对考试、知识点、择校等有全面了解，<br />
                    更有免费科学测评供咨询参考
                  </span>
                </li>
                <li>
                  <span>菠萝在线教研组统一准备讲义、教辅、教材内容</span>
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
                    11680元（8人班）<br />
                    16万元（VIP套餐）
                  </span>
                </li>
                <li>
                  <span>
                    无线上课程
                  </span>
                </li>
                <li>
                  <span>
                    有科目有明显教师师资<br />
                    缺陷
                  </span>
                </li>
                <li>
                  <span>
                    督导和销售分离，但无班主任，<br />
                    督导能力一般；学生情况反馈、<br />
                    后续跟进体系完善
                  </span>
                </li>
                <li>
                  <span>
                    对考试理解程度不够深刻，学<br />
                    科能力欠缺，对考点知识点不<br />
                    精通，业务能力有待提高
                  </span>
                </li>
                <li>
                  <span>
                    教师自备讲义，无教辅产品，<br />
                    无对口教材
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
                  <span>VIP 550元/h</span>
                </li>
                <li>
                  <span>
                    线下面授<br />
                    中教线上录播课程仅做辅助
                  </span>
                </li>
                <li>
                  <span>
                    学科教师匹配均衡，但教师团<br />
                    队重组中，师资不稳定并暂无<br />
                    学科领头人
                  </span>
                </li>
                <li>
                  <span>
                    学生管理严格程度一般，学生<br />
                    情况反馈及后续跟进体系较为<br />
                    完善但没有学生反馈
                  </span>
                </li>
                <li>
                  <span>
                    咨询人员不负责学科规划；几<br />
                    乎不接收不具备国际高中学习<br />
                    背景的学生；
                  </span>
                </li>
                <li>
                  <span>具有对口教材，无教辅产品</span>
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