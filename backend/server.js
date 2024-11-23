// run "node server.js" to start

const express = require('express');
const app = express();
const path = require('path');

// for mongodb
const mongoose = require("mongoose");
const initializeDatabase = require("./scripts/initializeDatabase");
const bcrypt = require("bcrypt");
const User = require("./models/user");

app.use(express.json());

// for serving build
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.listen(3000, () => console.log('Server ready on port 3000'));

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/movies-group-11");
const db = mongoose.connection;

db.on("open", function() {
    initializeDatabase();
});
db.on("error", function (err) {
    console.log(err);
});

// routes
// Register
app.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        hashed_password = await bcrypt.hash(password, salt);
        const user = new User({
            first_name,
            last_name,
            email,
            hashed_password
        })
        await user.save();
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Favorite a movie
app.post("/favorite", async (req, res) => {
    try {
        const {email, title} = req.body;
        await User.findOneAndUpdate({ email: email}, {$addToSet:{ title: title }});
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Return movies by a specified genre
app.get("/genres", async (req, res) => {
    try {
        const genre = req.body.genre;
        const movies = await Movie.find({genres: genre});
        res.send(movies);
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Return movies that the currently logged-in user has favorited
app.get("/favorited", async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({email});
        res.send(user.liked_movies);
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Signin
app.get("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (isCorrectPassword) {
            res.send(email);
        } else {
            res.send({message: "Incorrect Password"});
        }
    } catch (error) {
        res.send({ error: error.message });
    }
})
