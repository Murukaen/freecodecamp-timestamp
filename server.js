"use strict";

const express = require('express')
const path = require('path')
const app = express()
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

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

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