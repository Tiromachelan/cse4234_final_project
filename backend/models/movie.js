const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema for the movies
const MovieSchema = new Schema(
    {
        year: Number,
        title: String,
        info: {
            directors: [{ type: String }],
            release_date: Date,
            rating: Number,
            genres: [{ type: String }],
            image_url: String,
            plot: String,
            rank: Number,
            running_time_secs: Number,
            actors: [{ type: String }]
        }
    }
);

module.exports = mongoose.model("Movie", MovieSchema);