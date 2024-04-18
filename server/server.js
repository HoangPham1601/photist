const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const db = require("./config/db");

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const bcryptSalt = bcrypt.genSaltSync(10);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}));

// Expose all static resources
app.use("/uploads", express.static(__dirname + "/uploads"));

// Photomiddlewares
const photosMiddleware = multer({ dest: "uploads" });

// Connect to MongoDB
db.connect();

// Routes
app.get("/", (_, res) => {
  res.send("Hello World");
});

// Post user's data to database
app.post("/join", async (req, res) => {
  const {
    name,
    email,
    username,
    avatar,
    photos,
    password,
    company,
    website,
    specialized,
  } = req.body;

  try {
    const userData = await db.User
      .create({
        name,
        email,
        username,
        avatar,
        photos,
        company,
        specialized,
        website,
        password: bcrypt.hashSync(password, bcryptSalt),
      });

    res.json(userData);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const account = await db.User.findOne({ email });

  if (account) {
    const authPasswd = bcrypt.compareSync(password, account.password);

    if (authPasswd) {
      jwt.sign(
        {
          email: account.email,
          id: account._id,
          username: account.username,
        },
        JWT_SECRET_KEY,
        (err, asyncToken) => {
          if (err) throw err;
          res.cookie("token", asyncToken).json(account);
        },
      );
    } else {
      res.status(422).json("Wrong password");
    }
  } else {
    res.json("Not a member");
  }
});

// app.get("/info", (req, res) => {
//   const { token } = req.cookies;
//
//   token
//     ? jwt.verify(token, JWT_SECRET_KEY, {}, async (err, userData) => {
//       if (err) throw err;
//
//       const {
//         name,
//         email,
//         username,
//         avatar,
//         company,
//         specialized,
//         website,
//         _id,
//       } = await db.User.findById(userData.id);
//
//       res.json({
//         name,
//         username,
//         email,
//         avatar,
//         company,
//         specialized,
//         website,
//         _id,
//       });
//     })
//     : res.json(null);
// });

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await db.User.findById(id));
});

app.put("/profile", async (req, res) => {
  const {
    id,
    name,
    email,
    username,
    avatar,
    photos,
    company,
    website,
    specialized,
  } = req.body;

  const userData = await db.User.findById(id);

  userData.set({
    name,
    email,
    username,
    avatar,
    photos,
    company,
    website,
    specialized,
  });

  userData.save();
  res.json("ok");
});

app.get("/profile", async (_, res) => {
  res.json(await db.User.find());
});

app.post("/logout", (_, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { originalname, path } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }

  res.json(uploadedFiles);
});

app.post("/uploadByLink", async (req, res) => {
  const { link } = req.body;
  const newName = `photo${Date.now()}.jpg`;

  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(newName);
});

app.use("/addToCart", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Online on http://localhost:${PORT}`);
});
