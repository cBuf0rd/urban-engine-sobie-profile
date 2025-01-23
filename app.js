const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}));

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
  res.render('words',
    {pageTitle: 'my cool ejs page'}
  );
})
app.post('/saveMyName', (req, res) =>{
  console.log('did we hit the new input?');
  console.log(req.body);

 // res.redirect('/ejs');
  res.render('words',
    {pageTitle: req.body.myName}
  );
})
app.get('/saveMyNameGet', (req, res) =>{
  console.log('did we hit the new input get?');
  console.log(req.query);
  res.redirect('/ejs');
})

app.listen(port, 
  ()=> console.log(
    `server is running on ... ${port}`
  )
);