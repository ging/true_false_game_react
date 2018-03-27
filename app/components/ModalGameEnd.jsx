import React from 'react';
import {initializegame, finishApp} from './../reducers/actions';
import {QUESTIONS} from '../config/questions.js';
import Modal from './Modal.jsx';
import Icon from './Icon.jsx';
import {UI} from '../config/config.js';

export default class ModalGameEnd extends React.Component {
  constructor(props){
    super(props);
    this.resetClick = this.resetClick.bind(this);
    this.finishGame = this.finishGame.bind(this);
  }
  resetClick(){
    this.props.handleClose("End");
    this.props.dispatch(initializegame(QUESTIONS));
    this.props.resetState();
  }
  finishGame(){
    this.props.handleClose("End");
    this.props.dispatch(finishApp(true));
  }
  render(){

    let question = this.props.questions[this.props.index];
    let questions_right_answered = this.props.questions.reduce((accumulator, currentValue) => {
      return (currentValue.answered && currentValue.user_answer===currentValue.true_or_false) ? accumulator + 1 : accumulator;
    }, 0);
    let correct = question ? questions_right_answered : 0;
    let minutes = Math.floor(this.props.time / 60);
    let seconds = this.props.time - minutes * 60;
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    let clock;
    if(minutes>0){
      clock = minutes + ":" + seconds;
    } else {
      clock = seconds;
    }
    let message;
    if(this.props.user_score > this.props.total_score*0.7){
      message = UI.message_pro;
    } else if(this.props.user_score > this.props.total_score*0.5){
      message = UI.message_good;
    } else {
      message = UI.message_ok;
    }

    return (
       <Modal show={this.props.show} >
       <div className="modal-box">
          <div className="close-modal-cross">
              <Icon className="control control_cross" onClick={ () => this.props.handleClose("End")} icon="cross"/>
            </div>
           <div className="modal-content">
              <div className="modal-title modal-title-end">¡enhorabuena! terminaste</div>
                <div className="modal-text">
                  <div className="final_score">
                    <div className="individual_score"><span className="number_score">{clock}</span> <span className="text_score">tiempo</span></div>
                    <div className="individual_score"><span className="number_score">{correct}/{QUESTIONS.length}</span> <span className="text_score">aciertos</span></div>
                    <div className="individual_score"><span className="number_score">{this.props.user_score}</span> <span className="text_score">puntos</span></div>
                  </div>
                  <p>{message}</p>
                  <div className="responsive_video">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/GKSRyLdjsPA" frameBorder="0" allow="encrypted-media" allowFullScreen />
                  </div>
                </div>
              <div className="modal-actions">
                {UI.with_reset_button ?
                  <div className="btn btn-red" onClick={this.resetClick}>reiniciar</div>:
                  <div className="btn btn-red" onClick={this.finishGame}>terminar</div>}
                <div className="btn btn-green" onClick={ () =>this.props.handleClose("End")}>ver feedback</div>
              </div>
           </div>
        </div>
    </Modal>);
  }
}
