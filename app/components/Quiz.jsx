import React from 'react';
import {UI} from '../config/config.js';
import * as questions from '../config/questions.js';
import Animation from './Animation.jsx';
import {stopAnimation, addObjectives, addSizes} from './../reducers/actions';
import * as Utils from '../vendors/Utils.js';

const QUESTIONS = questions[UI.question_array];


export default class Quiz extends React.Component {
  constructor(props){
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.calculateImgsSizes = this.calculateImgsSizes.bind(this);
    this.total_score = QUESTIONS.reduce((accumulator, currentValue) => { return accumulator + currentValue.score; }, 0);
  }
  updateDimensions() {
    if(this.img && this.box){
      let question = this.props.questions[this.props.index]
      let imgaspect = question.width/question.height;
      let boxaspect = this.box.clientWidth/this.box.clientHeight;
      //console.log("ratio natural: " + imgaspect);
      //console.log("ratio box: " + boxaspect);
      if(imgaspect > boxaspect){
        this.img.style.height = (this.box.offsetHeight - this.nav.clientHeight -7) + "px";
        this.img.style.width = "auto";
      } else {
        this.img.style.height = "";
        this.img.style.width = "";
      }
    }
  }
  calculateImgsSizes(){
    let nQuestions = QUESTIONS.length;
    let processed = 0;
    let sizes = [];
    for(let i = 0; i < nQuestions; i++){
      let img = new Image();

      img.onload = function(){
        let height = img.height;
        let width = img.width;
        console.log("width: " + width + " hei: " + height);
        // code here to use the dimensions
        processed +=1;
        sizes[+img.id] = {width: width, height: height};
        if(processed===QUESTIONS.length){
          console.log(sizes);
          this.props.dispatch(addSizes(sizes));
        }
      }.bind(this);
      img.id = i;
      img.src = QUESTIONS[i].path;
    }

  }
  componentDidMount(){
    // Create objectives (One per question included in the quiz)
    let objectives = [];
    let nQuestions = QUESTIONS.length;
    for(let i = 0; i < nQuestions; i++){
      objectives.push(new Utils.Objective({id:("Question" + (i + 1)), progress_measure:(1 / nQuestions), score:(QUESTIONS[i].score / this.total_score)}));
    }
    this.props.dispatch(addObjectives(objectives));
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    this.calculateImgsSizes();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.index !==this.props.index){
      this.updateDimensions();
    }
  }
  render(){
    let question = this.props.questions[this.props.index];
    if(this.props.game.game_started && question){
      let answer_right = question.answered && question.score === question.score_accomplished;
      let answer_wrong = question.answered && question.score !== question.score_accomplished;
      let feedback1, feedback2, feedback1_class, feedback2_class;

      if(answer_right){
        feedback1 = "has acertado";
        feedback1_class = "user_answer user_right_answer";
      } else if(answer_wrong){
        feedback1 = "has fallado";
        feedback1_class = "user_answer user_wrong_answer";
      } else {
        feedback1 = "no has respondido esta pregunta";
        feedback1_class = "user_answer user_not_answer";
      }

      if(question.true_or_false){
        feedback2 = UI.feedback2_right;
        feedback2_class = "question right_question";
      } else {
        feedback2 = UI.feedback2_wrong;
        feedback2_class = "question wrong_question";
      }

      let urlStyle = {
        left: (question.secure === true) ? "14.5%" : "7%"
      };


      let show_feedback;
      if(this.props.game.game_ended || (question.answered && answer_wrong) || (question.answered && answer_right && question.show_animation === false)){
        show_feedback =true;
      } else {
        show_feedback = false;
      }

      let margin1 = this.nav ? this.nav.clientHeight:70;
      let margin2 = show_feedback ? (this.feedback ? this.feedback.clientHeight:61):0;
      let margin = margin1 + margin2 + "px";
      let imgboxstyle = {marginTop: margin};


      let feedback_component = <div className={"feedback_header " + feedback1_class} ref={(feedback) => { this.feedback = feedback; }}>{feedback1 + ": " + feedback2}</div>;
      let nav_img = (question.secure === true) ? "assets/images/others/secure_nav.png" : "assets/images/others/no_secure_nav.png";
      let feedback_iframe;
      if(question.type ==="iframe" && show_feedback){
        if(question.true_or_false === false){
          feedback_iframe = <div className="feedback_iframe">En este caso la noticia es falsa.<br/> Es un bulo sobre la salud como hay muchos. Conviene contrastar la información y con una simple búsqueda en Internet podremos ver que es falsa, por ejemplo <a href={question.feedback_search} target="_blank">con esta simple búsqueda</a>.<br/>Podremos encontrar webs muy útiles dedicadas a desmentir este tipo de bulos, por ejemplo este nos lo desmienten en <a href={question.feedback_path} target="_blank">{question.feedback_sitename}</a></div> ;
        } else {
          feedback_iframe = <div className="feedback_iframe">En este caso la noticia es verdadera. Fíjate que viene de un medio reputado y que si buscas en Internet información adicional verás la noticia en diferentes webs y periódicos también de prestigio.</div> ;
        }
      }


      return (
          <div className="main_box" ref={(box) => { this.box = box; }}>
            {show_feedback ? feedback_component : null}
            <Animation dispatch={this.props.dispatch} show={question.show_animation} feedback1={feedback1} feedback2={feedback2} index={this.props.index} className1={feedback1_class} className2={feedback2_class}/>
            <div className={"nav_box " + (show_feedback ? "with_feedback" : "") }>
              <div className="nav_position" ref={(nav) => { this.nav = nav; }}>
                <img className="nav_image" src={nav_img} />
                <span className="nav_url" style={urlStyle}>{question.source_url}</span>
              </div>
            </div>
            <div className="image_box" style={imgboxstyle}>
              {question.type ==="iframe" ?
                <iframe src={question.path} class="eduiframe"></iframe>
              :<img ref={(img) => { this.img = img; }} className={"quiz_image" + (question.with_margins ? " with_margins":"")} src={show_feedback ? question.feedback_path:question.path} />
            }
            {question.type ==="iframe" && show_feedback &&
              feedback_iframe
            }
            </div>
          </div>
      );
    }
    return (
        <div className="main_box" ref={(box) => { this.box = box; }}>
          <p className="main_text">{UI.initial_text}</p>
        </div>
    );

  }
}
