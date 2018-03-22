import React from 'react';
import Modal from './Modal.jsx';
import Icon from './Icon.jsx';
import {UI} from '../config/config';

export default class ModalGameStart extends React.Component {
  constructor(props){
    super(props);
    this.state = {show_items: false};
    this.toggleItems = this.toggleItems.bind(this);
  }
  toggleItems(){
    this.setState({show_items: !this.state.show_items});
  }
  render(){
    return (
           <Modal show={this.props.show} >
              <div className="modal-box">
                <div className="close-modal-cross">
                  <Icon className="control control_cross" onClick={ () => this.props.handleClose("Start")} icon="cross"/>
                </div>
                  <div className="modal-content">
                     <div className="modal-title">instrucciones</div>
                     <div className="modal-text">
                       <p>{UI.modal_inst}</p>

                       <div className="task-list">
                          <div className="list-title" onClick={() => this.toggleItems()}>
                            <p className="list-title-text">{UI.task_list}</p>
                            <Icon className="control control_plus" icon="plus2"/>
                          </div>
                          <ul className={this.state.show_items ? "":"hide"}>
                            {this.props.questions.map((q,index) => {return <li key={index}>- {q.source_name}</li>;})
                            }
                          </ul>
                       </div>
                       <ul className="icon_list">
                        <li><Icon className="control control_info" icon="info"/>muestra las instrucciones</li>
                        <li><Icon className="control control_progress" icon="progress"/>muestra el progreso</li>
                        {UI.with_reset_button &&
                          <li><Icon className="control control_reset" icon="reset"/>reinicia la prueba</li>}
                        <li><Icon className="control control_stop" icon="stop"/>finaliza la prueba</li>
                       </ul>
                     </div>
                    <div className="modal-actions">
                      <div className="btn btn-red" onClick={() => this.props.handleClose("Start")}>cerrar</div>
                    </div>
                  </div>
              </div>
          </Modal>);
  }
}
