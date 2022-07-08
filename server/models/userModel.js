const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
// const Joi = require("joi");
const image = require("joi-image-extension");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    mobileNo: { type: "Number", required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      //   required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRATEKEY, {
    expiresIn: "30d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const Schema = joi.object({
    name: joi.string().required().label("name"),
    email: joi.string().email().required().label("email"),
    mobileNo: joi
      .number()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .label("number"),
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    pic: image().label("pic"),
  });
  return Schema.validate(data);
};

module.exports = { User, validate };
