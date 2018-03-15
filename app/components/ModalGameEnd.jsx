import React from 'react';
import {initializegame} from './../reducers/actions';
import {QUESTIONS} from '../config/questions.js';
import Modal from './Modal.jsx';
import Icon from './Icon.jsx';

export default class ModalGameEnd extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.handleClose("End");
    this.props.dispatch(initializegame(QUESTIONS));
    this.props.resetState();
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
      message = "eres un crack, ¡a ti no hay quien te engañe! sabemos que no necesitas que te enseñemos cómo reconocer fuentes fiables, pero aquí te dejamos un pequeño vídeo por si quieres saber más:";
    } else if(this.props.user_score > this.props.total_score*0.5){
      message = "lo has hecho bastante bien, pero has fallado algunas. Revisa el siguiente video para aprender a detectar fuentes fiables:";
    } else {
      message = "No has acertado muchas. Es muy importante detectar bien las fuentes fiables para una navegación segura. Te dejamos un video para que aprendas a detectarlas:";
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
                <div className="btn btn-red" onClick={this.handleClick}>reiniciar</div>
                <div className="btn btn-green" onClick={ () =>this.props.handleClose("End")}>ver feedback</div>
              </div>
           </div>
        </div>
    </Modal>);
  }
}
