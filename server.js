require("colors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { logger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const corsOptions = require('./config/corsOption')

const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
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

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`.green);
});
