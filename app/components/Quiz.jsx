import React from 'react';
import {UI} from '../config/config.js';
import {QUESTIONS} from '../config/questions.js';
import Animation from './Animation.jsx';
import {stopAnimation, addObjectives} from './../reducers/actions';
import * as Utils from '../vendors/Utils.js';


export default class Quiz extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    // Create objectives (One per question included in the quiz)
    let objectives = [];
    let nQuestions = QUESTIONS.length;
    for(let i = 0; i < nQuestions; i++){
      objectives.push(new Utils.Objective({id:("Question" + (i + 1)), progress_measure:(1 / nQuestions), score:(1 / nQuestions)}));
    }
    this.props.dispatch(addObjectives(objectives));
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
        feedback2 = "la web es real";
        feedback2_class = "question right_question";
      } else {
        feedback2 = "la web es falsa";
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

      let feedback_component = <div className={"feedback_header " + feedback1_class}>{feedback1 + ": " + feedback2}</div>;
      let nav_img = (question.secure === true) ? "assets/images/others/secure_nav.png" : "assets/images/others/no_secure_nav.png";

      return (
          <div className="main_box">
          {show_feedback ? feedback_component : null}
          <Animation dispatch={this.props.dispatch} show={question.show_animation} feedback1={feedback1} feedback2={feedback2} index={this.props.index} className1={feedback1_class} className2={feedback2_class}/>
          <div className={"nav_box " + (show_feedback ? "with_feedback" : "") }>
            <div className="nav_position">
              <img className="nav_image" src={nav_img}/>
              <span className="nav_url" style={urlStyle}>{question.source_url}</span>
            </div>
          </div>
            <div className="image_box">
              <img className="quiz_image" src={show_feedback ? question.feedback_path:question.path}/>
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
