var fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, 'mock_data.json');
var request = require('request');
var sleep = require('system-sleep');



function addData(file) {
  for (let index = 0; index < 1; index++) {
    var packet = file[index]
    request.post(
      'https://bsnapi.herokuapp.com/sendVitalData',
      { json: packet },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
        if(error) {
          console.log(error);
        }
      }
    )
    sleep(500);
  }
}

var file = JSON.parse(fs.readFileSync(filePath, 'utf8'))
addData(file);