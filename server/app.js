// Package
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// Resource
require("./utils/db");

// Router
const usersRouter = require("./routes/users");
const propertiesRouter = require("./routes/properties");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const bookingsRouter = require("./routes/bookings");
const transactionsRouter = require("./routes/transactions");

// Define Express
const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, "public")));

// Menyajikan file statis dari folder public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware Router
app.use("/api/users", usersRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/bookings", bookingsRouter);
app.use("/api/transactions", transactionsRouter);

// Handling Invalid Route
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handling
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  const errorResponse = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };
  req.app.get("env") === "development" ? res.json(errorResponse) : {};
});

module.exports = app;
