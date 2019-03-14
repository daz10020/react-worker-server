import React, { Component } from 'react';
import './Carousel.less'

import left from './翻页按钮_左.png'
import right from './翻页按钮_右.png'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DistanceTwo: -16.4,
      ChangeTimeTwo: 0,
      activeIndexTwo: 1,
    };
    this.timerTwo = null
  }

  componentWillMount() {
    clearInterval(this.timerTwo)
  }
  componentDidMount() {
    this.timerTwo = setInterval(() => { this.AMNTwo(1) }, 4000)
    document.getElementById("cpnt").addEventListener('transitionend', () => {
      clearInterval(this.timerTwo)
      this.timerTwo = setInterval(() => { this.AMNTwo(1) }, 4000)
      // this.setState({
      //   EventStateTwo: "auto",
      // })
      if (this.state.activeIndexTwo === 3) {
        this.setState({
          DistanceTwo: -16.4,
          activeIndexTwo: 1,
          ChangeTimeTwo: 0,
        })
      }
      if (this.state.activeIndexTwo === 0) {
        this.setState({
          DistanceTwo: -16.4 * 2,
          activeIndexTwo: 2,
          ChangeTimeTwo: 0,
        })
      }
    }, false);
  }
  AMNTwo(num) {
    clearInterval(this.timerTwo)
    // this.setState({
    //   EventStateTwo: "none",
    // })
    if (num === 1) {
      this.setState({
        ChangeTimeTwo: 0.4,
        DistanceTwo: this.state.DistanceTwo - 16.4,
        activeIndexTwo: this.state.activeIndexTwo + num
      });
    } else {
      this.setState({
        ChangeTimeTwo: 0.4,
        DistanceTwo: this.state.DistanceTwo + 16.4,
        activeIndexTwo: this.state.activeIndexTwo + num
      })
    }
  }

  render() {
    return (
      <section className="MSider">
        <aside>
          <ul>
            <div>
              <img src={left} onClick={this.AMNTwo.bind(this, -1)}
                style={{ pointerEvents: this.state.EventStateTwo }} alt="" />
            </div>
            <li>
              <ol id="cpnt" style={{
                transform: `translateX(${this.state.DistanceTwo}rem)`,
                transition: `${this.state.ChangeTimeTwo}s`
              }}>
                <li>
                  <h2>什么是USAD竞赛</h2>
                  <b></b>
                  <ul>
                    <li>
                      <p>USAD即美国学术十项全能（United States Academic Decathlon），是美国首屈一指的高中生综合学术竞赛平台。<br />
                        通过多种形式的竞赛让学生在10个不同的学术范畴展示学生的知识和技能。USAD不仅对学生的学术才智和综合素质提出了要求，并且考验了学生的团队合作能力。</p>
                    </li>
                  </ul>
                </li>
                <li>
                  <h2>什么是USAP竞赛</h2>
                  <b></b>
                  <ul>
                    <li>
                      <p>
                        USAP即美国学术五项全能（United States Academic Pentathlon）是初中版的USAD，涵盖语言和文学、艺术、科学、社会科学和数学五种学科。USAP拥有独特的团队竞赛方式，主题性跨学科的竞赛内容和极高的学术价值，它通过多种形式的竞赛让学生在5个不同的学术范畴展示知识和技能，在学术方面充分开发潜力，实现自我超越，在学术多样化的前提下做到学术优秀。
                      </p>
                    </li>
                  </ul>

                </li>
                <li>
                  <h2>什么是USAD竞赛</h2>
                  <b></b>
                  <ul>
                    <li>
                      <p>USAD即美国学术十项全能（United States Academic Decathlon），是美国首屈一指的高中生综合学术竞赛平台。<br />
                        通过多种形式的竞赛让学生在10个不同的学术范畴展示学生的知识和技能。USAD不仅对学生的学术才智和综合素质提出了要求，并且考验了学生的团队合作能力。</p>
                    </li>
                  </ul>

                </li>
                <li>
                  <h2>什么是USAP竞赛</h2>
                  <b></b>
                  <ul>
                    <li>
                      <p>
                        USAP即美国学术五项全能（United States Academic Pentathlon）是初中版的USAD，涵盖语言和文学、艺术、科学、社会科学和数学五种学科。USAP拥有独特的团队竞赛方式，主题性跨学科的竞赛内容和极高的学术价值，它通过多种形式的竞赛让学生在5个不同的学术范畴展示知识和技能，在学术方面充分开发潜力，实现自我超越，在学术多样化的前提下做到学术优秀。
                      </p>
                    </li>
                  </ul>

                </li>
              </ol>
            </li>
            <div>
              <img className="rotate180" onClick={this.AMNTwo.bind(this, 1)} style={{ pointerEvents: this.state.EventStateTwo }} src={right} alt="" />
            </div>
          </ul>
        </aside>
      </section>
    )
  }
}

export default Demo;