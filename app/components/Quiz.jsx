import React from 'react';
import {UI} from '../config/config.js';
import {QUESTIONS} from '../config/questions.js';
import Animation from './Animation.jsx';
import {stopAnimation} from './../reducers/actions';


export default class Quiz extends React.Component {
  constructor(props){
    super(props);
    this.state = {showAnimation:false};
  }
  componentWillReceiveProps(nextProps){
    let question = nextProps.questions[nextProps.index];
    let old_question = this.props.questions[this.props.index];
    if(nextProps.game_started && question && question.show_animation && !old_question.show_animation){
      this.setState({showAnimation:true});
      setTimeout(() => {
        this.setState({showAnimation:false});
      }, 0);
    }
  }
  render(){
    let question = this.props.questions[this.props.index];
    if(this.props.game_started && question){
      let answer_right = question.answered && question.score === question.score_accomplished;
      let answer_wrong = question.answered && question.score !== question.score_accomplished;
      let feedback1, feedback2, feedback1_class, feedback2_class;

      if(answer_right){
        feedback1 = "has acertado";
        feedback1_class = "user_answer user_right_answer";
      } else if(answer_wrong){
        feedback1 = "has fallado";
        feedback1_class = "user_answer user_wrong_answer";
      }
      if(question.true_or_false){
        feedback2 = "la noticia es verdadera";
        feedback2_class = "question right_question";
      } else {
        feedback2 = "la noticia es falsa";
        feedback2_class = "question wrong_question";
      }

      let feedback_component = <div className={"feedback_header " + feedback1_class}>{feedback1 + ": " + feedback2}</div>;
      let with_feedback = (question.answered && question.show_animation === false) ? "with_feedback" : "";

      let nav_img = (question.secure === true) ? "assets/images/others/secure_nav.png" : "assets/images/others/no_secure_nav.png";

      let urlStyle = {
        left: (question.secure === true) ? "14.5%" : "7%"
      };

      return (
          <div className="main_box">
          {(question.answered && question.show_animation === false) ? feedback_component : null}
          <Animation dispatch={this.props.dispatch} show={this.state.showAnimation} feedback1={feedback1} feedback2={feedback2} index={this.props.index} className1={feedback1_class} className2={feedback2_class}/>
          <div className={"nav_box " + with_feedback}>
            <div className="nav_position">
              <img className="nav_image" src={nav_img}/>
              <span className="nav_url" style={urlStyle}>{question.source_url}</span>
            </div>
          </div>
            <div className="image_box">
              <img className="quiz_image" src={question.answered ? question.feedback_path : question.path}/>
            </div>
          </div>
      );
    }
    return (
        <div className="main_box">
          <p className="main_text">{UI.initial_text}</p>
        </div>
    );

  }
}
