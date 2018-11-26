export function scormConnected(scorm){
  return {
    type:'SCORM_CONNECTED',
    scorm:scorm,
  };
}

export function updateUserProfile(user_profile){
  return {
    type:'UPDATE_USER_PROFILE',
    user_profile:user_profile,
  };
}

export function finishApp(finished = true){
  return {
    type:'FINISH_APP',
    finished:finished,
  };
}

export function addObjectives(objectives){
  return {
    type:'ADD_OBJECTIVES',
    objectives:objectives,
  };
}

export function addSizes(sizes){
  return {
    type:'ADD_SIZES',
    sizes:sizes,
  };
}

export function objectiveAccomplished(objectiveId, accomplishedScore = null){
  return {
    type:'OBJECTIVE_ACCOMPLISHED',
    objective_id:objectiveId,
    accomplished_score:accomplishedScore,
  };
}

export function passquiz(right_left){
  return {
    type:'QUIZ_PASSED',
    right_left:right_left,
  };
}

export function initializegame(questions){
  return {
    type:'INITIALIZE_GAME',
    questions:questions,
  };
}

export function startgame(){
  return {
    type:'START_GAME',
  };
}

export function endgame(){
  return {
    type:'END_GAME',
  };
}

export function updateTimer(){
  return {
    type:'UPDATE_TIME',
  };
}

export function pauseTimer(){
  return {
    type:'PAUSE_TIMER',
  };
}

export function unpauseTimer(){
  return {
    type:'UNPAUSE_TIMER',
  };
}

export function quizAnswered(index, answer, question){
  return {
    type:'QUIZ_ANSWERED',
    index:index,
    answer:answer,
    question:question,
  };
}

export function animationEnded(index){
  return {
    type:'ANIMATION_ENDED',
    index:index,
  };
}

export function goToQuestion(index){
  return {
    type:'GO_TO_QUESTION',
    index:index,
  };
}

export function quizAnsweredWithScorm(index, answer, question){
  return (dispatch, getState) => {
    dispatch(quizAnswered(index, answer, question));
        // check if there is a new objective accomplished
    let score = question.true_or_false === answer ? question.score : 0;
    dispatch(objectiveAccomplished("Question" + (index + 1), score));
  };
}