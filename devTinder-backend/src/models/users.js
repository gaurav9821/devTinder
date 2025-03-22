const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phNo: {
    type: String,
  },
  age: {
    type: Number,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
});
//const <model-Name> = mongoose.model("<collection_name>"", userSchema);
const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
