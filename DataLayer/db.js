class TodoSingleton {
  static todoInstance = null;
  constructor() {
    this.todos = [];
    // original simple singleton: no automatic id generation
  }
 
  static getTodoInstance() {
       if (!TodoSingleton.todoInstance) {
          TodoSingleton.todoInstance = new TodoSingleton();
       }
       return TodoSingleton.todoInstance;
     }
 
  addTodo(todo) {
    this.todos.push(todo);
  }
 
  getTodos() {
    return this.todos;
  }

}//End TodosSingleton Class

module.exports = {TodoSingleton};