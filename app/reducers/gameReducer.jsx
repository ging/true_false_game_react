import {INITIAL_STATE, OBJECTIVES} from '../constants/constants';
import {GO_LEFT, GO_RIGHT} from '../constants/constants.jsx';
import {GLOBAL_CONFIG} from '../config/config.js';


export default function gameReducer(state = INITIAL_STATE.game, action){
  let receivedState;
  switch (action.type){
  case 'INITIALIZE_GAME':
    receivedState = JSON.parse(JSON.stringify(INITIAL_STATE.game));
    let questions_final;
    if(action.questions.length > GLOBAL_CONFIG.n){
      questions_final = action.questions.sort(() => .5 - Math.random()).slice(0,GLOBAL_CONFIG.n);
    }
    receivedState.questions = questions_final.map((q, index) => {
      q.id = index;
      q.score_accomplished = 0;
      q.answered = false;
      q.show_animation = false;
      return q;
    });
    return receivedState;
  case 'START_GAME':
    receivedState = JSON.parse(JSON.stringify(state));
    receivedState.game_started = true;
    return receivedState;
  case 'END_GAME':
    receivedState = JSON.parse(JSON.stringify(state));
    receivedState.game_ended = true;
    receivedState.clock_paused = true;
    return receivedState;
  case 'PAUSE_TIMER':
    receivedState = JSON.parse(JSON.stringify(state));
    receivedState.clock_paused = true;
    return receivedState;
  case 'UNPAUSE_TIMER':
    receivedState = JSON.parse(JSON.stringify(state));
    receivedState.clock_paused = false;
    return receivedState;
  case 'UPDATE_TIME':
    if(!state.clock_paused){
      receivedState = JSON.parse(JSON.stringify(state));
      receivedState.time += 1;
      return receivedState;
    } else {
      return state;
    }
  case 'ADD_SIZES':
    receivedState = JSON.parse(JSON.stringify(state));
    //in action.sizes we have an array with all the image sizes , if type is iframe it comes with a null, instead of width and height
    receivedState.questions = receivedState.questions.map((q, index) => {
      if(q.type!=="iframe"){
        q.width = action.sizes[index].width;
        q.height = action.sizes[index].height;
      }
      return q;
    });
    return receivedState;
  case 'ANIMATION_ENDED':
    receivedState = JSON.parse(JSON.stringify(state));
    receivedState.questions[action.index].show_animation = false;
    receivedState.enable_buttons = true;
    // check if answer is right or is last question to pass to the next question or show modal end
    let questions_unanswered = receivedState.questions.reduce((accumulator, currentValue) => {return currentValue.answered ? accumulator : accumulator + 1;}, 0);
    if(questions_unanswered === 0){
      receivedState.game_ended = true;
      receivedState.clock_paused = true;
    } else if(receivedState.questions[action.index].true_or_false === receivedState.questions[action.index].user_answer){
      //right answer, go to next question or if last, to the first unanswered
      if(receivedState.questions.length - 1 !== action.index){
        receivedState.index = action.index + 1;
      } else {
        let first_question_unanswered = receivedState.questions.find(function(el){
          return el.answered === false;
        });
        if(first_question_unanswered){
          receivedState.index = first_question_unanswered.id;
        } else {
          // console.log("PROBLEM. Game not ended but not more unanswered questions, this should never appear");
        }
      }
    } else{
      // console.log("Wrong answer, keep the actual question for the user to see the feedback");
    }
    return receivedState;
  case 'GO_TO_QUESTION':
    receivedState = JSON.parse(JSON.stringify(state));
    receivedState.index = action.index;
    return receivedState;
  case 'QUIZ_ANSWERED':
    return checkAnswer(state, action);
  case 'QUIZ_PASSED':
    return passquiz(state, action);
  default:
    return state;
  }
}

function checkAnswer(state, action){
  let receivedState = JSON.parse(JSON.stringify(state));
  let questionclone = JSON.parse(JSON.stringify(action.question));
  if(action.question.true_or_false === action.answer){
    // console.log("Ha respondido correctamente, todos los puntos");
    questionclone.score_accomplished = action.question.score;
  } else {
    // console.log("Ha respondido mal, cero puntos");
    questionclone.score_accomplished = 0;
  }
  questionclone.answered = true;
  questionclone.user_answer = action.answer;
  questionclone.show_animation = true; // we haven't shown the animation right/wrong telling the user
  receivedState.enable_buttons = false; //disable next and prev buttons to wait for the animation to finish
  receivedState.questions[action.index] = questionclone;
  return receivedState;
}

function passquiz(state, action){
  if(state.enable_buttons === false){
    return state;
  } else {
    let receivedState = JSON.parse(JSON.stringify(state));
    if(action.right_left === GO_RIGHT){
      if(receivedState.questions.length - 1 !== state.index){
        receivedState.index = state.index + 1;
      } else {
        receivedState.index = 0;
      }
    } else if(action.right_left === GO_LEFT){
      if(state.index !== 0){
        receivedState.index = state.index - 1;
      } else {
        receivedState.index = receivedState.questions.length - 1;
      }
    } else {
      // console.log("Solo entiendo las acciones GO LEFT y GO RIGHT");
    }
    return receivedState;
  }
}
