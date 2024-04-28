
const express = require("express");
const logger =require("morgan");
const movies =require("./movies.json");
const db = require("./models");
const app = express();
const port = 4000;
const models = require('./models/models');

app.use(express.json())

app.get("/", (req, res) => {


    res.send("server running");
});
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log(`Connected to the database '${db.url}' !`);
  })
  .catch(err => {
    console.log(`Cannot connect to the database '${db.url}' !`, err);
    process.exit();
  });

app.use(logger("dev"));

app.get("/movies", (req, res) => {
   
    res.status(200).json(movies);
});
app.post("/movies", (req, res) => {
    movies.push(req.body);
    res.status(200).json(movies);
   
});
app.put("/movies/:id",(req,res)=>{
    const id =parseInt(req.params.id);
   let movie =movies.find(m => m.id === id);
   (movie.title = req.body.title),(movie.release =req.body.release);
   res.status(200).json(movies);
});
app.delete("/movies", (req, res) => {
    const id = parseInt(req.body.id);
    const deletedMovie = data.find(movie => movie.id === id);
        res.status(200).json({"movie deleted": deletedMovie});
});


app.listen(port, () => 
    console.log(`Express listening at http://localhost:${port}`)
);