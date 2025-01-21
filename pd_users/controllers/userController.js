const User = require("../models/user");
const { globalResponse } = require("../middlewares/globalResponse");
const argon2 = require("argon2");
const { generateToken } = require("../middlewares/authorization");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      country,
      city,
      address,
      userType,
      password,
    } = req.body;
    const hashedPassword = await argon2.hash(password); // generating hash
    const newUser = new User({
      name,
      email,
      phoneNumber,
      country,
      city,
      address,
      userType,
      createdOn: new Date(),
      password: hashedPassword,
    });

    const savedUser = await newUser.save(); // saving user
    if (savedUser) {
      const response = globalResponse(
        201,
        "User Created Successfully",
        null,
        null
      );
      res.status(response.status).json(response);
    }
  } catch (error) {
    const response = globalResponse(500, "unable to create user", error, null);
    res.status(response.status).json(response);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email: email }).lean(); // lean improves performance bu just returning plain object
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }
    const isMatched = await argon2.verify(user.password, password);
    console.log("isMatched", isMatched);
    if (!isMatched) {
      throw new Error("Wrong credentials");
    }
    user.loggedInTime = new Date(); //capture log in time
    delete user.password;
    delete user.token;
    const token = await generateToken(user);
    if (!token) {
      throw new Error("Token could not be generated");
    }

    const resData = { user, token };
    const response = globalResponse(200, "User verified", null, resData);
    const updateToken = await User.updateOne({email:email},{$set:{token:token}})
    if(updateToken){
      res.status(response.status).json(response);
    }
  } catch (error) {
    console.log(error);
    const response = globalResponse(
      501,
      "Some error occurred",
      error.message,
      null
    );
    res.status(response.status).json(response);
  }
};

module.exports = {
  register,
  login,
};
