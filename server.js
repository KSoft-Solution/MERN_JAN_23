require("colors");
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { logger, logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const corsOptions = require("./config/corsOption");
const database = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3500;
database()

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoute'))
app.use('/notes', require('./routes/notesRoute'))
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Page not found" });
  } else {
    res.type("txt").send("404 page not found");
  }
});

app.use(errorHandler);

mongoose.set('strictQuery', true)
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(`server is running on http://localhost:${PORT}`.green)
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

