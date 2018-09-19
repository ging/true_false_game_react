import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {animationEnded} from './../reducers/actions';

export default class Animation extends React.Component {
  constructor(props){
    super(props);
    this.hideContent = this.hideContent.bind(this);
    this.state = {isShown:false};
  }
  hideContent(){
    this.setState({isShown:false});
  }
  endAnimation(){
    this.props.dispatch(animationEnded(this.props.index));
  }
  componentWillReceiveProps(nextProps){
    if(this.props.show===false && nextProps.show === true){
      this.setState({isShown:true});
    }
  }
  render(){
    return (
           <CSSTransition
           in={this.state.isShown}
           timeout={1000}
           classNames="fade"
           onEntered={() =>this.hideContent()}
           onExited={() =>this.endAnimation()}>
            <div className="feedback-box">
              <div className={this.props.className1}>{this.props.feedback1}</div>
              <div className={this.props.className2}>{this.props.feedback2}</div>
            </div>
          </CSSTransition>);
  }
}
