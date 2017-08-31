const models = require("./models");
const sequelize = require('sequelize');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({
  extended: false
}));

// renders an index page
app.get('/', function(req, res) {
  res.render('index');

});

// FIND ALL
app.get('/users', function(req, res) {
  models.User.findAll()
    .then(function(users) {
      res.render('users', {
        users: users
      });
    })
})

// form to add a user
app.get('/add', function(req, res) {
  res.render('add');
});

app.get('/update/:id', function(req, res) {
  models.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(users) {
      res.render('update', {users: users});
    })
});

// CREATE
app.post('/newuser', function(req, res) {

  const newUser = models.User.build({
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio
  });

  newUser.save().then(function() {
    res.redirect('users');
  })
});

//UPDATE
app.post('/update/:id', function(req, res) {

  models.User.update({
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio
  }, {
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect("/users");
  })
});



// DELETE
app.post('/delete/:idOfUserButton', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.idOfUserButton
    }
  }).then(function(users) {

    res.redirect("/users");
  })
});




app.listen(3000, function() {
  console.log('Successfully started express application!');
})

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

  // give it a second
  setTimeout(function() {
    console.log('process exit');
    process.exit(0);
  }, 1000)
});
