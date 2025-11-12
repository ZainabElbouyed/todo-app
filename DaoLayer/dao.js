const {TodoSingleton}   = require('../DataLayer/db');
const {users}           = require('../DataLayer/users');
const {authorizedUsers} = require('../DataLayer/authorizedUsers');

function connectDB() {
  return TodoSingleton.getTodoInstance();
}

function disconnectDB() {
  return null;
}

function createTodo(todo) {
  var db = connectDB();
  db.addTodo(todo);
  db = disconnectDB();
}

function readTodo() {
  return ;
}
 
function readAllTodos() {
  var db = connectDB();
  const result = db.getTodos();
  db = disconnectDB();
  return result;
}

function updateTodo() {
  return ;
}

function deleteTodoById(id) {
  var db = connectDB();
  const todos = db.getTodos();
  // find by id property
  let index = todos.findIndex(t => t && t.id === id);
  // fallback: if not found and id is integer, treat as index
  if (index === -1 && Number.isInteger(id) && id >= 0 && id < todos.length) index = id;
  if (index !== -1) {
    todos.splice(index, 1);
  }
  db = disconnectDB();
}

function readTodoById(id) {
  var db = connectDB();
  const todos = db.getTodos();
  let result = todos.find(t => t.id === id);
  // fallback: if todos don't have an id property, allow numeric index
  if (!result && Number.isInteger(id) && id >= 0 && id < todos.length) result = todos[id];
  db = disconnectDB();
  return result;
}

function toggleTodo(id) {
  var db = connectDB();
  const todos = db.getTodos();
  let todo = todos.find(t => t.id === id);
  if (!todo && Number.isInteger(id) && id >= 0 && id < todos.length) todo = todos[id];
  if (todo) {
    // support both class instances and plain objects
    if (typeof todo.setCompleted === 'function') {
      todo.setCompleted(!todo.isCompleted());
    } else {
      todo.completed = !todo.completed;
    }
  }
  db = disconnectDB();
}

function updateTodoById(id, fields) {
  var db = connectDB();
  const todos = db.getTodos();
  let todo = todos.find(t => t.id === id);
  if (!todo && Number.isInteger(id) && id >= 0 && id < todos.length) todo = todos[id];
  if (todo) {
    Object.keys(fields).forEach(k => {
      if (k === 'completed') {
        if (typeof todo.setCompleted === 'function') todo.setCompleted(fields[k]);
        else todo.completed = fields[k];
      } else if (k === 'description') {
        if (typeof todo.setDescription === 'function') todo.setDescription(fields[k]);
        else todo.description = fields[k];
      } else {
        todo[k] = fields[k];
      }
    });
  }
  db = disconnectDB();
}

function findUser(username) {
  return users.find(user => user.username === username);
}

function findUserById(id) {
  return users.find(user => user.id === id);
}

function userHasRole(user) {
  if (authorizedUsers.includes(user.role))
     return true;
  return false;
}

module.exports = { createTodo, readTodo, readAllTodos, updateTodo, deleteTodoById, readTodoById, toggleTodo, updateTodoById, 
                   findUser, findUserById, userHasRole };