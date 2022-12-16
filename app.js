const express = require("express");
const errorMiddleware = require("./middlewares/error");
const app = express();

//route imports
const news = require("./routes/newsRoute");
const weather = require("./routes/weatherRoute");
const user = require("./routes/userRoute");

app.use(express.json());

app.use("/api/v1", news);
app.use("/api/v1", weather);
app.use("/api/v1/user", user);

app.use(errorMiddleware);
module.exports = app;
