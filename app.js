const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

//endpoint, middleware(s)
app.get('/', function (req, res) {
  res.sendFile('index.html');
})
app.get('/nodemon', function (req, res) {
  res.send('look ma, no hands and no dollars I dont dance<br><a href="/">back home</a>')
})
app.get('/helloRender', function (req, res) {
  res.send('Hello Express from Real World<br><a href="/">back home</a>')
})
app.get('/ejs', function (req, res) {
  res.render('words');
})



app.listen(port, 
  ()=> console.log(
    `server is running on ... ${port}`
  )
);