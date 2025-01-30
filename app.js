const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}));
// mongo db
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
//console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function getData(){
  await client.connect();
  let collection = await client.db("guitar-app-database").collection("guitar-app-songs");
  let results = await collection.find({}).toArray();
    
  console.log(results);
  return results;
}

//endpoint, middleware(s)

app.get('/read', async function(req,res){
  let getDataResults = await getData();
  console.log(getDataResults);
  res.render('songs',
    {songData : getDataResults}
  );

})

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
  console.log('req.query:', req.query);
  
  res.redirect('/ejs');
})

app.listen(port, 
  ()=> console.log(
    `server is running on ... ${port}`
  )
);
/*  
"npm i express"
"npm i body-parser"
"npm i ejs"
"npm i mongodb"
"npm i dotenv"
*/