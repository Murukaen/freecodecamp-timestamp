"use strict";

var express = require('express')
var app = express()
const port = process.env.PORT || 8080

function unixToDate(unix) {
  return new Date(+unix).toDateString();
}

function parseDate(date) {
  let unix = Date.parse(date)
  return parseUnixTime(unix)
}

function parseUnixTime(unix) {
  return {unix: unix, natural: unixToDate(unix)}
}

function isInt(s) {
    let n = parseInt(s, 10);
    return n.toString() === s;
}

function buildBadRequest() {
  return {'error' : 'illegal parameter'}
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/:data', (req, res) => {
  let data = req.params.data
  if (!isNaN(Date.parse(data)))
    res.send(parseDate(data))
  else if (isInt(data))
    res.send(parseUnixTime(data))
  else
    res.send(buildBadRequest())
})

app.listen(port, function () {
  console.log('Example app listening on port ' +  port)
})