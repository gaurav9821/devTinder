const express = require("express");
const app = express();

//USING app.use

// app.use("/hello", (req, res) => {
//   res.send("This is Hello Page from backend");
// });

// app.use("/test", (req, res) => {
//   res.send("This is Test Page from backend");
// });

// app.use("/",(req, res) => {
//   res.send("Welcome to the DEVTINDER Backend");
// });

// ============API CALLS================

//If i use below code here so it will always give response as HAHAHA for all user apis
//This happens because of order in which route written:
/*
app.use("/user", (req, res) => {
  res.send("HAHAHHAHAA");
});
*/

//GET
app.get("/user", (req, res) => {
  console.log("INSIDE GET USER API");
  res.send({ firstName: "Gaurav", lastName: "Chachada" });
});
//POST
app.post("/user", (req, res) => {
  console.log("INSIDE POST USER API");
  res.send("Data is saved successfully in USER Dbs");
});
//DELETE
app.delete("/user", (req, res) => {
  console.log("INSIDE DELET USER API");
  res.send("Data is deleted successfully from USER Dbs");
});

app.put("/user", (req, res) => {
  console.log("INSIDE PUT USER API");
  res.send("Data is udpated successfully from USER Dbs");
});

app.patch("/user", (req, res) => {
  console.log("INSIDE PATCH USER API");
  res.send("PATCH API");
});

// // Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
