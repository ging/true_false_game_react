//this task takes the config from the file config_ui.js and generates a
//JSON file with the vars needed for sass before webpack builds

console.log("Generating JSON config file for SASS");

var fs = require('fs');
var config = require('../app/config/config_vars.json');

//keep only secondarycolor from the config
var sassconfig = {secondarycolor: config.secondarycolor };
console.dir(sassconfig);
fs.writeFile(__dirname + '/../app/config/config_sass.json', JSON.stringify(sassconfig), 'utf8', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
