let express = require("express");
let app = express();
let showRouter = require("./routes/show_router");
let userRouter = require("./routes/user_router");
let db = require("./db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/shows", showRouter);
app.use("/users", userRouter);

module.exports = { app }