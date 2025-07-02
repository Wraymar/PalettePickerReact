const express = require("express");
const app = express();

const { logInUser } = require("./controllers/authControllers");
const logRoutes = require("./middleware/logRoutes");
const {
  listPalettes,
  findByUser,
  createPalette,
} = require("./controllers/palette_Controllers");

app.use(logRoutes);

//your page will try to get home ('/') the moment you mount the app
//here we tell express what to do when we get to the home page '/'
app.get("/", (req, res) => {
  res.send("Welcome to the home page! You are now connected");
});

//logging in/out
app.post("/api/login", logInUser);

//palettes
app.post("/api/palettes/:id/create", createPalette);

//list all palettes
app.get("/api/palettes", listPalettes);

//get palettes from a specific user
app.get("/api/users/:id/palettes", findByUser);

app.patch("/api/users/:id/palettes", (req, res) => {
  res.send("here is the palette");
});

app.delete("/api/user/:id/palettes", (req, res) => {
  res.send("deleted palette");
});

//use the port from the env file first, if not found then use 8080
const port = process.env.PORT || 8080;

//hey express, listen to this port and handle requests
app.listen(
  port,
  console.log(`Express App is now listening at  http://localhost:${port}`)
);
