const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const upload = multer();
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  const absolutePath = path.join(__dirname, "views", "index.html");
  res.sendFile(absolutePath);
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size,
  });
});
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
