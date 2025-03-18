const adminAuth = (req, res, next) => {
  const token = "abcd";
  const isAdminAuthenticated = token === "abcd";

  if (isAdminAuthenticated) {
    console.log("Valid Admin");
    next();
  } else {
    res.status(401).send("Not Authorized Admin");
  }
};

const userAuth = (req, res, next) => {
  const token = "abcd";
  const isUserAuthenticated = token === "abcd";

  if (isUserAuthenticated) {
    console.log("Valid User");
    next();
  } else {
    res.status(401).send("Not Authorized User");
  }
};

module.exports = { adminAuth, userAuth };
