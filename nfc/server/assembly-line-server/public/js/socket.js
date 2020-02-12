const utils = require('../../utils/utils')

const serverURL = window.location.origin

const socket = io.connect(`${serverURL}?station=${stationID}`)

socket.on('connect', () => {})

socket.on('timer', data => {
  const product = JSON.parse(data)
  const currentStation = product.currentStation
  if (currentStation === stationID) currentProduct = product
  currentStation === stationID
    ? utils.displayProduct(product, stationID, 'current')
    : utils.displayProduct(product, stationID, 'next')
})

socket.on('waitTimer', data => {
  const product = JSON.parse(data)
  utils.displayWaitProduct(product)
})

socket.on('reset', data => {
  console.log('SEX')
  utils.resetDisplay()
  utils.resetButtons()
})