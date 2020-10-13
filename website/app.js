/* Global Variables */

// API credentials from OpenWeatherMap website
const baseUrl ='http://api.openweathermap.org/data/2.5/weather?zip=';

// personal API key
const keyApi ='&appid=a6536c5a05d2f5e2b1400c4ea6c48851';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


// event listener when click the button generate
 document.getElementById('generate').addEventListener('click' , performance);

// callback function to execute when it is clicked
 function performance (event){
 	event.preventDefault();

  const zipCode =document.getElementById('zip').value;
  const content =document.getElementById('feelings').value;

  getWeather(baseUrl,zipCode,keyApi)

// chain Promise that makes a POST request to add the API data
  .then(function (newData){

  	// receive a path and a data object
    postData ('http://localhost:3000/add',{
      date : newDate , temp:newData.main.temp, content:content
    })
  

  // chain Promise that updates the UI dynamically 
  .then(function(){
  	uptadeUI()
  })

})

 }

 // GET route that returns the projectData object in the server
 // make a GET request to the OpenWeatherMap API

  const getWeather = async (baseUrl,zipCode,keyApi) => {


  const response = await fetch(baseUrl + zipCode+ ',us' + keyApi);

  try {
       const newData = await response.json();
       return newData ;
  }
  catch (error) {
    console.log ('error',error );
  }

}



/* Function to POST data */
// add a POST route that adds incoming data to projectData

const postData = async (url = '', data = {}) => {
  const req = await fetch (url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
     
  });

  try {
    const newEntery = await req.json();
    return newEntery;
  }
  catch (error) {
    console.log('error',error);
  }
};


// function that updates the UI dynamically with DOM

const uptadeUI = async () => {
  const request = await fetch('http://localhost:3000/all');
  try {

       const  dataAll= await request.json();
       document.getElementById('date').innerHTML='Date: ' +dataAll.date;
       document.getElementById('temp').innerHTML='Temperature: ' +dataAll.temp;
       document.getElementById('content').innerHTML='Description: '+dataAll.content;

  }
  catch (error) {
    console.log ('error',error );
  }
};
