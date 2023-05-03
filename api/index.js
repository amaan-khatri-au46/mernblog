const express = require("express");
const app = express();
const PORT = 8080;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
// this just a middleware for parsing a json object
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))

// here we will set strict query so it will not throw any error in terminal
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To Mongo Db");
  } catch (error) {
    throw error;
  }
};

// for passing the image data we are bascially doing this steps ....

const storage = multer.diskStorage({
  // cb will take care of the error
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  // bascilly it's going to take our file
  // and its going to save inside the images folder
  // filename will be the name whic we are providing
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//   for uploading file
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
  connect();
  console.log("Server Started At Port " + PORT);
});
