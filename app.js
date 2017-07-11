const express = require('express')
const path = require('path')
const data = require('./data.js')
const mustacheExpress = require('mustache-express')
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/newdb"

const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'))


app.get('/index/', function(req, res) {
  MongoClient.connect(url, function(error, db) {
    db.collection("botfacebook").find().toArray(function(error, documents) {
      res.render('index', {
        users: documents
      })
    })
  })
})

app.get('/index/:id', function (req, res) {
  // accessing the users inside the data.js file
  var userid = parseInt(req.params.id)

  MongoClient.connect(url, function(error, db) {
    db.collection("botfacebook").find({id:userid}).toArray( function(error, documents){
      res.render("userPage", {
        users: documents
      })
    })
  })
})

// app.get('/index/:id', function(req, res) {
//   const id = req.params.id
//   const user = data.users[id - 1]
//   res.render('userPage', {
//     users: user
//   })
// })

app.listen(3000, function() {
  console.log('running db');
})
