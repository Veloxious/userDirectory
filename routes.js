const express = require('express')
const router = express.Router()
const data = require('./data.js')
const mustacheExpress = require('mustache-express')

const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'))


router.get('/index/', function (req, res){
  res.render('index', {users :data.users})
})

router.get('/index/:id', function (req, res){
  const id = req.params.id
  const user = data.users[id-1]
  res.render('userPage', {users :user})
})

module.exports = router;
