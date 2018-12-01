const express = require("express");
const router = express.Router();

//Load files
const controller = require('../../controllers/post')
const IsAuth = require('../../middleware/chechAuth')


//@route   Get api/posts
//@desc    Get all post
//@access  public

router.get("/", controller.getAllPost);

//@route   Get api/posts/:id
//@desc    Get post by id
//@access  public

router.get("/:id", controller.getPostById);

//@route   Post api/posts
//@desc    create post
//@access  private

router.post(
  "/",
  IsAuth,
  controller.CreatePost
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private

router.delete(
  "/:id",
  IsAuth,
  controller.deletePost
);

// @route   Post api/posts/like/:id
// @desc    Like post
// @access  Private

router.post(
  "/like/:id",
  IsAuth,
  controller.likePost
);

// @route   Post api/posts/unlike/:id
// @desc    unlike post
// @access  Private

router.post(
  "/unlike/:id",
  IsAuth,
  controller.unlikePost
);

// @route   Post api/posts/comment/:id
// @desc    comment post
// @access  Private

router.post('/comment/:id', IsAuth, controller.commentInPost)

// @route   Delete api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private

router.post('/comment/:id/:comment_id', IsAuth, controller.deleteComment)


module.exports = router;