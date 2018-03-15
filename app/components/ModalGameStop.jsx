import React from 'react';
import {initgame, endgame} from './../reducers/actions';
import {QUESTIONS} from '../config/questions.js';
import Modal from './Modal.jsx';
import Icon from './Icon.jsx';

export default class ModalGameStop extends React.Component {
  constructor(props){
    super(props);
    this.endGame = this.endGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  endGame(){
    this.props.handleClose("Stop");
    this.props.dispatch(endgame());
  }
  resetGame(){
    this.props.handleClose("Stop");
    this.props.dispatch(initgame(QUESTIONS));
    this.props.resetState();
  }
  render(){
    let text = this.props.game_ended ? "¿deseas finalizar revisión del feedback y reiniciar juego?" : "¿estás seguro de que quieres parar y finalizar la prueba? todavía tienes preguntas sin contestar:";
    return (
      <Modal show={this.props.show} >
         <div className="modal-box">
           <div className="close-modal-cross">
            <Icon className="control control_cross" onClick={ () => this.props.handleClose("Stop")} icon="cross"/>
           </div>
             <div className="modal-content">
              <div className="modal-title">finalizar la prueba</div>
                <div className="modal-text">
                  <p>{text}</p>
                  <div className="task-list">
                    {this.props.questions.map((q, index) => {
                      let success = q.user_answer === q.true_or_false;
                      return <div className="individual_task" key={index}>
                        <span className="individual_task_text" onClick={ () => this.questionClick(index)}>{q.source_name}</span>
                        <div className="task-icons">
                          <Icon className={"control control_feedback control_wrong " 
                         + (q.answered ? (success ? "":"wrong") : "")} icon="cross"/>
                          <Icon className={"control control_feedback control_right " 
                         + (q.answered ? (success ? "right":"") : "")} icon="tick"/>
                        </div>
                      </div>;
                    })
                    }
                  </div>
                </div>
                <div className="modal-actions">
                  <div className="btn btn-red" onClick={ () => this.props.handleClose("Stop")}>cancelar</div>
                  {this.props.game_ended ?
                  <div className="btn btn-green" onClick={this.resetGame}>aceptar</div> :
                  <div className="btn btn-green" onClick={this.endGame}>aceptar</div>
                  }
                </div>
             </div>
         </div>
      </Modal>
    );
  }
}