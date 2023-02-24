const express = require('express');
const app = express();
const path = require('path');

const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
};
const myLogger2 = (req, res, next) => {
  console.log('Middleware Log 2');
  next();
};

app.use(express.static('public'));
app.use(myLogger);
app.use(myLogger2);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
