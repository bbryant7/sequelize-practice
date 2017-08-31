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

// hrefs are gets
// forms are posts
// uses a link to get all of the users on a different page
// FINDS all users
app.get('/users', function(req, res) {
  models.User.findAll()
  .then(function(users){
    res.render('users', {users: users});
  })
})

// form to add a user
app.get('/add', function(req, res) {
    res.render('add');
  });

// create new here
app.post('/newuser', function (req, res){

  const newUser = models.User.build({
  name: req.body.name,
  email: req.body.email,
  bio: req.body.bio
});

newUser.save().then(function () {
  res.redirect('users');
  })
});


// steps for delete:
// create delete button on mustache page, form needs to be post
// need to pass ID of user when we post, so id of button is unique
// create post route that deletes user and shows list of users
// can name user button anything, gets passed from the {{id}} in the form, it is a number
// app.post('/delete/:idOfUserButton', function (req, res){
//   models.User.findById(req.params.idOfUserButton).then(function (users) {
//              User.destroy().then(function () {
//                  res.redirect("/users");
//              })
//      })
//
// });


app.post('/delete/:idOfUserButton', function (req, res){
  models.User.destroy({where: {id: req.params.idOfUserButton}}).then(function (users) {
            
                 res.redirect("/users");
             })
     })

});


// newUser.save()
// .then(function (newUser) {
//   return models.User.findAll()
// })
// .then(function(users){
//   res.render('users', {users: users});
//
//   })

// user data is the returned array, namming convention matches the paramater in the promise function
// app.get('matches route put in href or forms', function(req, res) {
//   models.User.find()
//   .then(function(user data){
//     res.render('mustache file', {mustache key name: user data});
//   })
// })


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
