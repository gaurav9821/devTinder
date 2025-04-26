const express = require("express");
// VERY IMPORTANT:
//ALWAYS CONNECT DB BEFORE STARTING THE SERVER
const { connectDb } = require("./config/database");
const { UserModel } = require("./models/users");
const { validateSignUpData } = require("./utils/validations");
const validator = require("validator");
const bcrypt = require("bcrypt");

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

//One Rouute can have multiple route handlers
// output ---> Server-Console(without Comment) --> "Handling Request - 1"
//              Postman ---> Response - 1
//              Server-Console(with Comment) --> "Handling Request - 1"
//              Postman ---> Infinite Loop
/*
app.use("/users",(req,res)=>{
  console.log("Handling Request - 1");
  //res.send("Response - 1"); //If we comment this line then it will go to infinite loop if not commented it send response to client
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
  // res.send("Response - 1"); //If comment it will go to next Route handler and send Response - 2 and if not comment it will throw error
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

//===============WRITING MIDDLEWARES LIKE (ADMINAUTHMIDDLEWARE,USERAUTHMIDDLEWARE)=============

/*
app.get("/admin/getAllData",(req,res)=>{
  const token = "abcd";
  const isAdminAuthorized = token === "abcde";
  if (isAdminAuthorized) {
    res.send("Get All admin Data");
  } else {
    res.status(401).send("Not Autorized");
  }
});

app.get("/admin/deleteAllData", (req, res) => {
  const token = "abcd";
  const isAdminAuthorized = token === "abcd";
  if (isAdminAuthorized) {
    res.send("Delete All admin Data");
  } else {
    res.status(401).send("Not Autorized");
  }
});
*/

/*
const {adminAuth,userAuth} = require("./middlewares/auth");
app.use("/admin",adminAuth);
// app.use("/users",userAuth);

//If only 1 /users route API so can be written like
app.use("/users", userAuth,(req,res)=>res.send("USer data sent"));

//ADMIN APIs
app.get("/admin/getAllData", (req, res) => {
  res.send("Get All admin Data");
});

app.get("/admin/deleteAllData", (req, res) => {
  res.send("Delete All admin Data");

});

//USER APIs
// app.get("/users/getAllData", (req, res) => {
//   res.send("Get All User Data");
// });

// app.get("/users/deleteAllData", (req, res) => {
//   res.send("Delete All User Data");
// });

*/
// ===================ERROR HANDLING=================

/*
//Best way is Try and catch
app.get("/getUserData",(req,res)=>{
  try{
    throw new Error("Error is thrown manually")
  }
  catch(err){
    res.status(500).send("Something went wrong bcz ---> "+err.name+ " : "+err.message);
  }
})

//If you want to handle any error which can occur so add below code in end of your code means this route code should be 
//the last one

app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(500).send("Something went wrong....")  
  }
})
*/

// Convert every incoming JSON API request into JS object
app.use(express.json());

connectDb()
  .then((res, rej) => {
    console.log("DB Connected Successfully!!!!!");
    app.listen(3000, () => {
      console.log("Application started at Port 3000...");
    });
  })
  .catch((err) => {
    console.log("DB Connection Failed " + err.message);
  });

//ENTRY POINT OF APP that is SIGNUP API
/*
app.post("/signup", async (req, res) => {
  try {
    // const userObj = {
    //   firstName: "Shweta ",
    //   lastName: "Shukla",
    //   phNo: "+91-8788382247",
    //   age: 27,
    //   emailId: "shweta.shukla@gmail.com",
    //   password: "gauravlovesshweta",
    //   gender: "Female",
    // };
    // creating a new instance of USerModel and we have passed  data inside it
    // const newUser = new UserModel(userObj);

    // console.log(req.body);
    //Adding data which we are adding in POstman while sending Request(BAD METHOD)
    //const newUser = new UserModel(req.body);

    //Validate Inputs
    validateSignUpData(req);

    //Extract only required data from the request body all other data should get ignored(GOOD METHOD)
    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt Password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Data Saved Successfully");
  } catch (err) {
    res.status(400).send("Error while saving Data :" + err.message);
  }
});
*/

/*
// LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const userDBData = await UserModel.findOne({ emailId: emailId });

    if (!userDBData) {
      throw new Error("Invalid Credentials");
    }
    const isValidUser = await bcrypt.compare(password, userDBData.password);

    if (isValidUser) {
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

*/

// Array of objects which have emailId as userEemailId
app.get("/usersByEmail", async (req, res) => {
  try {
    const userEmailId = req.body.emailId;
    const userDetailsByEmail = await UserModel.find({ emailId: userEmailId });
    res.send(userDetailsByEmail);
  } catch (err) {
    res.status(400).send("Cannot get Data :" + err.message);
  }
});

