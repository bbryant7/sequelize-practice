const models = require("./models");
//
// C of CRUD function
function createUser() {
  const user = models.User.build({
    name: 'Bailey Bryant',
    email: 'bailey.bryant10@gmail.com',
    bio: 'student'
  });

  user.save().then(function(newUser) {
    console.log(newUser.dataValues);
  })

}
// // Calls C function
// createUser();

// R of CRUD function
function listUsers() {
models.User.findAll().then(function (users) {
  users.forEach(function(user) {
    console.log(user.dataValues);
  })
})
}

listUsers();
