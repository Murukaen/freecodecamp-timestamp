"use strict";

var express = require('express')
var app = express()
const port = 8080

function analyzeDate(date) {
  return {unix: Date.parse(date), natural: date}
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/:data', (req, res) => {
  let data = req.params.data
  res.send(analyzeDate(data))
})

app.listen(port, function () {
  console.log('Example app listening on port ' +  port)
})