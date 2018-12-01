//Load model
const Post = require("../models/post");
const Profile = require('../models/profile')

//Load validation
const validatePostInput = require('../validation/post');

exports.getAllPost = (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(err => res.status(404));
}



exports.getPostById = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({
        noPostFound: " No Post Found with that ID"
      })
    );
}



exports.CreatePost = (req, res) => {
  const {
    errors,
    isValid
  } = validatePostInput(req.body);
  //chechk validation
  if (!isValid) {
    res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
}




exports.deletePost = (req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id).then(post => {
      //check for post user
      if (post.user.toString() == req.user.id) {
        //delete
        post.remove().then(() => res.status(200).json({
          Success: true
        }))
      } else
        res.status(400).json({
          notAuthorized: 'User not authorized'
        })
    }).catch(err => res.json({
      noPostFound: 'no post found'
    }));
  })
}




exports.likePost = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      //check if any user liked before
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
      ) {
        return res.status(400).json({
          alreadyLiked: "Post is already liked by the user"
        });
      }
      post.likes.unshift({
        user: req.user.id
      });

      //save in the database
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(400).json({
      postnotfound: "post not found"
    }));
}



exports.unlikePost = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      //check if any user liked it before
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
      ) {
        return res
          .status(400)
          .json({
            notLiked: "This post not liked by the user yet"
          });
      }
      //Get remove index
      const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);

      //Splice item
      post.likes.splice(removeIndex, 1);

      //save in the database
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(400).json({
      postnotfound: "post not found"
    }));
}



exports.commentInPost = (req, res) => {
  Post.findById(req.params.id).then(post => {
    const {
      errors,
      isValid
    } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      res.status(400).json(errors);
    }
    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar
    }
    //add new post to the comment array
    post.comments.unshift(newComment);

    //save to the database
    post.save().then(post => res.json(post))

  }).catch(err => res.status(400).json({
    notFound: ' post not found '
  }))
}



exports.deleteComment = (req, res) => {
  Post.findById(req.params.id).then(post => {

    //find if comment exits
    if (post.comments.filter(item => item._id.toString() === req.params.comment_id).length === 0) {
      return res.status(400).json({
        commentnotExist: 'Comment does not exist'
      })
    }
    //Get remove index
    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)

    //splice from the array
    post.comments.splice(removeIndex, 1)

    //save in database
    post.save().then(post => res.json(post))

  }).catch(err => res.status(400).json({
    notFound: ' post not found '
  }))
}