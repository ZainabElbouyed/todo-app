class TodoTask {
  constructor(name) {
    this.name = name;
    this.type = undefined;
    this.load = Math.floor(Math.random() * 101);
    this.subtasks = [];
    this.description = '';
    this.priority = 'Medium';
  }

  getTaskName() {
    return this.name;
  }

  setTaskName(name) {
    this.name = name;
  }

  getTaskType() {
    return this.type;
  }

  setTaskType(type) {
    this.type = type;
  }

  getTaskLoad() {
    let totalLoad = this.load;
    this.subtasks.forEach(st => {
      totalLoad += st.getTaskLoad();
    });
    return totalLoad;
  }

  setTaskLoad(load) {
    this.load = load;
  }

  getSubtasks() {
    return this.subtasks;
  }

  getDescription() {
    return this.description;
  }

  setDescription(desc) {
    this.description = desc;
  }

  getPriority() {
    return this.priority;
  }

  setPriority(p) {
    this.priority = p;
  }

  isEngineeringTask() {
    return false;
  }

  isManagerialTask() {
    return false;
  }

  isAdministrativeTask() {
    return false;
  }
}

// ----------------- ENGINEERING -----------------
class EngineeringTodoTask extends TodoTask {
  constructor(name) {
    super(name);
    this.setTaskType("Engineering");
  }

  isEngineeringTask() {
    return true;
  }
}

// ----------------- MANAGERIAL -----------------
class ManagerialTodoTask extends TodoTask {
  constructor(name) {
    super(name);
    this.setTaskType("Managerial");
  }

  isManagerialTask() {
    return true;
  }
}

// ----------------- ADMINISTRATIVE -----------------
class AdministrativeTodoTask extends TodoTask {
  constructor(name) {
    super(name);
    this.setTaskType("Administrative");
  }

  isAdministrativeTask() {
    return true;
  }
}

// ----------------- FACTORY METHOD -----------------
class TodoFactoryMethod {
  static createTodoTask(todoType, todoName) {
    if (todoType < 3) {
      const newTask = new EngineeringTodoTask(todoName);
      newTask.getSubtasks().push(new EngineeringTodoTask(todoName + "1"));
      newTask.getSubtasks().push(new EngineeringTodoTask(todoName + "2"));
      newTask.getSubtasks().push(new EngineeringTodoTask(todoName + "3"));
      return newTask;
    }

    if (todoType < 4) {
      return new EngineeringTodoTask(todoName);
    }

    if (todoType < 6) {
      const newTask = new ManagerialTodoTask(todoName);
      newTask.getSubtasks().push(new ManagerialTodoTask(todoName + "1"));
      newTask.getSubtasks().push(new ManagerialTodoTask(todoName + "2"));
      newTask.getSubtasks().push(new ManagerialTodoTask(todoName + "3"));
      return newTask;
    }

    if (todoType < 7) {
      return new ManagerialTodoTask(todoName);
    }

    if (todoType < 8) {
      const newTask = new AdministrativeTodoTask(todoName);
      newTask.getSubtasks().push(new AdministrativeTodoTask(todoName + "1"));
      newTask.getSubtasks().push(new AdministrativeTodoTask(todoName + "2"));
      newTask.getSubtasks().push(new AdministrativeTodoTask(todoName + "3"));
      return newTask;
    }

    if (todoType < 11) {
      return new AdministrativeTodoTask(todoName);
    }

    // Default case: if no condition matched
    return new TodoTask(todoName);
  }
}

module.exports = { TodoFactoryMethod };