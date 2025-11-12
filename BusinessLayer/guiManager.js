const fs         = require('fs');

function renderHomePage() {
  return fs.readFileSync("../PresentationLayer/homePage.html");
}//end renderHomePage()

function renderAuthenticationPage() {
  return fs.readFileSync("../PresentationLayer/authenticationPage.html");
}//end renderAuthenticationPage()

function renderMainPage() {
  return fs.readFileSync("../PresentationLayer/mainPage.html");
}//end renderMainPage()

function renderAboutPage() {
  return fs.readFileSync("../PresentationLayer/aboutPage.html");
}//end renderAboutPage()

// guiManager.js (ou ton fichier actuel)
function renderRegistrationPage(message = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>User Registration — To-Do List App</title>
  <style>
    body { 
      background: linear-gradient(135deg, #a8edea, #fed6e3); 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      color: #222; margin: 0; padding: 0; display: flex; flex-direction: column; 
      align-items: center; justify-content: center; min-height: 100vh; animation: fadeIn 1.2s ease-in; 
    }
    header { background-color: #222; color: white; width: 100%; text-align: center; padding: 25px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.3); animation: slideDown 1s ease-out; }
    header h1 { margin:0; font-size:2.4em; text-transform:uppercase; }
    form { background: rgba(255,255,255,0.9); border-radius:16px; box-shadow:0 8px 20px rgba(0,0,0,0.25); padding:40px; margin-top:40px; text-align:center; width:80%; max-width:400px; animation: fadeUp 1.2s ease-in-out; }
    label { display:block; text-align:left; font-weight:bold; margin-top:15px; color:#333; }
    input[type="text"], input[type="password"] { width:100%; padding:10px; margin-top:6px; border:1px solid #ccc; border-radius:6px; font-size:15px; transition:0.3s; }
    input:focus { border-color:#00a76f; box-shadow:0 0 6px rgba(0,167,111,0.4); outline:none; }
    .button { background: linear-gradient(90deg, #007b5e, #00a76f); border:none; color:white; padding:12px 32px; font-size:16px; margin:20px 10px 0 10px; border-radius:8px; transition:all 0.3s ease; display:inline-block; box-shadow:0 6px 10px rgba(0,0,0,0.2); cursor:pointer; }
    .button:hover { background: linear-gradient(90deg, #00a76f, #00c88a); transform:translateY(-3px) scale(1.05); box-shadow:0 10px 16px rgba(0,0,0,0.3); }
    .error-message { background: #ff4d4f; color: white; padding: 10px 15px; border-radius: 6px; margin-bottom: 15px; }
    @keyframes fadeIn { from {opacity:0;} to {opacity:1;} }
    @keyframes fadeUp { from {opacity:0; transform: translateY(40px);} to {opacity:1; transform: translateY(0);} }
    @keyframes slideDown { from {transform:translateY(-50px);opacity:0;} to {transform:translateY(0);opacity:1;} }
  </style>
</head>
<body>
  <header>
    <h1>User Registration</h1>
  </header>

  <form method="post" action="/userRegister">
    ${message ? `<div class="error-message">${message}</div>` : ''}
    <label for="username">Username:</label>
    <input type="text" placeholder="Enter your username" name="username" required>

    <label for="password">Password:</label>
    <input type="password" placeholder="Enter your password" name="password" required>

    <br>
    <button class="button" type="submit">Register</button>
    <a href="/userCancel" class="button">Cancel</a>
  </form>
</body>
</html>
  `;
}

// ----- RENDER TODO LIST -----
function renderTodoList(todoList) {
  // Helper : calcule la charge totale
  function getLoad(todo) {
    if (!todo) return 0;
    if (typeof todo.getTaskLoad === 'function') return todo.getTaskLoad();

    let total = todo.load || 0;
    if (Array.isArray(todo.subtasks)) {
      todo.subtasks.forEach(st => {
        total += (typeof st.getTaskLoad === 'function') ? st.getTaskLoad() : (st.load || 0);
      });
    }
    return total;
  }

  let responseHtml = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SUD312 - Todo list</title>
    <style>
      body {
        background-color: #f5f5f5;
        font-family: Arial, Helvetica, sans-serif;
        color: #111;
        padding: 20px;
      }
      h2, h3 {
        color: #222;
      }
      .todo {
        background: #fff;
        padding: 14px;
        border-radius: 8px;
        margin: 10px 0;
        box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .todo-details {
        display: flex;
        flex-direction: column; /* pour garder nom, type, description, load empilés */
      }

      .todo-right {
        display: flex;
        align-items: center;
        gap: 10px; /* espace entre checkbox et priorité */
      }

      .todo.completed {
        text-decoration: line-through;
        opacity: 0.6;
      }
      .meta {
        font-size: 13px;
        color: #555;
      }
      .priority {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 12px;
        color: #fff;
      }
      .priority.Low { background-color: #3b82f6; }
      .priority.Medium { background-color: #facc15; color: #111; }
      .priority.High { background-color: #ef4444; }
      .controls {
        margin-top: 20px;
      }
      .button {
        background: linear-gradient(90deg, #007b5e, #00a76f);
        border: none;
        color: white;
        padding: 12px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin: 10px 5px;
        border-radius: 8px;
        transition: all 0.3s ease;
        display: inline-block;
        box-shadow: 0 6px 10px rgba(0,0,0,0.2);
        cursor: pointer;
      }

      .button:hover {
        background: linear-gradient(90deg, #00a76f, #00c88a);
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 10px 16px rgba(0,0,0,0.3);
      }

      form { display: inline-block; }
    </style>
  </head>
  <body>
    <main>
      <h3>Your Todo list</h3>
      <div id="todos">
  `;

  // ----- GENERATE TODOS -----
  if (!todoList || todoList.length === 0) {
    responseHtml += '<p>No todos yet.</p>';
  } else {
    todoList.forEach((todo, index) => {
      const name = todo.name || '';
      const type = todo.type || '';
      const description = todo.description || '';
      const priority = todo.priority || 'Medium';
      const load = getLoad(todo);
      const completed = todo.completed ? 'completed' : '';

      responseHtml += `
        <div class="todo ${completed}">
          <div class="todo-details">
            <strong>${name}</strong>
            <span style="color:#555">(${type})</span>
            <div class="meta">${load}h</div>
            <div class="meta">${description}</div>
          </div>
          <div class="todo-right">
            <form method="post" action="/toggleTodo">
              <input type="hidden" name="id" value="${index}">
              <input type="checkbox" onchange="this.form.submit()" ${todo.completed ? 'checked' : ''}>
            </form>
            <form method="post" action="/deleteTodo" style="display:inline; margin-left:12px">
              <input type="hidden" name="id" value="${index}">
              <button type="submit" title="Delete" style="background:none;border:none;color:#d11;cursor:pointer;font-size:16px">&#128465;</button>
           </form>
            <span class="priority ${priority}">${priority}</span>
          </div>
        </div>`;
    });
  }

  // ----- FOOTER CONTROLS -----
  responseHtml += `
      </div>
      <div class="controls">
        <form method="post">
          <button class="button" type="submit" formaction="/addTodo">Add todo</button>
        </form>
        <form method="post">
          <button class="button" type="submit" formaction="/todoList">Refresh list</button>
        </form>
        <form method="post">
          <button class="button" type="submit" formaction="/userLogout">Logout</button>
        </form>
      </div>
    </main>
  </body>
  </html>`;

  return responseHtml;
}

module.exports = {renderHomePage, renderAuthenticationPage, renderMainPage, renderAboutPage, 
                  renderRegistrationPage, renderTodoList};