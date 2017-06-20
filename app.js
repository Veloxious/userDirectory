const express = require('express')
const path = require('path')
const data = require('./data.js')
const mustacheExpress = require('mustache-express')

const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'))

app.get('/index/', function (req, res){
  res.render('index', {users :data.users})
})

app.get('/index/:id', function (req, res){
  const id = req.params.id
  const user = data.users[id-1]
  res.render('userPage', {users :user})
})

app.listen(3000, function(){
  console.log('running db');
})
