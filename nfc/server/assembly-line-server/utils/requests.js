const utils = require('./utils')

const serverURL = window.location.origin

function finish() {
  return $.ajax({
    url: `${serverURL}/finish?station=${stationID}`,
    type: 'POST',
    success: data => {
      console.log(data)
      utils.resetDisplay()
      utils.resetButtons()
    }
  })
}

async function changeTimer(timer) {
  const data = {
    station: stationID,
    selectedTimer: timer
  }
  
  return await $.ajax({
    url: `${serverURL}/changeTimer`,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: () => {
      return true
    },
    error: err => {
      alert(err.responseText)
      return false
    }
  })
}

module.exports = {
  changeTimer,
  finish
}
