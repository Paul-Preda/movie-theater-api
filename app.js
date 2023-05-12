let express = require("express");
let app = express();
let restRouter = require("./routes/restaurant-router");
let userRouter = require("./routes/user-router");
let db = require("./db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/restaurants", restRouter);
app.use("/users", userRouter);