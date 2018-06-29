import React from 'react';
import {UI} from '../config/config';
import {quizAnsweredWithScorm, passquiz} from './../reducers/actions';
import {GO_LEFT, GO_RIGHT} from '../constants/constants.jsx';
import Icon from './Icon.jsx';

export default class Controls extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {show_items: false};
    this.toggleMenuMob = this.toggleMenuMob.bind(this);
    this.hideMenuMob = this.hideMenuMob.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.requestFullScreen = this.requestFullScreen.bind(this);
  }
  toggleMenuMob(){
    console.log("toggle menu");
    this.setState({show_items: !this.state.show_items});
  }
  hideMenuMob(){
    if(this.state.show_items===true){
      this.setState({show_items: false});
    }
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  setWrapperRef(node) {
    console.log("setWrapperRef");
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (!this.wrapperRef || this.wrapperRef.contains(event.target)) {
       console.log("no menu, or click on the menu, no handleClickOutside");
       return;
     }
     this.hideMenuMob();
   }
  handleClick(button_clicked){
    switch (button_clicked){
    case true:
    case false:
      this.props.dispatch(quizAnsweredWithScorm(this.props.game.index, button_clicked, this.props.game.questions[this.props.game.index]));
      break;
    case GO_LEFT:
    case GO_RIGHT:
      this.props.dispatch(passquiz(button_clicked));
      break;
    default:
      break;
    }
  }
  requestFullScreen(){
    console.log("req")
  }
  render(){
    let fullscreenEnabled = UI.with_fullscreen && (document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled);
    if (!fullscreenEnabled) {
      console.log("Browser does not support fullscreen, or it is disabled by the app, we disable the button");
    }

    let loggedText;
    let trackingTexts = [];

    if(typeof this.props.tracking.progress_measure === "number"){
      trackingTexts.push("Progreso: " + (this.props.tracking.progress_measure * 100) + "%");
    } else {
      trackingTexts.push("Progreso: null");
    }
    if(typeof this.props.tracking.score === "number"){
      trackingTexts.push("Puntuación: " + (this.props.tracking.score * 100) + "%");
    } else {
      trackingTexts.push("Puntuación: null");
    }
    if(this.props.user_profile){
      if((typeof this.props.user_profile.name === "string")){
        loggedText = ("Logged as " + this.props.user_profile.name);
      }
      if(typeof this.props.user_profile.learner_preference === "object"){
        if(typeof this.props.user_profile.learner_preference.difficulty === "number"){
          trackingTexts.push("Difficulty: " + this.props.user_profile.learner_preference.difficulty);
        }
      }
    }

    let loggedEl = null;
    if(typeof loggedText === "string"){
      loggedEl = <span id="logged_user">{loggedText}</span>;
    }
    let trackingEls = trackingTexts.map(function(text, index){
      return <span key={index}>{text}</span>;
    });
    let question = this.props.game.questions[this.props.game.index];
    let questions_answered = this.props.game.questions.reduce((accumulator, currentValue) => {return currentValue.answered ? accumulator + 1 : accumulator;}, 0);
    let button_false_extra_class = (question && question.answered && question.user_answer === false) ? "button_pressed" : "";
    let button_true_extra_class = (question && question.answered && question.user_answer === true) ? "button_pressed" : "";
    let disabled_extra_class = (question && question.answered) || this.props.game.game_ended ? "disabled" : "";
    let is_arrow_disabled = this.props.game.enable_buttons ? "":"disabled";
    let progress = question ? questions_answered : 0;
    let progressStyle = {
      width: Math.floor(105*questions_answered/this.props.game.questions.length) + "%"
    };
    let minutes = Math.floor(this.props.game.time / 60);
    let seconds = this.props.game.time - minutes * 60;
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    let clock;
    if(minutes>0){
      clock = minutes + ":" + seconds;
    } else {
      clock = seconds;
    }

    let finalStyleAppControls = {
      marginRight: "1.7em",
      marginLeft: "1.5em"
    };

    let finalStyleMenu = {
      width: 0,
      marginRight: 0,
    };

    let mobileMenuTop = {
      top: "-8.7em"
    };
    if((!UI.with_reset_button && fullscreenEnabled) || (UI.with_reset_button && !fullscreenEnabled)){
      mobileMenuTop = {top: "-7.1em"};
    } else if(!UI.with_reset_button && !fullscreenEnabled) {
      mobileMenuTop = {top: "-5.4em"};
    }

    return (
      <div className="control_box">
          {this.props.game.game_started ?
            (<div className="control_bar">

              <div className="controls_menu" style={this.props.game.game_ended ? finalStyleMenu : null}>
                <Icon className={this.props.game.game_ended ? "hide":"control control_info"} onClick={() => this.props.showModal("Info")} icon="info"/>
                <Icon className={this.props.game.game_ended ? "hide":"control control_progress"} onClick={() => this.props.showModal("Progress")} icon="progress" />
                {UI.with_reset_button &&
                  <Icon className={this.props.game.game_ended ? "hide":"control control_reset"} onClick={() => this.props.showModal("Reset")} icon="reset"/>}
                <Icon className="control control_stop" onClick={() => this.props.showModal("Stop")} icon="stop"/>
                  {fullscreenEnabled &&
                    (!this.props.isFullScreen ?
                      <Icon className="control control_fullscreen" onClick={() => this.props.requestFullScreen()} icon="full_screen"/>:
                      <Icon className="control control_nofullscreen" onClick={() => this.props.exitFullscreen()} icon="no_full_screen"/>)
                      }
              </div>

              <div ref={this.setWrapperRef} className="controls_menu_mob">
                <div className="control_main">
                  <Icon className={this.props.game.game_ended ? "hide" : "control control_burger"} onClick={() => this.toggleMenuMob()} icon="burger"/>
                  <Icon className={this.props.game.game_ended ? "control control_stop" : "hide"} onClick={() => this.props.showModal("Stop")} icon="stop"/>
                </div>

                <div className={this.state.show_items ? "controls_int":"controls_int hide"} style={mobileMenuTop}>
                  <Icon className="control control_info" onClick={() => this.props.showModal("Info")} icon="info_fill"/>
                  <Icon className="control control_progress" onClick={() => this.props.showModal("Progress")} icon="progress_fill" />
                  {UI.with_reset_button &&
                    <Icon className="control control_reset" onClick={() => this.props.showModal("Reset")} icon="reset_fill"/>}
                  <Icon className="control control_stop" onClick={() => this.props.showModal("Stop")} icon="stop_fill"/>
                    {fullscreenEnabled &&
                      (!this.props.isFullScreen ?
                        <Icon className="control control_fullscreen" onClick={() => this.props.requestFullScreen()} icon="full_screen_fill"/>:
                        <Icon className="control control_nofullscreen" onClick={() => this.props.exitFullscreen()} icon="no_full_screen_fill"/>)
                        }
                </div>
              </div>

              <div className="app_controls" style={this.props.game.game_ended ? finalStyleAppControls : null}>
                <Icon className={"control control_left_arrow " + is_arrow_disabled} onClick={() => this.handleClick(GO_LEFT)} icon="left_arrow"/>
                <Icon className={"control control_false " + button_false_extra_class + " " + disabled_extra_class} onClick={() => this.handleClick(false)} icon="false"/>
                <Icon className={"control control_true " + button_true_extra_class + " " + disabled_extra_class} onClick={() => this.handleClick(true)} icon="true"/>
                <Icon className={"control control_right_arrow " + is_arrow_disabled} onClick={() => this.handleClick(GO_RIGHT)} icon="right_arrow"/>
              </div>

              <div className={this.props.game.game_ended ? "hide":"progress_score"}>

                <div className="time_elapsed">
                  <div className="number_progress number_time">{clock}</div>
                  <div className="text_progress time_text">tiempo</div>
                </div>

                <div className="questions_answered">
                  <div className="number_progress number_answered">{progress}/{this.props.game.questions.length}</div>
                  <div className="progress_bar"><div className="progress_fill" style={progressStyle}></div></div>
                </div>

                <div className="user_score">
                  <div className="number_progress score_number">{this.props.user_score}</div>
                  <div className="text_progress score_text">puntuación</div>
                </div>

              </div>

              <div className={this.props.game.game_ended ? "feedback_revision":"hide"}><div className="feedback_text">revisión</div>
              </div>

            </div>
          ) : (
            <div className="control_bar">
              {!this.props.tracking.finished &&
                <div className="start_game">
                  <span className="start_game_text" onClick={this.props.startGame}>empezar prueba</span>
                  <Icon className="control control_start" onClick={this.props.startGame} icon="start"/>
                </div>
              }
              <div className="credits" onClick={() => this.props.showModal("Credits")}>créditos</div>
            </div>
        )}
      </div>
    );
  }
}
