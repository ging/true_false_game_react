import React from 'react';
import Modal from './Modal.jsx';
import Icon from './Icon.jsx';
 
export default class ModalCredits extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
           <Modal show={this.props.show} >
              <div className="modal-box">
                <div className="close-modal-cross">
                  <Icon className="control control_cross" onClick={ () => this.props.handleClose("Credits")} icon="cross"/>
                </div>
                  <div className="modal-content">
                     <div className="modal-title">créditos</div>
                     <div className="modal-text">
                       <p>aplicación de <img className="e_logo" src="assets/images/logos/elab_logo_black.svg"/>, desarrollada por el Grupo Internet de Nueva Generación de la UPM, con el apoyo institucional del INCIBE, el CRIF las Acacias y Orange.</p>
                     </div>
                     <div className="logos">
                        <a href="http://www.upm.es/" target="_blank"><img className="logo upm_logo" src="assets/images/logos/upm_logo.png"/></a>
                       <a href="https://www.orange.es/" target="_blank"><img className="logo orange_logo" src="assets/images/logos/orange_logo.png"/></a>
                       <a href="https://www.incibe.es/" target="_blank"><img className="logo incibe_logo" src="assets/images/logos/incibe_logo.svg"/></a>
                       <a href="http://crif.acacias.educa.madrid.org" target="_blank"><img className="logo crif_logo" src="assets/images/logos/crif_logo.png"/></a>
                     </div>
                     <div className="modal-title">licencia</div>
                     <div className="modal-text">
                       <p>esta obra está bajo una <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">licencia de Creative Commons Reconocimiento-NoComercial 4.0 Internacional.</a> <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank"><img className="license_logo" src="assets/images/logos/license.png"/></a></p>
                     </div>
                    {/*<div className="modal-actions">
                      <div className="btn btn-red" onClick={() => this.props.handleClose("Credits")}>cerrar</div>
                    </div>*/}
                  </div>
              </div>
          </Modal>);
  }
}