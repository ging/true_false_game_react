import React from 'react';
import {CSSTransition} from 'react-transition-group';

export default class Dark extends React.Component {
  constructor(props){
    super(props);
    this.state = {isShown:false};
    this.hideContent = this.hideContent.bind(this);
  }
  hideContent(){
    this.setState({isShown:false});
  }
  componentWillReceiveProps(nextProps){
    if(this.props.show === false && nextProps.show === true){
      this.setState({isShown:true});
    }
  }
  render(){
    return (
           <CSSTransition
           in={this.props.show}
           timeout={0}
           classNames="fade"
           onExited={() => this.hideContent()}>
            <div className={"dark-opacity " + (this.state.isShown ? "show" : "hide")} onClick={this.props.onClick}/>
          </CSSTransition>);
  }
}