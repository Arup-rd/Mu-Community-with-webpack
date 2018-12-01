const express = require("express");
const router = express.Router();


//Load files
const controller = require('../../controllers/profile')
const IsAuth = require('../../middleware/chechAuth')


// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  IsAuth,
  controller.currentUserProfile
);

// @route   POST api/profile/all
// @desc    Get all profile
// @access  Public

router.get("/all", controller.allProfile);

// @route   POST api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", controller.getProfileByHandle);

// @route   POST api/profile/user/:user_id
// @desc    Get profile by userid
// @access  Public

router.get("/user/:user_id", controller.getProfileByUserId);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  IsAuth,
  controller.createOrEditUserProfile
);

// @route   post api/profile/experience
// @desc    Add  users experience to profile
// @access  Private

router.post(
  "/experience",
  IsAuth,
  controller.adduserExperience
);

// @route   post api/profile/education
// @desc    Add  users education to profile
// @access  Private

router.post(
  "/education",
  IsAuth,
  controller.addUserEducation
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete user expeience from the profile
// @access  Private

router.delete(
  "/experience/:exp_id",
  IsAuth,
  controller.deleteExperience
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete user education from the profile
// @access  Private

router.delete(
  "/education/:edu_id",
  IsAuth,
  controller.deleteUserEducation
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private

router.delete(
  "/",
  IsAuth,
  controller.deleteUserProfile
);

module.exports = router;