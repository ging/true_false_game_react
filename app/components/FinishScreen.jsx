import React from 'react';
import {UI} from '../config/config.js';

export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
  }
  _getFinishScreenTitle(progress_measure, score){
    let finishTitleText;
    let hasProgressMeasure = (typeof progress_measure === "number");
    let hasScore = (typeof score === "number");
    if(hasProgressMeasure && hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_full", {progress_measure:(progress_measure * 100).toFixed(0), score:(score * 100).toFixed(0)});
    } else if(hasProgressMeasure){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_wpm", {progress_measure:(progress_measure * 100).toFixed(0)});
    } else if(hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_ws", {score:(score * 100).toFixed(0)});
    }
    if(typeof finishTitleText === "undefined"){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_simple");
    }
    return finishTitleText;
  }
  
  render(){
    let surv;
    if(UI.survey){
      surv = <div className="survey">por favor realiza esta <a className="background_color" href={UI.survey} target="_blank">encuesta</a> para ayudarnos a mejorar fakedetector</div>;
    }
    let finishTitleText = this._getFinishScreenTitle(this.props.tracking.progress_measure, this.props.tracking.score);
    return (
      <div className="main_box main_box_finished">
        <div className="main_text" id="finish_title">
        {surv}
        {finishTitleText}
        </div>
        }
      </div>
    );
  }
}
