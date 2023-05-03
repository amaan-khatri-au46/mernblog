// here we will make a Post schema with the help of mogoose library ...
// Schema means how the bascic structure of our collection looks like .... 

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);