const request = require('request')

function stopBsn(bsnUrl, res) {
    var url = bsnUrl + '/stop'

    request.get(
        url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body == 'bsn is not running') {
                    res.status(400).send(body);
                }
                else if(body == 'stopped'){
                    res.send('stopped')
                }                
            }
            else {
                res.send(body)
            }
        }
    );
}

function startBsn(bsnUrl, res) {
    var url = bsnUrl + '/start'

    request.get(
        url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body == 'already running') {
                    res.status(400).send(body);
                }
                else if(body == 'started'){
                    res.send('started')
                }                
            }
            else {
                res.send(body)
            }
        }
    );
}

function isBsnActive(bsnUrl, res) {
    var url = bsnUrl + '/isActive'

    request.get(
        url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body)
            }
            else {
                res.send(body)
            }
        }
    );
}

module.exports.stopBsn = stopBsn
module.exports.startBsn = startBsn
module.exports.isBsnActive = isBsnActive