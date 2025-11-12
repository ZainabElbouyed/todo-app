const express          = require("express");
const bodyParser       = require("body-parser");
const session          = require('express-session');
const passport         = require('passport');
const todoManager      = require('../BusinessLayer/todoManager');
const guiManager       = require('../BusinessLayer/guiManager');
const securityManager  = require('../BusinessLayer/securityManager');
const dao              = require("../DaoLayer/dao");
const { users } = require('../DataLayer/users');

var app    = express();


app.listen(3000,function(){
  console.log("Server is running on http://localhost:3000");
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

securityManager.initializePassport(passport);

app.get('/', (req, res) => {
  res.end(guiManager.renderHomePage());
});

app.get('/userLogin', (req, res) => {
  res.end(guiManager.renderAuthenticationPage());
});

app.post('/userLogin',
  passport.authenticate('local', { failureRedirect: '/userLogin', successRedirect: '/loginSuccess', failureFlash: false }),
);

app.post('/userLogout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.post('/userAbout', (req, res) => {
  res.end(guiManager.renderAboutPage());
});

app.get('/userRegister', (req, res) => res.end(guiManager.renderRegistrationPage()));

app.post('/userRegister', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    // on reste sur la même page avec le message d'erreur
    return res.end(guiManager.renderRegistrationPage("Please provide both username and password."));
  }

  if (users.find(u => u.username === username)) {
    return res.end(guiManager.renderRegistrationPage("Username already exists."));
  }

  users.push({ id: users.length + 1, username, password, role: 'user' });
  res.redirect('/userLogin');
});

app.get('/userCancel', (req, res) => {
  res.redirect('/');
});

app.post('/userCancel', function(req,res){
  res.end(guiManager.renderHomePage());
});


app.get('/loginSuccess', (req, res) => {
  req.isAuthenticated() ? res.end(guiManager.renderMainPage())       
                        : res.end(guiManager.renderHomePage());
});

// Toggle a todo (checkbox)
app.post("/toggleTodo", (req, res) => {
  if (req.body && typeof req.body.id !== "undefined") {
    const id = parseInt(req.body.id, 10);
    if (!isNaN(id)) dao.toggleTodo(id);
  }
  res.end(guiManager.renderTodoList(todoManager.getAllTodos()));
});

// Delete a todo (trash button)
app.post('/deleteTodo', (req, res) => {
  if (req.body && typeof req.body.id !== 'undefined') {
    const id = parseInt(req.body.id, 10);
    if (!isNaN(id)) dao.deleteTodoById(id);
  }
  res.end(guiManager.renderTodoList(todoManager.getAllTodos()));
});

app.post('/addTodo', function(req,res){
  // If the form provided a name, create a todo from the form fields and stay on the same page.
  if (req.body && req.body.name && req.body.name.trim().length > 0) {
    const name = req.body.name.trim();
    const description = req.body.description || '';
    const priority = req.body.priority || 'Medium';
    todoManager.createTodoFromForm(name, description, priority);
  } else {
    // Fallback to original random creation when no explicit name provided
    todoManager.addTodo();
  }
  res.end(guiManager.renderMainPage());
});

app.post('/todoList', function(req,res){
  res.end(guiManager.renderTodoList(todoManager.getAllTodos()));
});






