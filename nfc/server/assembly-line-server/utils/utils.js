const moment = require('moment')

function formatTime(time) {
  return moment()
    .startOf('day')
    .seconds(new Number(time))
    .format('H:mm:ss')
}

function resetDisplay() {
  const tableRows = ['product', 'average-timer', 'total-timer', 'work-timer', 'z-timer', 't-timer', 'm-timer']
  
  tableRows.forEach((row) => document.getElementById(`current-${row}`).innerHTML = '')
  document.getElementById(
    'image-view'
  ).src = `/public/imgs/style/placeholder.jpg`
}

function displayProduct(product, stationID, prefix) {
  const previousStation =
    stationID.match(/[a-zA-Z]+/g) + (new Number(stationID.match(/\d+/g)) - 1)
  const findStation = () => {
    if (prefix === 'current')
      return product.stations.find(item => item.name === stationID)
    else if (prefix === 'next')
      return product.stations.find(item => item.name === previousStation)
  }
  const currentStation = findStation()

  document.getElementById(prefix + '-product').innerHTML = product.name
  document.getElementById(prefix + '-average-timer').innerHTML = formatTime(
    currentStation.averageTime
  )
  document.getElementById(prefix + '-total-timer').innerHTML = formatTime(
    product.totalTime
  )
  document.getElementById(prefix + '-work-timer').innerHTML = formatTime(
    currentStation.timers.normal
  )
  document.getElementById(prefix + '-z-timer').innerHTML = formatTime(
    currentStation.timers.z
  )
  document.getElementById(prefix + '-t-timer').innerHTML = formatTime(
    currentStation.timers.t
  )
  document.getElementById(prefix + '-m-timer').innerHTML = formatTime(
    currentStation.timers.m
  )
  if (prefix === 'current')
    document.getElementById('image-view').src = `/public/imgs/${
      product.name
      }/${stationID}.jpg`
}

function displayWaitProduct(product) {
  document.getElementById('wait-product').innerHTML = product.name
  document.getElementById('wait-time').innerHTML = formatTime(product.waitTime)
}

function isCurrentProduct(currentProduct, product) {
  return (
    currentProduct.name === product.name && currentProduct.tag === product.tag
  )
}

function resetButtons() {
  const buttonIDs = ['normal', 'stop', 'z', 't', 'm']
  
  buttonIDs.forEach(id => {
    $(`#${id}`).removeClass('active')
  })
  $(`#normal`).addClass('active')
}

module.exports = {
  displayProduct,
  displayWaitProduct,
  resetDisplay,
  resetButtons,
  isCurrentProduct
}
