const express = require("express");
const app = express();

//use the port from the env file first, if not found then use 8080
const port = process.env.PORT || 8080;

//your page will try to get home ('/') the moment you mount the app
//here we tell express what to do when we get to the home page '/'

app.get("/", (req, res) => {
  res.send("Welcome to the home page! You are now connected");
});

//logging in/out
app.get("/api/login", (req, res) => {
  res.send("here is the login page");
});
app.delete("/api/logout", (req, res) => {
  res.send("successfully logged out");
});

//palettes
app.post("/api/palettes/create", (req, res) => {
  res.send("create palette");
});
app.get("/api/users/:id/palettes", (req, res) => {
  res.send("here are the palettes");
});
app.patch("/api/users/:id/palettes", (req, res) => {
  res.send("here is the palette");
});
app.delete("/api/user/:id/palettes", (req, res) => {
  res.send("deleted palette");
});

//hey express, listen to this port and handle requests
app.listen(
  port,
  console.log(`Express App is now listening at  http://localhost:${port}`)
);
