function setupDrag() {
    //Get all the task elements and all the swim-lane elements
    const draggables = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".swim-lane");

    //Add dragstsart and dragend event listener to each task element
    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            //Add the "is-dragging" class to the task being dragged
            task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", () => {
            //Remove the "is-dragging" class from the task when the dragging ends
            task.classList.remove("is-dragging");
            saveTasks();
        });
        task.addEventListener("keydown", (e) => {
            if (e.keyCode === 13) {
                task.remove();
                saveTasks();
            }
        });
        task.setAttribute("tabindex", 0);    
    });

    // Add dragover event listener to each swim-lane element
    droppables.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();

            // Get the task that should be inserted above the current task being dragged
            const bottomTask = insertAboveTask(zone, e.clientY);
            const curTask = document.querySelector(".is-dragging");

            // Insert the current task being dragged into the correct position
            if (!bottomTask) {
                zone.appendChild(curTask);
            } else {
                zone.insertBefore(curTask, bottomTask);
            }
        });
    });

    // Function to determine which task the dragged task should be inserted above
    const insertAboveTask = (zone, mouseY) => {
        const els = zone.querySelectorAll(".task:not(.is-dragging)");

        let closestTask = null;
        let closestOffset = Number.NEGATIVE_INFINITY;

        // Find the task with the closest negative offset to mouseY
        els.forEach((task) => {
            const { top } = task.getBoundingClientRect();

            const offset = mouseY - top;

            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closestTask = task;
            }
        });

        return closestTask;
    };
}

setupDrag();