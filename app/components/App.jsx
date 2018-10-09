import React from 'react';
import {connect} from 'react-redux';
import '../assets/sass/main_styles.sass';
import '../assets/sass/ie_styles.sass';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, resetGame, initializegame, startgame, updateTimer, pauseTimer, unpauseTimer, passquiz} from './../reducers/actions';
import {GO_LEFT, GO_RIGHT} from '../constants/constants.jsx';
import SCORM from './SCORM.jsx';
import Controls from './Controls.jsx';
import Quiz from './Quiz.jsx';
import ModalGameEnd from './ModalGameEnd.jsx';
import ModalGameStart from './ModalGameStart.jsx';
import ModalGameInfo from './ModalGameInfo.jsx';
import ModalGameProgress from './ModalGameProgress.jsx';
import ModalGameReset from './ModalGameReset.jsx';
import ModalGameStop from './ModalGameStop.jsx';
import ModalCredits from './ModalCredits.jsx';
import FinishScreen from './FinishScreen.jsx';
import Dark from './Dark.jsx';
import * as I18n from '../vendors/I18n.js';
import user_config from '../config/config_vars.json';

//first require the default config_ui, in a later step if it is allowed by config
//we will change it if indicated in the URL
const CONFIG_UI = require('../config/examples/'+user_config.config_ui);

const INITIAL_STATE = {intervalId: 0, showModalStart:false, showModalInfo:false, showModalEnd:false, showModalProgress:false, showModalReset:false, showModalStop:false, showModalCredits:false, isFullScreen: false};

