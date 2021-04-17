require("express-async-errors");
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Initialize the main project folder
app.use(express.static("website"));
// Cors for cross origin allowance
app.use(cors());

// Setup empty JS object to act as endpoint for all routes
let projectData = [];

function addData(req, res) {
  let newData = {
    date: req.body.date,
    temperature: req.body.weather,
    feelings: req.body.feelings
  };
  projectData.push(newData);
  res.send(projectData)
}

app.post("/add", addData);

function getData(req, res) {  
  res.send(projectData);
}

app.get("/get", getData);

// Setup Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});