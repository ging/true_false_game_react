export let GLOBAL_CONFIG = {
  dev:{
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["en", "es"],
    locale:"es",
    adaptive:true,
    finish_screen:true,
    admits_url_config:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    n:10,
    app_logo:"assets/images/logos/fakedetector_logo.svg",
    elab_text:"una aplicación de",
    elab_logo:"assets/images/logos/elab_logo_white.svg",
    file:"ciencia.json",
  },
  production:{
    debug:false,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
  },
};

let processConfig = (function(){
  let env = process.env.NODE_ENV || 'dev';
  if(typeof GLOBAL_CONFIG[env] === "undefined"){
    env = "dev";
  }
  if((env === "production") && (typeof GLOBAL_CONFIG.dev !== "undefined")){
    let productionConfig = Object.assign({}, GLOBAL_CONFIG.dev, GLOBAL_CONFIG.production);
    GLOBAL_CONFIG.production = productionConfig;
  }
  GLOBAL_CONFIG = GLOBAL_CONFIG[env];

  GLOBAL_CONFIG.debug_scorm_api = ((GLOBAL_CONFIG.debug) && (GLOBAL_CONFIG.debug_scorm_api));
  GLOBAL_CONFIG.debug_scorm_api_window = ((GLOBAL_CONFIG.debug_scorm_api) && (GLOBAL_CONFIG.debug_scorm_api_window));
})();