export class App extends React.Component {
  constructor(props){
    super(props);
    console.log(user_config);

    I18n.init();
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.startGame = this.startGame.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.requestFullScreen = this.requestFullScreen.bind(this);
    this.exitFullscreen = this.exitFullscreen.bind(this);
    this.fullscreenChange = this.fullscreenChange.bind(this);
    this.state = INITIAL_STATE;
    this.config_ui = CONFIG_UI;
    this.total_score = CONFIG_UI.questions.reduce((accumulator, currentValue) => { return accumulator + currentValue.score; }, 0);
  }
  resetState(){
    this.setState(INITIAL_STATE);
  }
  componentDidMount(){
    let new_questions = Utils.getUrlParameter('questions')
    console.log("Admits config by URL: " + GLOBAL_CONFIG.admits_url_config);
    console.log("yohoo: " + new_questions);
    if(GLOBAL_CONFIG.admits_url_config && new_questions){
      //try to fetch the questions from the URL given
      fetch(new_questions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("we have a URL, and we fetched it and got the result:");
          console.log(result);
          if(result.status && result.status === 500 || result.status === 404){
            this.props.dispatch(initializegame(this.config_ui.questions));
          } else {
            //POST the used URL to EducaInternet to save it
            /*
            fetch("http://localhost:3000/elab_url_file",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'text/plain'
                },
                method: "POST",
                body: JSON.stringify(result)
            })
            .then(function(res){ console.log(res) })
            .catch(function(res){ console.log(res) });
            */
            this.config_ui = result;
            this.props.dispatch(initializegame(result.questions));
          }
        },
        (error) => {
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          console.log("ERROR IN FETCH, go with default questions. The error was: " + error);
          this.props.dispatch(initializegame(this.config_ui.questions));
        }
      );
    } else {
      this.props.dispatch(initializegame(this.config_ui.questions));
    }
    let myinterval = setInterval(() => this.props.dispatch(updateTimer()), 1000);
    this.setState({intervalId: myinterval});
    window.addEventListener('fullscreenchange', this.fullscreenChange);
    window.addEventListener('webkitfullscreenchange', this.fullscreenChange);
    window.addEventListener('mozfullscreenchange', this.fullscreenChange);
    window.addEventListener('MSFullscreenChange', this.fullscreenChange);
  }
  componentWillUnmount() {
    window.removeEventListener('fullscreenchange', this.fullscreenChange);
    window.removeEventListener('webkitfullscreenchange', this.fullscreenChange);
    window.removeEventListener('mozfullscreenchange', this.fullscreenChange);
    window.removeEventListener('MSFullscreenChange', this.fullscreenChange);
  }
  componentWillUnmount(){
    console.log("CLEAR INTERVAL!");
    clearInterval(this.state.intervalId);
  }
  startGame(){
    this.props.dispatch(startgame());
  }
  handleKeyPress(event) {
    if(event.key == "ArrowRight"){
      this.props.dispatch(passquiz(GO_RIGHT));
    }
    else if(event.key == "ArrowLeft"){
      this.props.dispatch(passquiz(GO_LEFT));
    }
  }
  handleCloseModal(name){
    if(name === "all"){
      this.setState(INITIAL_STATE);
    } else {
      let modalname = "showModal" + name;
      this.setState({[modalname]:false});
    }
    if(!this.props.game.game_ended){
      this.props.dispatch(unpauseTimer());
    }
  }
  showModal(name){
    let modalname = "showModal" + name;
    this.props.dispatch(pauseTimer());
    this.setState({[modalname]:true});
  }
  componentWillReceiveProps(nextProps){
    if(this.props.game.game_started === false && nextProps.game.game_started === true){
      this.setState({showModalStart:true});
    }
    if(this.props.game.game_ended === false && nextProps.game.game_ended === true){
      this.setState({showModalEnd:true});
    }
  }
  requestFullScreen(){
    if(document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if(document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen();
    } else if(document.body.webkitRequestFullscreen) {
      document.body.webkitRequestFullscreen();
    } else if(document.body.msRequestFullscreen) {
      document.body.msRequestFullscreen();
    }
  }
  exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
    	document.msExitFullscreen();
    }
  }
  fullscreenChange(){
    //this method is called whenever a fullscreenChange event is fired.
    //we change state here and not in the other methods because fullscreen can be toggled also with keys, not only buttons
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      console.log("no fullscreen");
      this.setState({isFullScreen:false});
    } else{
      console.log("fullscreen");
      this.setState({isFullScreen:true});
    }
  }
  render(){
    let user_score = this.props.game.questions.reduce((accumulator, currentValue) => { return accumulator + currentValue.score_accomplished; }, 0);
    let showDarkLayer = this.state.showModalStart || this.state.showModalInfo || this.state.showModalProgress || this.state.showModalReset || this.state.showModalStop || this.state.showModalEnd || this.state.showModalCredits;
    return (

      <div id="container" onKeyDown={(e) => this.handleKeyPress(e)} tabIndex="0" >
        <div className="main_header">
          <div className="main_logo">
            <img className="fake_detector_logo" src={GLOBAL_CONFIG.BASIC_UI.app_logo}/>
            <div className="detector_type_text">{this.config_ui.type_app_text}</div>
            {this.config_ui.with_extra_logo &&
              <a href={this.config_ui.extra_logo_url} target="_blank"><img className="logo ssb_logo" src={this.config_ui.extra_logo_src}/></a>}
            {/* {this.props.config_ui.with_extra_logo ? <a href="https://saludsinbulos.com/" target="_blank"><img className="logo ssb_logo" src={GLOBAL_CONFIG.BASIC_UI.extra_logo}/></a> : ""} */}
          </div>
          <div className="educalab">
            <p className="text_educalab">{GLOBAL_CONFIG.BASIC_UI.elab_text}</p>
            <a href="http://educainternet.es/elab" target="_blank"><img className="educalab_logo" src={GLOBAL_CONFIG.BASIC_UI.elab_logo}/></a>
          </div>
        </div>
        {this.props.tracking.finished ?
          <FinishScreen tracking={this.props.tracking} I18n={I18n} config_ui={this.config_ui}/>:
          <Quiz dispatch={this.props.dispatch} game={this.props.game} index={this.props.game.index} questions={this.props.game.questions} config_ui={this.config_ui}/>
        }
        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        <ModalGameStart show={this.state.showModalStart} handleClose={this.handleCloseModal} questions={this.props.game.questions} config_ui={this.config_ui}/>
        <ModalGameInfo show={this.state.showModalInfo} handleClose={this.handleCloseModal} config_ui={this.config_ui}/>
        <ModalGameProgress show={this.state.showModalProgress} dispatch={this.props.dispatch} handleClose={this.handleCloseModal} user_score={user_score} total_score={this.total_score} questions={this.props.game.questions} index={this.props.game.index} config_ui={this.config_ui}/>
        <ModalGameReset resetState={this.resetState} dispatch={this.props.dispatch} show={this.state.showModalReset} handleClose={this.handleCloseModal} config_ui={this.config_ui}/>
        <ModalGameEnd resetState={this.resetState} dispatch={this.props.dispatch} show={this.state.showModalEnd} handleClose={this.handleCloseModal} user_score={user_score} total_score={this.total_score} questions={this.props.game.questions} index={this.props.game.index} time={this.props.game.time} config_ui={this.config_ui}/>
        <ModalGameStop resetState={this.resetState} dispatch={this.props.dispatch} show={this.state.showModalStop} handleClose={this.handleCloseModal} questions={this.props.game.questions} game_ended={this.props.game.game_ended} config_ui={this.config_ui}/>
        <ModalCredits show={this.state.showModalCredits} handleClose={this.handleCloseModal} config_ui={this.config_ui}/>
        {this.props.tracking.finished ? null : <Controls game={this.props.game} isFullScreen={this.state.isFullScreen} requestFullScreen={this.requestFullScreen} exitFullscreen={this.exitFullscreen} tracking={this.props.tracking} startGame={this.startGame} showModal={this.showModal} user_profile={this.props.user_profile} user_score={user_score} total_score={this.total_score} tracking={this.props.tracking} dispatch={this.props.dispatch} config={GLOBAL_CONFIG} config_ui={this.config_ui}/>}
        <Dark show={showDarkLayer} onClick={() => this.handleCloseModal("all")}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);
