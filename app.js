const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");

// Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public')),
  //Aldığımız requesti sonlandırmamızı sağladı.
  app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}); //Takes photos from database
  res.render('index', {
    photos, //Photos taken from the database are sent to the homepage
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add')
})

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/'); // Sends it to the homepage
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
