const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
// cors allow us to communicate back with our frontend.
const cors = require("cors");
// If you have installed MYSQL 8.0 you need to use mysql2 package
// instead of old mysql because of secure authentication process
// which is not provided by mysql package.
const mySql = require("mysql2");

// Provide details about our mysql database.
const db = mySql.createPool({
  host: "localhost",
  user: "test",
  password: "sfsumasters2022",
  database: "sys",
  // port: 3307,
});

app.use(cors());
// We need to use express.json() middleware, since it
// allows us to extract information from the request
// sent from our frontend.
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

// Have Node serve the files for our built React app
// Only use this middleware when you want to deploy.
// On localhost comment it out.
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/api/get", (request, response) => {
  console.log(request.query.searchTerm, request.query.category);

  var searchParam = request.query.searchTerm;
  var dropdown = request.query.category;

  var emptySearch = "SELECT c.name AS COMPANY_NAME, j.title AS JOB_TITLE, j.type AS JOB_TYPE, r.name AS JOB_ROLE, j.techArea AS TECH_AREA, j.description AS JOB_DESCRIPTION, j.salary AS SALARY, j.requestedHours AS REQUESTED_HOURS, j.city AS JOB_LOCATION, j.minQualifications AS MIMIMUM_QUALIFICATIONS, j.preferredQualifications AS PREFERRED_QUALIFICATIONS\
  FROM company c\
  INNER JOIN job j ON c.id = j.company_id\
  INNER JOIN role r ON j.role_id = r.id;";

  var searchString = "SELECT c.name AS COMPANY_NAME, j.title AS JOB_TITLE, j.type AS JOB_TYPE, r.name AS JOB_ROLE, j.techArea AS TECH_AREA, j.description AS JOB_DESCRIPTION, j.salary AS SALARY, j.requestedHours AS REQUESTED_HOURS, j.city AS JOB_LOCATION, j.minQualifications AS MIMIMUM_QUALIFICATIONS, j.preferredQualifications AS PREFERRED_QUALIFICATIONS\
  FROM company c\
  INNER JOIN job j ON c.id = j.company_id\
  INNER JOIN role r ON j.role_id = r.id WHERE j.title LIKE "%searchParam%";";

  var tech = "SELECT c.name AS COMPANY_NAME, j.title AS JOB_TITLE, j.type AS JOB_TYPE, r.name AS JOB_ROLE, j.techArea AS TECH_AREA, j.description AS JOB_DESCRIPTION, j.salary AS SALARY, j.requestedHours AS REQUESTED_HOURS, j.city AS JOB_LOCATION, j.minQualifications AS MIMIMUM_QUALIFICATIONS, j.preferredQualifications AS PREFERRED_QUALIFICATIONS\
  FROM company c\
  INNER JOIN job j ON c.id = j.company_id\
  INNER JOIN role r ON j.role_id = r.id WHERE j.techArea LIKE "%searchParam%";";

  var job_city = "SELECT c.name AS COMPANY_NAME, j.title AS JOB_TITLE, j.type AS JOB_TYPE, r.name AS JOB_ROLE, j.techArea AS TECH_AREA, j.description AS JOB_DESCRIPTION, j.salary AS SALARY, j.requestedHours AS REQUESTED_HOURS, j.city AS JOB_LOCATION, j.minQualifications AS MIMIMUM_QUALIFICATIONS, j.preferredQualifications AS PREFERRED_QUALIFICATIONS\
       FROM company c\
       INNER JOIN job j ON c.id = j.company_id\
       INNER JOIN role r ON j.role_id = r.id WHERE j.city LIKE "%searchParam%";"

  
  let type_of_job = "SELECT c.name AS COMPANY_NAME, j.title AS JOB_TITLE, j.type AS JOB_TYPE, r.name AS JOB_ROLE, j.techArea AS TECH_AREA, j.description AS JOB_DESCRIPTION, j.salary AS SALARY, j.requestedHours AS REQUESTED_HOURS, j.city AS JOB_LOCATION, j.minQualifications AS MIMIMUM_QUALIFICATIONS, j.preferredQualifications AS PREFERRED_QUALIFICATIONS FROM company c INNER JOIN job j ON c.id = j.company_id INNER JOIN role r ON j.role_id = r.id WHERE j.type LIKE "%searchParam%";"

  let queryName;

  if (!request.query.searchTerm) {
    console.log("No Input");
    queryName = emptySearch;
  } else if(request.query.searchTerm && request.query.category === "all") {
    console.log("User entered search parameter and have selected the dropdown as ALL")
    queryName = searchString;
  } else if (request.query.category === "jobType") {
    console.log("User selected Job type");
    queryName = type_of_job;
  } else if (request.query.category === "city") {
    console.log("User selected City");
    queryName = job_city;
  } else if(request.query.category === "tech_area") {
    console.log("User selected techArea");
    queryName = tech;
  } 
  
  let test = "select * from sys_config";
  
  //const sqlSelect = "SELECT * FROM job;";
  db.query(test, (err, result) => {
    console.log(err);
    response.send(result);
  });
});

// All other GET requests not handled before will return our React app.
// On localhost comment it out, because in development version create
// react app gets served by webpack dev server
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} \n`);
});
