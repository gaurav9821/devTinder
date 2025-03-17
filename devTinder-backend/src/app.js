const express = require("express");
const app = express();

//USING app.use
// Order of code matters because if I put route of '/' first then it will always execute "Welcome to the DEVTINDER Backend" 
// for every route bcz it act as wildcard and matches with all route and code flows from top to bottom so when server comes to 
//execute code for any route it matches with '/' because every route start with '/' and that is always send "Welcome to the DEVTINDER Backend" 
// even for /hello or /test if not handled properly

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
/*
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

*/


// ======================MiddleWare and Error Handlers=============================

//This code will go to infinite loop because we are not sending any response from the route handlers
// and as we are using app.use it will go infinite loop for all type of HTTTP method like GET,POST,PUt etc with route as /users
//  output ---> Server-Console --> Handling Request
//              Postman ---> Infiite Loop   
  /*             
app.use("/users",(req,res)=>{
  console.log("Handling Request");
})
  */

//To fix above we use 
//  output ---> Server-Console --> "Handling Request - 2"
//              Postman ---> Response - 2
 /*
app.use("/users", (req, res) => {
  console.log("Handling Request - 2");
  res.send("Response - 2");
});
  */

// output ---> Server-Console(without Comment) --> "Handling Request - 1"
//              Postman ---> Response - 1
//              Server-Console(with Comment) --> "Handling Request - 1"
//              Postman ---> Infinite Loop
 /*
app.use("/users",(req,res)=>{
  console.log("Handling Request - 1");
  //res.send("Response - 1");
},
(req,res)=>{
  console.log("Handling Request - 2");
  res.send("Response - 2");
});
 */

//To fix above problem we use next() method to pass control to next RH(request hanlder)
// output ---> Server-Console(without Comment) --> "Handling Request - 1" "Handling Request - 2",
//                                         ERROR('Cannot set headers after they are sent to the client)
// This ERROR will come bcz when uncommented so we are trying to send another response that is Response-2 to same URL meanse
// we are trying to send response to same client again
//              Postman ---> Response - 1

//              Server-Console(with Comment) --> "Handling Request - 1", "Handling Request - 2"
//              Postman ---> Response - 2
 /*
app.use("/users",(req,res,next)=>{
  console.log("Handling Request - 1");
  // res.send("Response - 1");
  next();
},
(req,res)=>{
  console.log("Handling Request - 2");
  res.send("Response - 2");
});
*/

// ====================== HANDLE MULTIPLE ROUTE HANDLERS =======================
// The RH(Request/Route Handler) send the response is known as Response handler and othe Rh which we go through one by one
// they are known as Middleware Functions
 /*
app.use(
  "/",
  (req, res, next) => {
    console.log("1");
    // res.send("Response - 1");
    next();
  },
  (req, res, next) => {
    console.log("2");
    // res.send("Response - 2");
    next();
  },
  (req, res, next) => {
    console.log("3");
    // res.send("Response - 3");
    next();
  },
  (req, res, next) => {
    console.log("4");
    // res.send("Response - 4");
    next();
  }
);
 */



// // Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


