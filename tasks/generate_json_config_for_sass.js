//this task takes the config from the file config_ui.js and generates a
//JSON file with the vars needed for sass before webpack builds

console.log("Generating JSON config file for SASS");


const fs = require('fs-extra');
import {GLOBAL_CONFIG} from '../config/config.mjs';
import * as configurations from '../config/config_ui.mjs';
const CONFIG_UI = configurations["kike"];
console.log("HOLA: " + CONFIG_UI.secondaryColor);
