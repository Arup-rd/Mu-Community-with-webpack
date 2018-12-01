const express = require("express");
const router = express.Router();

//load config
const controller = require('../../controllers/user')
const IsAuth = require('../../middleware/chechAuth')

//@route   Post api/users/register
//@desc    Register users route
//@access  public

router.post("/register", controller.registerUser);

//@route   Post api/users/login
//@desc    Login user / Returning JWT Token
//@access  public

router.post("/login", controller.loginUser);

//@route   Get api/users/current
//@desc    Return current user
//@access  private

router.get(
  '/current',
  IsAuth,
  controller.currentUser
)

module.exports = router;