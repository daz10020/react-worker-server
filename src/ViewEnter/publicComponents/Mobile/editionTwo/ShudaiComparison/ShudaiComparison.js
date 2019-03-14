import React, { Component } from 'react';
import './ShudaiComparison.less'
import three_logo from "./矢量智能对象.png";
import $ from 'jquery';
class ShudaiComparison extends Component {
  componentDidMount(){
    $("#slide li h3").on("click", function () {
      var index = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $("#slideSon ul").eq(index).show().siblings().hide();
    })
  }
  render(){
    return(
      <section className="comparison">
        <img src={three_logo} alt="" />
        <h2>
          菠萝在线<br />
          与其他机构对比
        </h2>
        <div className="comparsion_box">
          <div id="triangle-downs"></div>
          <div className="comparsion_con clearfix">
            <ul id="one">
              <li></li>
              <li></li>
              <li>课程价格</li>
              <li>课程类型</li>
              <li>师资<br />能力评价</li>
              <li>学生监管</li>
              <li>咨询<br />能力评价</li>
              <li>教辅类<br />配套产品</li>
            </ul>
            <ul id="two">
              <li></li>
              <li>
                <h3>菠萝在线</h3>
              </li>
              <li>
                一对一课程中菠萝在线性价比<br />
                最高 可自由报课续费<br />
              </li>
              <li>菠萝在线线上一对一教程辅导</li>
              <li>
                菠萝在线的师资团队成熟：学科教<br />
                师匹配均衡，教师具有海外留<br />
                学或国内重点大学背景；不开<br />
                设没有成熟稳定师资团队的科目
                  </li>
              <li>
                菠萝在线具有成熟的督导监管制度<br />
                ：有专职班主任负责督导，督<br />
                导严格，经常和学生与家长沟<br />
                通反馈学习情况、进度不开设<br />
                没有成熟稳定师资团队的科目
                  </li>
              <li>
                菠萝在线顾问对考试、知识点、择<br />
                校等有全面了解，更有免费科<br />
                学测评供咨询参考
                  </li>
              <li>
                菠萝在线教研组统一准备讲义、教<br />
                辅、教材内容
                  </li>
            </ul>
            <div id="slide">
              <ul>
                <li></li>
                <li>
                  <h3 className="active">机构A</h3>
                  <h3>机构B</h3>
                </li>
                <div id="slideSon">
                  <ul className="show">
                    <li>
                      11680元（8人班）<br />
                      16万元（VIP套餐）
                    </li>
                    <li>无线上课程</li>
                    <li>
                      有科目有明显教师<br />
                      师资缺陷
                    </li>
                    <li>
                      督导和销售分离，但无班<br />
                      主任，督导能力一般；学<br />
                      生情况反馈、后续跟进体<br />
                      系完善
                    </li>
                    <li>
                      对考试理解程度不够深刻<br />，
                    学科能力欠缺，对考点<br />
                      知识点不精通，业务能力<br />
                      有待提高
                    </li>
                    <li>
                      教师自备讲义，无教辅产<br />
                      品，无对口教材
                    </li>
                  </ul>
                  <ul>
                    <li>
                      VIP 550元/h
                    </li>
                    <li>
                      线下面授<br />
                      中教线上录播课程仅做辅助
                    </li>
                    <li>
                      学科教师匹配均衡，但教师<br />
                      团队重组中，师资不稳定并<br />
                      暂无学科领头人
                    </li>
                    <li>
                      学生管理严格程度一般，学<br />
                      生情况反馈及后续跟进体系<br />
                      较为完善但没有学生反馈
                    </li>
                    <li>
                      咨询人员不负责学科规划；<br />
                      几乎不接收不具备国际高中<br />
                      学习背景的学生；
                    </li>
                    <li>
                      具有对口教材，无教辅产品
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="comparison_footer">
        </div>
      </section>
    )
  }
}

export default ShudaiComparison;