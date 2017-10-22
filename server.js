const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = 'Time: ' + now + ' '+ req.method + ' ' + req.url;
  console.log(log);
  fs.appendFile('Server.log', log+ '\n', (err) => {
    if(err) {
      console.log('unable to append server log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');

  res.render('home.hbs',{
    pageTitle: 'Home Page',
    name: ' Pedro',
    likes: [
      'Ultimate Frisbee',
      'TRaveling'
    ]
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request'
  });
});

app.listen(port, () => {
  console.log('serveer is up on http://localhost:%s', port);
});
