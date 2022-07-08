// const router = require("express").Router();
// const { User, validate } = require("../models/userModel");
// const bcrypt = require("bcrypt");

// router.post("/", async (req, res) => {
//   console.log("Hope its here!! ");
//   try {
//     // console.log(req.body);
//     console.log("Heyyy");
//     const { error } = validate(req.body);
//     if (error) {
//       console.log("your log is here!!!!!!!!!!!!!!!!");
//       return res.status(400).send({ message: error.details[0].message });
//     }

//     const user = await User.findOne({ email: req.body.email });
//     if (user) return res.status(409).send({ message: "User already exist" });

//     console.log("such an dumbass :(");

//     console.log("You are good to go :) ");
//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashPassword = await bcrypt.hash(req.body.password, salt);

//     await new User({ ...res.body, password: hashPassword }).save();
//     res.status(201).send({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Internal server error" });
//   }
// });
// module.exports = router;