const express = require('express');
const hbs  = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3010;
var app = express();


app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.use((req,res,next) => {
  var now = new Date().toString();
var log = `${now} ${req.method} ${req.url}`;
fs.appendFile('server.log', log + '\n' , (err) => {
  console.log('Unable to open the file');
});
next();
});

//app.use((req, res, next) => {
  //res.render('maintanace.hbs');
//});


hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
//  res.send('Hello Express');
res.render('about.hbs', {
  aboutPage: 'About page!',
  welcomeMsg:'You at my page !!!'
})
});


app.get('/', (req, res) => {
//  res.send('Hello Express');
res.render('home.hbs', {
  aboutPage: 'Home page !',
  welcomeMsg:'You are welcome !!!'
})
});


app.get('/project', (req, res) => {
//  res.send('Hello Express');
res.render('project.hbs', {
  aboutPage: 'Project page !',
  welcomeMsg:'Lets build together !!!'
})
});

app.get('/bad', (req, res) => {
//  res.send('Hello Express');
res.send({
  errorMessage: 'Bad request'
});
});
app.listen(port);
