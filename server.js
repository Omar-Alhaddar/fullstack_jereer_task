const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const cookieParser = require('cookie-parser');

require("./server/config/mongoose.config");
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
require("./server/routes/post.route")(app);
require("./server/routes/user.route")(app);

const server = app.listen(8000, () => {
  console.log("Listening at Port 8000");
});

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
