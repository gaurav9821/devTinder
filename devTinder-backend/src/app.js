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



// ==================API CALLS=============================

//If i use below code here so it will always give response as HAHAHA for all user apis
//This happens because of order in which route written:
/*
app.use("/user", (req, res) => {
  res.send("HAHAHHAHAA");
});
*/

/*
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

*/

// ==================REGULAR EXPRESSION IN ROUTES=============================



// ==================DYNAMIC ROUTES (QUERY AND REQUEST PARAMS)=============================

//Below is for Handling query Params
//For url http://localhost:3000/user?userId=101 ---> { userId: '101' }
// For url http://localhost:3000/user?userId=101&name=Gaurav&password=testing --->{ userId: '101', name: 'Gaurav', password: 'testing' }
app.get("/user",(req,res)=>{
  //This will print query params pass in request
  console.log(req.query); 
  res.send("The value of query param is "+JSON.stringify(req.query));
})

//Request Params (Dynamic Routing)
//For url http://localhost:3000/profile/101 ---> { profileId: '101' }
app.get("/profile/:profileId", (req, res) => {
  //This will print request params pass in request
  console.log(req.params);
  res.send("The value of request param is " + JSON.stringify(req.params));
});
//For url http://localhost:3000/profile/101/Gaurav/testing --->{ profileId: '101', name: 'Gaurav', password: 'testing' }
app.get("/profile/:profileId/:name/:password", (req, res) => {
  //This will print request params pass in request
  console.log(req.params);
  res.send("The value of request param is " + JSON.stringify(req.params));
});

// // Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


