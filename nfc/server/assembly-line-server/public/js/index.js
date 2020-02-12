const requests = require('../../utils/requests')

const buttonIDs = ['normal', 'stop', 'z', 't', 'm']

async function setTimer() {
  try {
    const resp = await requests.changeTimer(this.id)
    if (!resp) return
    $(`#${this.id}`).addClass('active')
    buttonIDs.forEach(id => {
      if (id !== this.id) {
        $(`#${id}`).removeClass('active')
      }
    })
  } catch (err) { }
}
buttonIDs.forEach(button => $(`#${button}`).click(setTimer))

function finish() {
  requests.finish()
}
$('#finish').click(finish)

//Remove when RPI button gets installed
let tagNumber = 1

function simulate() {
  const serverURL = window.location.origin
  const data = {
    station : stationID,
    tag : `tag${tagNumber}`
    }
  
  $.ajax({
    url: `${serverURL}/startTimer`,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: data => {
      tagNumber++
    },
    error: data => {
      alert(data.responseText)
    }
  })
}
$('#simulate').click(simulate)
//END

init = () => {
  $('#normal').addClass('active')
}
$(document).ready(init)
