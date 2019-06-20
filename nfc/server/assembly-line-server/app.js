require('./env.js')

const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const connections = require('./utils/connections')
const models = require('./utils/datamodels')
const indexRouter = require('./routes/index')

models.init()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())

app.use('/public', express.static('public'))
app.use('/dist', express.static('dist'))
app.use('/', indexRouter)

app.set('port', process.env.PORT || 3000)

connections.io = io

io.on('connection', client => {
  connections.clientList.push({
    clientID: client.id,
    station: client.handshake.query.station
  })

  client.on('disconnect', () => {
    connections.clientList = connections.clientList.filter(
      item => item.clientID !== client.id
    )
  })
})

server.listen(app.get('port'), () =>
  console.log('Listening on ' + app.get('port'))
)

module.exports = {
  app
}
