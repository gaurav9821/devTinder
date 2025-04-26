const { default: mongoose } = require("mongoose");

const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    phNo: {
      type: String,
      // required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email Id is not Valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      minLength: 4,
      maxLength: 6,
      // uppercase: true,
      trim: true,
      validate(value) {
        console.log(["Male", "Female", "Other"].includes(value));
        if (!["Male", "Female", "Other"].includes(value)) {
          throw new Error("Wrong Gender Input");
        }
      },
    },
    about: {
      type: String,
      default: "This is default string if no about added",
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not a Valid URL");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  //Create a JWT Token
  //1st argument is Payload : that is userId from DB
  // 2nd argument is Secret Key
  // 3rd argument is expiry date
  const token = await jwt.sign({ _id: user._id }, "Dev@Tinder#3265", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHashFromDB = user.password;
  console.log(passwordHashFromDB);
  console.log(passwordInputByUser);
  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    passwordHashFromDB
  );

  return isValidPassword;
};
//const <model-Name> = mongoose.model("<collection_name>"", userSchema);
const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
