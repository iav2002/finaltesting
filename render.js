const { ipcRenderer } = require('electron');


// Load the Kanban board
document.getElementById('kanban-board').addEventListener('click', loadKanbanBoard);


// Load the Pomodoro Timer
document.getElementById('pomodoro-timer').addEventListener('click', loadPomodoroTimer);


// Load the Pomodoro Timer
document.getElementById('pomodoro-timer').addEventListener('click', () => {
  ipcRenderer.send('navigate-to-pomodoro');
});


//function to load the kanban board to the main window
function loadKanbanBoard() {
  fetch('kanban.html')
    .then((response) => response.text())
    .then((html) => {
      //replace the content of the current window with the Kanban board html
      document.body.innerHTML = html;

      //Add the kanban board style to the current window
      if (!document.querySelector('script[src="kanban.css"]')) {
        const kanbanStyles = document.createElement('link');
        kanbanStyles.rel = 'stylesheet';
        kanbanStyles.href = 'kanban.css';
        document.head.appendChild(kanbanStyles);
      }  

      
      // Check if the kanban JavaScript files are already loaded before loading them
      if (!document.querySelector('script[src="drag.js"]')) {
        const dragScript = document.createElement('script');
        dragScript.src = 'drag.js';
        document.body.appendChild(dragScript);
      }

      if (!document.querySelector('script[src="todo.js"]')) {
        const todoScript = document.createElement('script');
        todoScript.src = 'todo.js';
        document.body.appendChild(todoScript);
      }

      loadTasks();

      document.getElementById('go-back').addEventListener('click', loadHomePage);


    })
    .catch((err) => {
      console.warn('Error loading KanbanBoard:', err);
    });
}

//function to load the Pomodoro Timer to the main window
function loadPomodoroTimer() {
  fetch('PomodoroTimer/npomodoro.html')
    .then((response) => response.text())
    .then((html) => {
      //replace the content of the current window with the Pomodoro Timer html
      document.body.innerHTML = html;

      //Add the Pomodoro style to the current window
      const pomodoroStyles = document.createElement('link');
      pomodoroStyles.rel = 'stylesheet';
      pomodoroStyles.href = 'PomodoroTimer/npomodoro.css';
      document.head.appendChild(pomodoroStyles);

      // Load the pomodoro JavaScript files
      const pomodoroScript = document.createElement('script');
      pomodoroScript.src = 'PomodoroTimer/npomodoro.js';
      document.body.appendChild(pomodoroScript);

      document.getElementById('go-back').addEventListener('click', loadHomePage);

    })
    .catch((err) => {
      console.warn('Error loading PomodoroTimer:', err);
    });
}

function loadHomePage() {
  fetch('index.html')
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML = html;
      const indexScript = document.createElement('script');
      indexScript.src = 'render.js';
      document.body.appendChild(indexScript);
    })
    .catch((err) => {
      console.warn('Error loading HomePage:', err);
    });
}

// Function to load tasks from localStorage
function loadTasks() {
  let todoLane = window.localStorage.getItem("todo-lane");
  let wipLane = window.localStorage.getItem("wip-lane");
  let doneLane = window.localStorage.getItem("done-lane");

  if(todoLane) {
      document.getElementById("todo-lane").innerHTML = todoLane;
  }
  if(wipLane) {
      document.getElementById("wip-lane").innerHTML = wipLane;
  }
  if(doneLane) {
      document.getElementById("done-lane").innerHTML = doneLane;
  }
  
}

document.addEventListener('DOMContentLoaded', loadTasks);
