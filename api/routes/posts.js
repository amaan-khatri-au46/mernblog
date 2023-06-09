// we can create a new post delete them update them .....
const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  //  we can only update the valid user post which is login
  try {
    const post = await Post.findById(req.params.id);
    // here i am going to validate the user id
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE POST

router.delete("/:id", async (req, res) => {
  //  we can only update the valid user post which is login
  try {
    const post = await Post.findById(req.params.id);
    // here i am going to validate the user id
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post Has Been Deleted!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can Delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Post By Id 
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // when we are fetching we are not suppose to show the password
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Post 
router.get("/", async (req, res) => {
    // here i am using query params so i can also find with particular username
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            // cheking the username with queryusername
            // {username : username}
            posts = await Post.find({username})
        } else if(catName){
            posts = await Post.find({categories:{
                $in:[catName],
            }})
        } else{
            // all post here 
            posts = await Post.find();
        }
        res.status(200).json(posts)
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
