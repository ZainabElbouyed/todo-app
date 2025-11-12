const { TodoFactoryMethod } = require('../BusinessLayer/todo');
const dao = require('../DaoLayer/dao');

/**
 * @deprecated
 * Ancienne fonction qui créait un todo aléatoire.
 * Désormais, la création se fait uniquement via createTodoFromForm().
 */
function addTodo() {
  console.warn("⚠ La fonction addTodo() est dépréciée. Utilisez createTodoFromForm().");
  return null;
}

/**
 * Crée un Todo à partir des informations du formulaire
 * et l’ajoute à la base via le DAO.
 *
 * @param {string} name - Le nom de la tâche.
 * @param {string} description - La description de la tâche.
 * @param {string} priority - La priorité (Low, Medium, High).
 * @returns {object} Le nouvel objet Todo créé.
 */
function createTodoFromForm(name, description, priority) {
  const todoType = Math.floor(Math.random() * 11);
  const newTodo = TodoFactoryMethod.createTodoTask(
    todoType,
    name || 'todo task ${dao.readAllTodos()?.length || 0}'
  );

  newTodo.setDescription?.(description || '');
  newTodo.setPriority?.(priority || 'Medium');

  dao.createTodo(newTodo);
  return newTodo;
}

/**
 * Retourne un todo spécifique (à implémenter).
 */
function getTodo(id) {
  return dao.readTodo ? dao.readTodo(id) : null;
}

/**
 * Retourne la liste de tous les todos.
 */
function getAllTodos() {
  return dao.readAllTodos();
}

/**
 * Modifie un todo existant (à implémenter).
 */
function modifyTodo(id, updatedData) {
  return dao.updateTodo ? dao.updateTodo(id, updatedData) : null;
}

/**
 * Supprime un todo spécifique (à implémenter).
 */
function removeTodo(id) {
  return dao.deleteTodo ? dao.deleteTodo(id) : null;
}

/**
 * Supprime tous les todos (à implémenter).
 */
function removeAllTodos() {
  return dao.deleteAllTodos ? dao.deleteAllTodos() : null;
}

module.exports = {
  createTodoFromForm,
  addTodo, // conservée mais dépréciée
  getTodo,
  getAllTodos,
  modifyTodo,
  removeTodo,
  removeAllTodos
};