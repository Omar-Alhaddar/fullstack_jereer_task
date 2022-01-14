const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("./server/config/mongoose.config");

app.use(express.urlencoded({ extended: true }));
require("./server/routes/post.route")(app);
require("./server/routes/user.route")(app);

const server = app.listen(8000, () => {
  console.log("Listening at Port 8000");
});
