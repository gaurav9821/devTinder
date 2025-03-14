const express = require("express");
//NOT WORKING CODE(REASON:UNKNOWN)
// const app = express();

// app.use((req, res, next) => {
//   res.send("Welcome to the DEVTINDER Backend");
// });

// app.use("/test", (req, res) => {
//   res.send("This is Test Page from backend");
// });

// app.use("/hello", (req, res) => {
//   res.send("This is Hello Page from backend");
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });
// // const express = require("express");

const app = express();

// Handle use requests to the root route
app.get("/", (req, res) => {
  res.send("Welcome to the DEVTINDER Backend");
});

// Handle GET requests to /test route
app.get("/test", (req, res) => {
  res.send("This is Test Page from backend");
});

// Handle GET requests to /hello route
app.use("/hello", (req, res) => {
  res.send("This is Hello Page from backend");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
