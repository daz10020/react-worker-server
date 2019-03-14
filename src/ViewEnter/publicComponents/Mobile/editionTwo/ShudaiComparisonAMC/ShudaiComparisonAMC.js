import React, { Component } from 'react';
import './ShudaiComparisonAMC.less'
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
              <li>教学<br />模式评价</li>
            </ul>
            <ul id="two">
              <li></li>
              <li>
                <h3>菠萝在线</h3>
              </li>
              <li>
                一对一课程中菠萝在线性价比<br />
                最高<br />
              </li>
              <li>菠萝在线线上一对一教程辅导</li>
              <li>
                教师具有海外留学或国内重点<br />
                大学背景；<br />
                30:1的教师录取率，全职任教
              </li>
              <li>
                有专职班主任负责督导，与学<br />
                生和家长沟通反馈学习情况，<br />
                帮助学生调整状态
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
              <li>
                根据学生当前能力定制个性化<br />
                教学方案 
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
                      4500（元）
                    </li>
                    <li>录播课程</li>
                    <li>
                      有部分教师有过留学经历，<br/>但兼职教师过多，存在一门<br/>课程多个老师教的情况
                    </li>
                    <li>
                      督导和销售分离，但无班主<br/>任，可能没有办法顾及所有<br/>学生，无法对学生的学习状<br/>况进行及时反馈
                    </li>
                    <li>
                      对考试理解程度不够深刻，<br/>对考点不精通，详细内容需<br/>要与讲师进行沟通咨询
                    </li>
                    <li>
                      教师自备讲义，无教辅产品
                    </li>
                    <li>
                      所有学生进度相同
                    </li>
                  </ul>
                  <ul>
                    <li>
                     10999元<br/>
                    （4-6人班）
                    </li>
                    <li>
                      线下面授
                    </li>
                    <li>
                      全职教师，教师教学经历丰<br/>
                      富，但教师流动性较大，师<br/>
                      资力量不够稳定，排课时间<br/>
                      跨度大
                    </li>
                    <li>
                      有专门班主任。学生管理严<br/>
                      格程度一般，学生情况反馈<br/>
                      及后续跟进体系较为完善
                    </li>
                    <li>
                      咨询人员不负责学科规划，<br/>
                      几乎不接收不具备国际高中<br/>
                      学习背景的学生
                    </li>
                    <li>
                      教师自备讲义，有教辅产<br/>
                      品，需要提前与自己喜欢的<br/>
                      讲师预留时间
                    </li>

                    <li>
                      所有学生进度相同
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