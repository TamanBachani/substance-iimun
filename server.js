const connectToMongo = require("./db");
const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");

// mongo stuff
connectToMongo();


// express stuff
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});



// Available Routes
app.use("/auth", require("./routes/internRoutes"));
app.use("/leaves", require("./routes/leaveRoutes"));

// All routes are as follows:
// Authentication:
// 1. Signing up of Intern: /auth/signUp
// 2. Logging in of intern/admin: /auth/login
// 3. Geeting details of intern document, because some links need you to be logged in: /auth/internInfo

// Leaves: 
// 1. To apply for a leave, login bviously required: /leaves/apply
// 2. For admin to change the status of a leave: /leaves/616564f5b43338fa8af8c71e/rejected
// 3. For admin to get all specific category leaves: /leaves/all/rejected
// 4. For intern to check the status of their leaves, login obviously required: /leaves/status


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
