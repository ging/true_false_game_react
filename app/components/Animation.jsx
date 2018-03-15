import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {animationEnded} from './../reducers/actions';

export default class Animation extends React.Component {
  constructor(props){
    super(props);
    this.state = {isShown:false};
    this.hideContent = this.hideContent.bind(this);
  }
  hideContent(){
    this.setState({isShown:false});
    this.props.dispatch(animationEnded(this.props.index));
  }
  componentWillReceiveProps(nextProps){
    if(!this.props.show && nextProps.show === true){
      this.setState({isShown:true});
    }
  }
  render(){
    return (
           <CSSTransition
           in={this.props.show}
           timeout={1500}
           classNames="fade"
           onExited={ () => this.hideContent()}>
            <div className={ "feedback-box" + (this.state.isShown ? "" : " hide")}>
              <div className={ this.props.className1 + (this.state.isShown ? "" : " hide")}>{this.props.feedback1}</div>
              <div className={ this.props.className2 + (this.state.isShown ? "" : " hide")}>{this.props.feedback2}</div>
            </div>
          </CSSTransition>);
  }
}