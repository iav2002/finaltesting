function setupTodo() {
    // Get the form, input, and todo-lane elements
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const todoLane = document.getElementById("todo-lane");

    // Add a submit event listener to the form element
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = input.value;

        // If the input is empty, don't create a new task
        if (!value) return;

        // Create a new task element and set its properties
        const newTask = document.createElement("p");
        newTask.classList.add("task");
        newTask.setAttribute("draggable", "true");
        newTask.innerText = value;
        saveTasks();
        
        // Add dragstart and dragend event listeners to the new task element
        newTask.addEventListener("dragstart", () => {
            newTask.classList.add("is-dragging");
        });

        newTask.addEventListener("dragend", () => {
            newTask.classList.remove("is-dragging");
            saveTasks();
        });

        // Append the new task element to the todo-lane
        todoLane.appendChild(newTask);
        saveTasks();
        // Clear the input value
        input.value = "";
    });
    
}

setupTodo();

function saveTasks(){
    let todolane = document.getElementById("todo-lane").innerHTML;
    let wiplane = document.getElementById("wip-lane").innerHTML;
    let donelane = document.getElementById("done-lane").innerHTML;

    window.localStorage.setItem("todo-lane", todolane);
    window.localStorage.setItem("wip-lane", wiplane);
    window.localStorage.setItem("done-lane", donelane);
}