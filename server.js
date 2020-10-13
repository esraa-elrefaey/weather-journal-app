// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Create a server running on the port 
const port = 3000;

// Setup Server
const server = app.listen (port , () => {

	 // test that the server is running
  console.log(`server running on the localhost: ${port}`);
});



 // Add a GET route that returns the projectData object in server 
app.get('/all',allData);
function allData (request,response)
{
  response.send(projectData);
}




// add a POST route that adds incoming data to projectData
app.post('/add' ,addData);
function addData (req,res) 
  {
  let entryData = req.body;
    console,log(entryData);

    // temp => Temperature
    // content => user's input

projectData.date= entryData.date;
projectData.temp= entryData.temp;
projectData.content= entryData.content;

  // res.send(projectData);
  req.end();
}