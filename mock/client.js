var fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, 'mock_data.json');
var request = require('request');
var sleep = require('system-sleep');



function addData(file) {  
  for (let index = 0; index < file.length; index ++) {    
    var packet = file[index]
    request.post(
      'http://localhost:8081/sendVitalData',
      { json: packet},
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      }
    )
    sleep(500);
  }
}

var file = JSON.parse(fs.readFileSync(filePath, 'utf8'))
addData(file);