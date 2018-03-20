import React from 'react';
import {CSSTransition} from 'react-transition-group';

export default class Dark extends React.Component {
  constructor(props){
    super(props);
    this.state = {in:false, hide: true};
    this.hideCompletely = this.hideCompletely.bind(this);
  }
  hideCompletely(){
    this.setState({hide:true});
  }
  componentWillReceiveProps(nextProps){
    if(this.props.show === false && nextProps.show === true){
      this.setState({in:true, hide: false});
    }
    if(this.props.show === true && nextProps.show === false){
      this.setState({in:false});
    }
  }
  render(){
    return (
           <CSSTransition
             in={this.state.in}
             timeout={500}
             classNames="fade"
             onExited={()=>this.hideCompletely()}>
            <div className={"dark-opacity " + (this.state.hide ? "hide" : "show")} onClick={this.props.onClick}/>
          </CSSTransition>);
  }
}
