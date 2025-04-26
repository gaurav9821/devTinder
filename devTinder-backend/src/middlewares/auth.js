const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");

// We have to provide this userAuthMiddleware to every API except LOGIN and SIGNUP
const userAuthMiddleware = async (req, res, next) => {
  try {
    // get jwtToken from the request cookie
    const { jwtToken } = req.cookies;

    // Verify the token
    if (!jwtToken) {
      throw new Error("Token is Expired");
    }

    //Decode the value or payload inside the jwt Token
    const decodedValue = await jwt.verify(jwtToken, "Dev@Tinder#3265");
    //Extarct _id from Decodec value of jwt token
    const { _id } = decodedValue;

    //Get the user from DB for Id acttached in JWT token
    const userFromDb = await UserModel.findById(_id);

    if (!userFromDb) {
      throw new Error("User does not exist");
    }
    //Attach the user in request so that when transfered control to another RH(Request Handler)
    // SO they will directly get the user
    req.user = userFromDb;
    //Transfer control to next RH(request Handler)
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuthMiddleware };
// const adminAuth = (req, res, next) => {
//   const token = "abcd";
//   const isAdminAuthenticated = token === "abcd";

//   if (isAdminAuthenticated) {
//     console.log("Valid Admin");
//     next();
//   } else {
//     res.status(401).send("Not Authorized Admin");
//   }
// };

// const userAuth = (req, res, next) => {
//   const token = "abcd";
//   const isUserAuthenticated = token === "abcd";

//   if (isUserAuthenticated) {
//     console.log("Valid User");
//     next();
//   } else {
//     res.status(401).send("Not Authorized User");
//   }
// };

// module.exports = { adminAuth, userAuth };
