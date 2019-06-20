const express = require('express')
const connections = require('../utils/connections')
const router = express.Router()

const excelHandler = require('../utils/excelhandler')
const models = require('../utils/datamodels')
const circularJSON = require('circular-json')
const utils = require('../utils/utils')

const numOfStations = new Number(process.env.NUMBER_OF_WORKSTATIONS)

router.post('/startTimer', (req, res) => {
  const { station, tag } = req.body
  console.log(station, tag)

  const taskList = models.taskQueue.find(item => item.station === station).tasks
  const task = taskList[0]

  if (task === undefined)
    return res.status(400).send('No task defined!')

  const productName = task.productName

  if (models.productQueue.some(product => product.currentStation === station))
    return res.status(400).send('Finish working on current product first!')
  if (
    !models.productQueue.some(product =>
      utils.isCurrentProduct(product, { productName, tag })
    )
  )
    models.productQueue.push(new models.Product(productName, tag))

  task.quantity--
  if (task.quantity === 0) taskList.splice(0, 1)

  const product = models.productQueue.find(product =>
    utils.isCurrentProduct(product, { name: productName, tag })
  )

  if (!product.stations.some(item => item.name === station))
    product.stations.push(new models.Station(station))
  product.currentStation = station
  product.waitStation = null

  const currentStation = product.stations.find(item => item.name === station)
  const { values: stationAverages } = models.listOfAverages.find(
    item => item.station === currentStation.name
  )
  const { averageTime } = stationAverages.find(
    item => item.product === product.name
  )

  currentStation.averageTime = averageTime
  product.stopTimer()
  product.startTimer()
  return res.send(circularJSON.stringify(product))
})

router.post('/finish', async (req, res) => {
  const stationID = req.query.station
  const product = models.productQueue.find(
    ({ currentStation }) => currentStation === stationID
  )

  if (
    !models.productQueue.some(product => product.currentStation === stationID)
  )
    return res.status(400).send('No working product!')
  const currentStation = product.stations.find(item => item.name === stationID)
  currentStation.isFinished = true
  product.currentStation = null
  product.waitStation =
    stationID.match(/[a-zA-Z]+/g) + (new Number(stationID.match(/\d+/g)) + 1)
  const excelProductData = {
    uniqueID: product.uniqueID,
    stationName: currentStation.name,
    productName: product.name,
    normal: currentStation.timers.normal,
    z: currentStation.timers.z,
    t: currentStation.timers.t,
    m: currentStation.timers.m,
    wait: product.waitTime
  }
  product.waitTime = 0
  await excelHandler.writeProductToExcel(excelProductData)
  const numOfFinishedStations = product.stations.filter(
    station => station.isFinished
  ).length
  if (numOfFinishedStations == numOfStations) {
    const excelSummaryData = {
      uniqueID: product.uniqueID,
      productName: product.name,
      totalTime: product.totalTime
    }
    await excelHandler.writeSummaryToExcel(excelSummaryData)
  }
  const client = connections.clientList.find(({ station }) => station === stationID).clientID
  connections.io.to(client).emit('reset')
  console.log(stationID + ' finished succesfully!')
  return res.send('Station successfully finished: ' + currentStation)
})

router.post('/changeTimer', (req, res) => {
  const { station, selectedTimer } = req.body
  const product = models.productQueue.find(
    product => product.currentStation === station
  )
  if (!product)
    return res.status(400).send('No working product!')
  const currentStation = product.stations.find(item => item.name === station)
  if (!currentStation || currentStation.isFinished)
    return res.status(400).send('Cannot change timers for finished product!')
  currentStation.currentTimer = selectedTimer
  return res.send('Timer successfully changed: ' + currentStation)
})

router.get('/1', (req, res) => {
  const stationName = 'Station 1'
  return res.render('index', { title: stationName, stationID: 'STATION1' })
})

router.get('/2', (req, res) => {
  const stationName = 'Station 2'
  return res.render('index', { title: stationName, stationID: 'STATION2' })
})

router.get('/3', (req, res) => {
  const stationName = 'Station 3'
  return res.render('index', { title: stationName, stationID: 'STATION3' })
})

router.get('/4', (req, res) => {
  const stationName = 'Station 4'
  return res.render('index', { title: stationName, stationID: 'STATION4' })
})

module.exports = router
