const cors = require('cors')
const io = require('socket.io');
const app = require('express')();
const bodyParser = require('body-parser')
const server = require('http').createServer(app);
var dataBaseWrapper = require('./database/dbWrapper').dataBaseWrapper
var logicWrapper = require('./src/businessLogic')
const apiComm = require('./src/apiCommunication')

const db = new dataBaseWrapper();
const port = 8081
const ws = io.listen(server);
// var bsnUrl = null
var bsnUrl = 'http://164.41.75.167:8080'

db.connect();
app.use(cors());
app.use(bodyParser.json());
server.listen(process.env.PORT || port);
console.log('Server listening on port ' + port);

app.get('/', function (req, res) {
  console.log('Get!');
  res.send('ok');
});

app.post('/bsnRegister', function (req, res) {
  // get client ip
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ip = ip.toString().replace('::ffff:', '')
  // get client port
  var port = req.body.port
  bsnUrl = 'http://' + ip + ':' + port

  console.log('ip: ' + bsnUrl)
  res.send('ok')
});

app.post('/sendVitalData', function (req, res) {
  var packet = req.body;  
  console.log(packet)
  logicWrapper.handlePacket(ws, packet, 1);
  
  var date = (new Date()).toISOString();
  db.insertRelCosData(1, date, packet['Reliability'], packet['Cost'])

  res.send('ok');
});

app.get('/getRelCosData', async function (req, res) {
  var session = req.query.session;
  console.log(req.query)
  if (session == null || session == undefined || session == '') {
    res.status(404).send('Session not provided');
  }
  else {
    var results = await db.getRelCosData(session);
    res.send(results.rows);
  }
});

app.get('/isBsnActive', async function (req, res) {  
  await apiComm.isBsnActive(bsnUrl, res)  
});

app.get('/startBsn', async function (req, res) {  
  await apiComm.startBsn(bsnUrl, res)  
});

app.get('/stopBsn', async function (req, res) {
  await apiComm.stopBsn(bsnUrl, res)  
});

ws.on('connection', function (socket) {
  console.log('Client connected: ' + socket.id);

  socket.on('pingChannel', function (message) {
    console.log('received ping: \'' + message + '\'');
    socket.emit('pingChannel', 'pong');
  });

  socket.on('disconnect', function () {
    console.log('Client disconnected: ' + socket.id);
  });
});

db.cleanDatabase();