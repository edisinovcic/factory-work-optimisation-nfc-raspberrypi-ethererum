const exceljs = require('exceljs')

exceljs.config.setValue('promise', require('bluebird'))

const outputPath = `${__dirname}/../public/data/output.xlsx`
const inputPath = `${__dirname}/../public/data/input.xlsx`
const taskPath = `${__dirname}/../public/data/taskList.xlsx`

const workbook = new exceljs.Workbook()
workbook.created = new Date()

async function extractAverageTimes() {
  const file = await workbook.xlsx.readFile(inputPath)
  const listOfAverages = []
  file.eachSheet((worksheet, sheetId) => {
    const products = worksheet.getColumn(1)
    const averages = worksheet.getColumn(2)
    const values = []
    for (i = 2; i < products.values.length; i++)
      values.push({
        product: products.values[i],
        averageTime: averages.values[i]
      })
    listOfAverages.push({
      station: worksheet.name.toLocaleUpperCase(),
      values: values
    })
  })
  return listOfAverages
}

async function writeProductToExcel(inputData) {
  const {
    uniqueID,
    stationName,
    productName,
    normal,
    z,
    t,
    m,
    wait
  } = inputData
  const file = await workbook.xlsx.readFile(outputPath)
  if (!file.getWorksheet(stationName)) file.addWorksheet(stationName)
  const worksheet = file.getWorksheet(stationName)
  worksheet.columns = [
    { header: 'Unique ID', key: 'id', width: 16 },
    { header: 'Product Name', key: 'product', width: 20 },
    { header: 'Normal', key: 'normal', width: 12 },
    { header: 'Z', key: 'z', width: 12 },
    { header: 'T', key: 't', width: 12 },
    { header: 'M', key: 'm', width: 12 },
    { header: 'Wait', key: 'wait', width: 12 }
  ]
  worksheet.addRow({
    id: uniqueID,
    product: productName,
    normal: normal,
    z: z,
    t: t,
    m: m,
    wait: wait
  })
  await file.xlsx.writeFile(outputPath)
}

async function writeSummaryToExcel(inputData) {
  const { uniqueID, productName, totalTime } = inputData
  const file = await workbook.xlsx.readFile(outputPath)
  if (!file.getWorksheet('Summary')) file.addWorksheet('Summary')
  const worksheet = file.getWorksheet('Summary')
  worksheet.state = 'show'
  worksheet.columns = [
    { header: 'Unique ID', key: 'id', width: 16 },
    { header: 'Product Name', key: 'product', width: 20 },
    { header: 'Total Time', key: 'total', width: 16 }
  ]
  worksheet.addRow({
    id: uniqueID,
    product: productName,
    total: totalTime
  })
  await file.xlsx.writeFile(outputPath)
}

async function parseTaskList() {
  const file = await workbook.xlsx.readFile(taskPath)
  const sheet = file.getWorksheet('Tasks')
  const productList = sheet.getColumn(1).values.filter(item => item)
  const quantityList = sheet.getColumn(2).values.filter(item => item)
  const taskList = productList.map((product, index) => {
    return { productName: product, quantity: quantityList[index] }
  })
  
  return taskList
}

module.exports = {
  extractAverageTimes,
  writeProductToExcel,
  writeSummaryToExcel,
  parseTaskList
}
