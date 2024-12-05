// run "node server.js" to start
// backend/app.js

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors());

// for mongodb
const mongoose = require("mongoose");
const initializeDatabase = require("./scripts/initializeDatabase");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const Movie = require("./models/movie");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// for serving build
app.use(express.static(path.join(__dirname, 'client/build')));
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
        const hashed_password = await bcrypt.hash(password, salt);
        const user = new User({
            first_name,
            last_name,
            email,
            password: hashed_password  //Corrected field name to 'password'
        });
        await user.save();
        res.send({ message: "Registration successful" });
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Favorite a movie
app.post("/favorite", async (req, res) => {
    try {
        const email = req.cookies["session-cookie"];
        if (!email) {
            return res.status(401).send({ error: "Not authenticated" });
        }
        const { title } = req.body;
        await User.findOneAndUpdate(
            { email },
            { $addToSet: { favorited_movies: title } }  //Corrected field name to 'favorited_movies'
        );
        res.send({ message: "Movie added to favorites" });
    } catch (error) {
        res.send({ error: error.message });
    }
});
// Unfavorite a movie
app.post("/unfavorite", async (req, res) => {
    try {
        const email = req.cookies["session-cookie"];
        if (!email) {
            return res.status(401).send({ error: "Not authenticated" });
        }
        const { title } = req.body;
        await User.findOneAndUpdate(
            { email },
            { $pull: { favorited_movies: title } }
        );
        res.send({ message: "Movie removed from favorites" });
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Return movies by a specified genre
app.post("/genres", async (req, res) => {
    try {
        const genre = req.body.genre;
        const movies = await Movie.find({ "info.genres": genre }).sort({ "info.rating": -1 });
        res.send(movies);
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Return a list of all possible genres
app.get("/genrelist", async (req, res) => {
    try {
        const genres = await Movie.distinct("info.genres");
        res.send(genres);
    } catch (error) {
        res.send({ error: error.message });
    }
});
// Return movies that the currently logged-in user has favorited
app.get("/favorited", async (req, res) => {
    try {
        const email = req.cookies["session-cookie"];
        if (!email) {
            return res.status(401).send({ error: "Not authenticated" });  //Added authentication check
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        const favoriteTitles = user.favorited_movies;
        // Retrieve movie details for these titles
        const movies = await Movie.find({ title: { $in: favoriteTitles } });
        res.send(movies);
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Sign in. Also sets cookies
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;  //Changed from GET to POST and get data from req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);  //Corrected password comparison
        if (isCorrectPassword) {
            res.cookie("session-cookie", email);
            res.send({ message: "Login successful" });
        } else {
            res.status(401).send({ message: "Incorrect Password" });
        }
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Sign out, clear session cookie
app.get("/signout", (req, res) => {
    try {
        res.clearCookie("session-cookie");
        res.send({ message: "Logged out" });
    } catch (error) {
        res.send({ error: error.message });
    }
});
