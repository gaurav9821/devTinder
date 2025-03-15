const express = require("express");
//USING app.use
const app = express();

app.use("/hello", (req, res) => {
  res.send("This is Hello Page from backend");
});

app.use("/test", (req, res) => {
  res.send("This is Test Page from backend");
});

app.use("/",(req, res) => {
  res.send("Welcome to the DEVTINDER Backend");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


//GET CALLS
// const express = require("express");

// const app = express();

// // Handle use requests to the root route
// app.get("/", (req, res) => {
//   res.send("Welcome to the DEVTINDER Backend");
// });

// // Handle GET requests to /test route
// app.get("/test", (req, res) => {
//   res.send("This is Test Page from backend");
// });

// // Handle GET requests to /hello route
// app.get("/hello", (req, res) => {
//   res.send("This is Hello Page from backend");
// });

// // Start the server
// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });
