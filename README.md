# To-Do Application

A secure and feature-rich task management application built with Node.js, featuring user authentication and comprehensive task management capabilities.

## 🌟 Features

- **User Authentication System**
  - Secure user registration
  - Login functionality
  - Protected routes and sessions

- **Task Management**
  - Create tasks with detailed information (name, description, priority)
  - Delete tasks when no longer needed
  - Mark tasks as completed with checkbox functionality
  - Priority levels: Low, Medium, High
  - Visual strike-through for completed tasks

## 🛠️ Technologies Used

- **Backend**: Node.js
- **Framework**: Express.js
- **Architecture**: Service Layer pattern

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 12 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)

## 🚀 Installation & Setup

1. **Download the project**
   - Download the ZIP file
   - Extract it to your desired location

2. **Open in VS Code**
   ```bash
   cd path/to/extracted/folder
   code .
   ```

3. **Install Dependencies**
   ```bash
   npm install express
   ```
   Or install all dependencies if package.json exists:
   ```bash
   npm install
   ```

4. **Navigate to ServiceLayer**
   ```bash
   cd ServiceLayer
   ```

5. **Start the Server**
   ```bash
   node index.js
   ```

6. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000` (or the port specified in your configuration)

## 📁 Project Structure

```
├── BusinessLayer/
│   ├── guiManager.js
│   ├── securityManager.js
│   ├── todo.js         
│   └── todoManager.js
├── DaoLayer/        
│   └── dao.js
├── DataLayer/
│   ├── authorizedUsers.js
│   ├── db.js         
│   └── users.js
├── PresentationLayer/
│   ├── aboutPage.html
│   ├── authenticationPage.html
│   ├── homePage.html
│   ├── mainPage.html        
│   └── registrationPage.html
├── ServiceLayer/
│   └── index.js               
├── package-lock.json                      
├── package.json 
└── README.md
```

## 🎯 Usage

1. **Register an Account**
   - Create a new account with your credentials
   
2. **Login**
   - Access your personalized task dashboard

3. **Manage Tasks**
   - Click "Add Task" to create a new task
   - Fill in the task name, description, and select priority level
   - Check the checkbox to mark tasks as complete
   - Delete tasks you no longer need

## 🔒 Security

This application implements a secure authentication system to protect user data and ensure that users can only access their own tasks.

## 👤 Author

Your Name
- GitHub: [@ZainabElbouyed](https://github.com/ZainabElbouyed)
