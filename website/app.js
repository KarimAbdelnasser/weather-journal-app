/* Global Variables */

// Personal API Key for OpenWeatherMap API

const apiKey = "45d759696dfd9381e4dd4567b61b2011&units=metric";
const myUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();



// Event listener to add function to existing HTML DOM element


document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  const newZip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  
  /* Function to GET Web API Data*/
  fetch(
    `${myUrl}${newZip},us&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let date = new Date(data.dt *1000)
      let date_form = date.getFullYear() + '-'+(date.getMonth()+1) + '-' +date.getDate();
      let allData = {weather: data.main.temp, feelings: feelings, date: date_form}
      
      /* Function to POST data */
      fetch("http://localhost:3000/add", {
        method:'POST',
        credentials:'same-origin',
        headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body:JSON.stringify(allData)
      });
      
      getData()
    });
};


/* Function to GET Project Data */
 const getData = async()=>{
  const response = await fetch(`http://localhost:3000/get`);
  try{
    const data = await response.json();
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${data.temperature} &#176c`;
    document.getElementById('content').innerHTML = `Weather Feels Like: ${data.feelings}`;
    return data;
  }catch(error){
    console.log('error',error);
  };
};