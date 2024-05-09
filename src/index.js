const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

const Movie = mongoose.model('Movie', { 
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
});

app.delete("/:id", async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    return res.send(movie);
});

app.put("/:id", async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    }, {
        new: true,
    });

    return res.send(movie);
});

app.get("/", async (req, res) => {
    const movies = await Movie.find();

    return res.send(movies);
});

app.post("/", async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })

    await movie.save();
    
    return res.send(movie);
});

app.listen(port, () => {
    mongoose.connect(
        'mongodb+srv://<mongodb-username>:<mongodb-password>@cluster0.pjzy40i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );

    console.log("App running.");
});