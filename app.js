let express = require("express");
let app = express();
let showRouter = require("./routes/restaurant-router");
let userRouter = require("./routes/user-router");
let db = require("./db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("./", showRouter);
app.use("./users", userRouter);