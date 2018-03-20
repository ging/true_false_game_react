export let GLOBAL_CONFIG = {
  dev:{
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["en", "es"],
    // locale: "es",
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    n:3,
  },
  production:{
    debug:false,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["en", "es"],
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    n:undefined,
  },
};

let processConfig = (function(){
  let env = process.env.NODE_ENV || 'dev';
  if(typeof GLOBAL_CONFIG[env] === "undefined"){
    env = "dev";
  }
  GLOBAL_CONFIG = GLOBAL_CONFIG[env];

  GLOBAL_CONFIG.debug_scorm_api = ((GLOBAL_CONFIG.debug) && (GLOBAL_CONFIG.debug_scorm_api));
  GLOBAL_CONFIG.debug_scorm_api_window = ((GLOBAL_CONFIG.debug_scorm_api) && (GLOBAL_CONFIG.debug_scorm_api_window));
})();



export const UI = {
  name:"Detector de phishing",
  app_logo:"assets/images/logos/fakedetector_logo.svg",
  type_app_logo:"assets/images/logos/phishing.svg",
  educalab_text:"una aplicación de",
  educalab_logo:"assets/images/logos/educalab_logo_white.svg",
  initial_text:"¿sabrías decir si las siguientes webs son verdaderas o falsas? aprende a distinguirlas, que no te la cuelen",
  instructions:"Marca verdadero o falso para cada una de las webs propuestas. Irás obteniendo puntos según aciertes.",
  button_left:"Falso",
  button_right:"Verdadero",
};
