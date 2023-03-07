const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var methodOverride = require('method-override');

const pageController = require('./controllers/pageController');
const photoController = require('./controllers/photoController');

const path = require('path');
const ejs = require('ejs');

const app = express();

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

// Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public')),
  app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Routes
app.get('/', photoController.getAllPhotos);

app.get('/photos/:id', photoController.getPhoto);

app.get('/about', pageController.getAbout);

app.get('/add', pageController.getAdd);

app.post('/photos', photoController.createPhoto);

app.get('/photos/edit/:id', pageController.getEdit);

app.put('/photos/:id', photoController.updatePhoto);

app.delete('/photos/:id', photoController.deletePhoto);

const port = 3001;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
