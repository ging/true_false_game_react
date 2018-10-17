import React from 'react';
import {goToQuestion} from './../reducers/actions';
import Modal from './Modal.jsx';
import Icon from './Icon.jsx';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class ModalGameProgress extends React.Component {
  constructor(props){
    super(props);
    this.questionClick = this.questionClick.bind(this);
  }

  questionClick(index){
    this.props.handleClose("Progress");
    this.props.dispatch(goToQuestion(index));
  }

  render(){

    let question = this.props.questions[this.props.index];
    let questions_answered = this.props.questions.reduce((accumulator, currentValue) => {return currentValue.answered ? accumulator + 1 : accumulator;}, 0);
    let progress = question ? questions_answered : 0;

    return (
        <Modal show={this.props.show} >
          <div className="modal-box">
            <div className="close-modal-cross">
              <Icon className="control control_cross" onClick={ () => this.props.handleClose("Progress")} icon="cross"/>
            </div>


            <div className="modal-content">
              <div className="modal-title">progreso de la prueba</div>
                <div className="modal-text">
                  <p>{this.props.data.progress_text} {progress}/{this.props.questions.length}</p>
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
                <div className="btn btn-red" onClick={() => this.props.handleClose("Progress")}>cerrar</div>
              </div>
            </div>
          </div>
      </Modal>);
  }
}
