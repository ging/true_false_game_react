export let GLOBAL_CONFIG = {
  dev:{
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["en", "es"],
    locale: "es",
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
  initial_text:"¿sabrías decir si las siguientes noticias son verdaderas o falsas? aprende a distinguirlas, que no te tomen por tonto",
  instructions:"Marca verdadero o falso para cada una de las noticias propuestas. Irás obteniendo una puntuación según cuantas aciertes.",
  with_reset_button: false,
  with_fullscreen: false,
  feedback2_right: "la noticia es real",
  feedback2_wrong: "la noticia es falsa",
  message_pro: "eres un crack, ¡a ti no hay quien te engañe! sabemos que no necesitas que te enseñemos cómo reconocer fuentes fiables, pero aquí te dejamos un pequeño vídeo por si quieres saber más:",
  message_good: "lo has hecho bastante bien, pero has fallado algunas. Revisa el siguiente video para aprender a detectar fuentes fiables:",
  message_ok: "No has acertado muchas. Es muy importante detectar bien las fuentes fiables para una navegación segura. Te dejamos un video para que aprendas a detectarlas:",
  modal_inst: "¿sabes qué noticias son verdaderas y falsas? contesta lo más rápido que puedas, para sumar puntos y conviértete en experto detector de fake news. los controles son muy sencillos, solo tienes que pulsar verdadero o falso en los botones centrales.",
  progress_text: "noticias contestadas",
  task_list: "lista de noticias a contestar"
};
