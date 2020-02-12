const connections = require('./connections')
const circularJSON = require('circular-json')
const excelHandler = require('./excelhandler')
const taskList = require('../public/data/taskList.json')

const productQueue = []
const taskQueue = []
let listOfAverages = []

function StationTasks(station, tasks) {
  this.station = station
  this.tasks = tasks
}

function Product(name, tag) {
  this.uniqueID = Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()
  this.name = name
  this.tag = tag
  this.currentStation = null
  this.waitStation = null
  this.totalTime = 0
  this.waitTime = 0
  this.timer = undefined
  this.stations = []
  this.startTimer = () => {
    const timer = () => {
      const activeStation = this.stations.find(
        item => item.name === this.currentStation && !item.isFinished
      )

      if (
        activeStation &&
        !this.waitStation &&
        activeStation.currentTimer === 'stop'
      )
        return

      ++this.totalTime
      if (activeStation) {
        ++activeStation.timers[activeStation.currentTimer]
      } 
      else if (this.waitStation) {
        this.waitTime++
        const waitStation = connections.clientList.find(
          client => client.station === this.waitStation
        )

        if (waitStation)
          connections.io
            .to(waitStation.clientID)
            .emit('waitTimer', circularJSON.stringify(this))

        return
      }

      const nextStation =
        this.currentStation.match(/[a-zA-Z]+/g) +
        (new Number(this.currentStation.match(/\d+/g)) + 1)
      const filteredList = connections.clientList.filter(
        ({ station }) =>
          station === nextStation || station === this.currentStation
      )
      filteredList.forEach(({ clientID: socketID }) => {
        connections.io.to(socketID).emit('timer', circularJSON.stringify(this))
      })
    }
    this.timer = setInterval(timer, 1000)
  }
  this.stopTimer = () => {
    clearInterval(this.timer)
  }
}

function Station(name) {
  this.name = name
  this.averageTime = 0
  this.timers = {
    normal: 0,
    z: 0,
    t: 0,
    m: 0
  }
  this.isFinished = false
  this.currentTimer = 'normal'
}

async function init() {
  const taskList = await chooseTaskList()
  
  for (i = 1; i <= process.env.NUMBER_OF_WORKSTATIONS; i++) {
    const tasks = JSON.parse(JSON.stringify(taskList))
    taskQueue.push(new StationTasks(`STATION${i}`, tasks))
  }
  this.listOfAverages = await excelHandler.extractAverageTimes()
}

async function chooseTaskList() {
  switch (process.env.MODE) {
    case 'excel': {
      return await excelHandler.parseTaskList()
    }
    case 'json': {
      return JSON.parse(JSON.stringify(taskList))
    }
    default: {
      return JSON.parse(JSON.stringify(taskList))
    }
  }
}

module.exports = {
  Product,
  Station,
  productQueue,
  taskQueue,
  StationTasks,
  listOfAverages,
  init
}
