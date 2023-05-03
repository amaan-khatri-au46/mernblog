const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")
const bcrypt = require("bcrypt");

//Update the user....
// user can bascially update his name and password ....
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      // if user send a new password we should hash this password again ....
      const salt = await bcrypt.genSalt(10);
      // just hashed the new password which user has updaeted
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          // setting everthing inside the req and body ....
          $set: req.body,
        },
        // here i am setting a new updated user .....
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

// delete the user ...
// Also user can delte his id ...

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    // i also want to delete all post related to that user
    try {
      const user = await User.findById(req.params.id);
      try {
        // i want to delete the post
        // checking the user and delete them 
        await Post.deleteMany({username: user.username});
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User Not Found")
    }
  } else {
    res.status(401).json("You can Delete  only your account!");
  }
});

// Get USER BY ID
router.get("/:id",async (req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    // when we are fetching we are not suppose to show the password
    const {password, ...others} = user._doc
    res.status(200).json(others)
  }catch(error){
    res.status(500).json(error)
  }
})

module.exports = router;
