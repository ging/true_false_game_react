import React from 'react';
import {UI} from '../config/config';
import {initializegame} from './../reducers/actions';
import Modal from './Modal.jsx';
import Icon from './Icon.jsx';

export default class ModalGameReset extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.handleClose("Reset");
    this.props.dispatch(initializegame(this.props.questions));
    this.props.resetState();
  }
  render(){
    return (
       <Modal show={this.props.show} >
       <div className="modal-box">
         <div className="close-modal-cross">
            <Icon className="control control_cross" onClick={ () => this.props.handleClose("Reset")} icon="cross"/>
          </div>
           <div className="modal-content">
              <div className="modal-title">reiniciar la prueba</div>
                <div className="modal-text">
                  <p>¿estás seguro de que quieres reiniciar la prueba? esta acción eliminará todo tu progreso.</p>
                </div>
              <div className="modal-actions">
                <div className="btn btn-red" onClick={() => this.props.handleClose("Reset")}>cancelar</div>
                <div className="btn btn-green" onClick={this.handleClick}>aceptar</div>
              </div>
           </div>
       </div>
      </Modal>);
  }
}
