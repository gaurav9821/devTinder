const { default: mongoose } = require("mongoose");

const validator = require("validator");

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
//const <model-Name> = mongoose.model("<collection_name>"", userSchema);
const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
