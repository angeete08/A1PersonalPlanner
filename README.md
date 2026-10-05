Name: Atharva Geete
UMID: 2795 8155 

Planner Description: My personal planner allows for the addition of tasks that have a status of either pending, active or completed. Task status can be changed on the app as they are completed. Each task has a name (string), description (string), created at date (string), due at date (string), and status (enum). The user can set the task name, description and due date upon task creation and the rest are automatically assigned. Each task also has a unique task id stored internally by the app which is used to modify items from the CLI

Instructions for running different forms of the app are below: 

Web App:

    jac run

Mobile App:

    jac run --dev --platform web mobile

CLI:

    Generates list of all tasks: jac run cli -- list

    Toggles status of task from open (active) to completed: jac run cli -- toggle TASK_ID
    Note that TASK_ID looks something like this 8a31c42f and can be found in the task list. To toggle a task, use this command with the TASK_ID of the task you want to toggle

    Add a new task example: 
    jac run cli -- add "Submit project" --due 2026-10-10 --description "Finish the report"

All four components of this app fit togther such that the server sets up the data needed for tasks and manages this data. All other three components provide the ability for users to add, update, and set tasks to completed or reopen them. The interface is intuitive and the simple structure of the app means users can add and keep track of tasks easily. The number at the top of the user interface also makes it easy for users to see the number of open tasks without having to scroll through the list.
