// Populates the db data from movies.json

const mongoose = require("mongoose");
const data = require("../data/movies.json")
const Movie = require("../models/movie")
const User = require("../models/user");

function initializeDatabase() {
    Movie.collection.drop();
    try {
        Movie.insertMany(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = initializeDatabase