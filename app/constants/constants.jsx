export const INITIAL_STATE = {
  tracking:{
    progress_measure:0,
    score:null,
    objectives:{},
  },
  scorm:null,
  user_profile:{
    id:undefined,
    name:"Unknown",
    learner_preference:{},
  },
  wait_for_user_profile:false,
  game:{
    enable_buttons:true,
    index:0,
    questions:[],
    game_started:false,
    game_ended:false,
    time:0,
    clock_paused:true,
  },
};

export const GO_LEFT = "go_left";
export const GO_RIGHT = "go_right";