// First object which have emailId as userEemailId from DB
app.get("/usersByEmailId", async (req, res) => {
  try {
    const userEmailId = req.body.emailId;
    const userDetailsByEmail = await UserModel.findOne({
      emailId: userEmailId,
    });
    res.send(userDetailsByEmail);
  } catch (err) {
    res.status(400).send("Cannot get Data :" + err.message);
  }
});

// ALl documents from user collection
app.get("/allUsers", async (req, res) => {
  try {
    const userEmailId = req.body.emailId;
    const userDetailsByEmail = await UserModel.find({});
    res.send(userDetailsByEmail);
  } catch (err) {
    res.status(400).send("Cannot get Data :" + err.message);
  }
});

app.delete("/deleteUser", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    await UserModel.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Error while deleting user data" + err.message);
  }
});

app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const updatedToData = req.body;
  console.log(updatedToData);
  try {
    //API LEVEL VALIDATION : ONLY SOME KEYS SHOULD BE ALLOWED TO GET UPDATED BY USER NOT ALL KEYS
    // KEYS ALLOWED : "photoUrl", "age", "about", "gender", "skills"
    // KEyS NOT ALLOWED : "firstName","lastName","emailId"
    const ALLOWED_KEYS = [
      "phNo",
      "photoUrl",
      "age",
      "about",
      "gender",
      "skills",
      "password",
    ];

    const isAllowed = Object.keys(updatedToData).every((k) => {
      return ALLOWED_KEYS.includes(k);
    });

    if (!isAllowed) {
      throw new Error("UPDATE NOTE ALLOWED");
    }

    if (updatedToData?.skills?.length > 10) {
      throw new Error("YOU CAN ONLY ADD UPTO 10 skills");
    }

    const beforeUpdatedData = await UserModel.findByIdAndUpdate(
      userId,
      updatedToData,
      { returnDocument: "before", runValidators: true }
    );
    console.log(beforeUpdatedData);
    res.send("User Data Updated Successfully");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Error while updating user data : " + err.message);
  }
});

//SIGNUP API WITH VALIDATIONS AND JWT TOKEN

app.post("/signup", async (req, res) => {
  try {
    //Validate the inputs coming from req body
    validateSignUpData(req);

    //Seprate whatever we need to store in DB from req body
    const { firstName, lastName, emailId, password } = req.body;

    //Encrypting Password for Security
    const passwordHash = await bcrypt.hash(password, 10);

    //Create a new instance of User with all details coming from Req body
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    //Save the USer in DB
    await user.save();

    res.send("User Data Saved Successfully");
  } catch (err) {
    res.status(400).send("ERROR is : " + err.message);
  }
});

// LOGIN API WITH JWT TOKEN AND COOKIES IMPLEMENTATION
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuthMiddleware } = require("./middlewares/auth");

app.use(cookieParser());

app.post("/login", async (req, res) => {
  try {
    //Fetch emailId and Password from request body
    const { emailId, password } = req.body;

    //Validate email entered by User in request body
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Credentials");
    }
    //Find the user in DB and return that user object using emailId
    const userFromDb = await UserModel.findOne({ emailId });

    //Validate if user exist in DB or not
    if (!userFromDb) {
      throw new Error("User not found");
    }

    //Validate the password entered by user and the hash password which we store in DB are same or not
    // const isValidPassword = await bcrypt.compare(password, userFromDb.password);

    //We can use helper method crated to get token as it uses many user related data so we have created
    // user schema methods
    const isValidPassword = await userFromDb.validatePassword(password);

    if (isValidPassword) {
      //Create a JWT Token
      //1st argument is Payload : that is userId from DB
      // 2nd argument is Secret Key
      // 3rd argument is expiry date

      // const token = await jwt.sign({ _id: userFromDb._id }, "Dev@Tinder#3265", {
      //   expiresIn: "7d",
      // });

      //We can use helper method crated to get token as it uses many user related data so we have created
      // user schema methods
      const token = await userFromDb.getJWT();

      //Attach The JWT Token inside cookie so that next time when any api called it will call using this cookie
      //Cookie will expire in 8 hours
      res.cookie("jwtToken", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
    } else {
      throw new Error("Invalid Credentials");
    }

    res.send("Login Successfull");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuthMiddleware, async (req, res) => {
  try {
    //COmmented code below can be performed by userAuthMiddleware

    // const { jwtToken } = req.cookies;

    // if (!jwtToken) {
    //   throw new Error("Token is Expired");
    // }

    // const decodedValue = await jwt.verify(jwtToken, "Dev@Tinder#3265");

    // const userInDB = await UserModel.findById(decodedValue._id);

    // if (!userInDB) {
    //   throw new Error("User does not exist");
    // }

    const userInDB = req.user;

    res.send(userInDB);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuthMiddleware, async (req, res) => {
  try {
    const userInDB = req.user;

    if (!userInDB) {
      throw new Error("User not exist");
    }
    res.send(userInDB.firstName + " Has sended the COnnection Requests");
  } catch (err) {
    res.status(400).send("ERROR  : " + err.message);
  }
});

