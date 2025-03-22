const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    // URL : mongodb+srv://
    // UserName : gaurav120998chachada
    // Password : qpmeAdAuXOpCpv40
    // Cluster name : devtinderapp.axhkr
    // DB Name : devTinder
    "mongodb+srv://gaurav120998chachada:qpmeAdAuXOpCpv40@devtinderapp.axhkr.mongodb.net/devTinder"
  );
};

module.exports = { connectDb };
