import Project from "../utils/Project";
import Task from "../utils/Task";
import TodoList from "../utils/TodoList";

const UI = (function () {

    // corregir el tema del scope de la variable "tasksContainer";
    // Debería ser una variable universal (dentro del módulo)para no tener que redefinirla en cada función, 
    // pero a la vez la tengo que usar en la funcion loadHomePage();

    let currentProject;

    const tasksContainer = document.createElement('div');
    tasksContainer.id = "tasks-container";

    const header = document.createElement('header');

    const loadHomePage = () => {
        document.body.appendChild(header);
        document.body.appendChild(tasksContainer);
    }

    const revealTaskDetails = (info) => {
        if (info.style.display === "none") {
            info.style.display = "grid";
        } else {
            info.style.display = "none";
        }
    }

    const handleTaskButtons = (e) => {
        if (e.target.className == "task-div") {
            const info = e.path[1].children[1];
            revealTaskDetails(info);
        } else if (e.target.parentNode.className === "task-div") {
            const task = currentProject.getTask(e.path[1].innerText);
            if (e.target.className === "fas fa-pen edit-task-button") {
                loadTaskForm(task);
            } else {
                currentProject.deleteTask(task);
                TodoList.saveProjects();
                loadTasks();
            }
        } else {
            return;
        }
    }

    const loadTasks = () => {
        tasksContainer.innerHTML = "";
        const tasks = currentProject.getTasks();

        tasks.forEach(task => {
            const taskContainer = document.createElement('div');
            taskContainer.className = "task-container";

            taskContainer.innerHTML = `<div class="task-div"><input type="checkbox">${task.getTitle()}<i class="fas fa-pen edit-task-button"></i></div>`;

            const taskDiv = taskContainer.children[0];
            taskDiv.addEventListener('click', handleTaskButtons);

            const info = document.createElement('div');
            info.className = "info";

            const taskInfo = {
                title: task.getTitle(),
                description: task.getDescription(),
                dueDate: task.getDueDate(),
                priority: task.getPriority()
            }

            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `<span>Title: </span>${taskInfo.title}`;

            const descriptionDiv = document.createElement('div');
            descriptionDiv.innerHTML = `<span>Description: </span>${taskInfo.description}`;

            const dueDateDiv = document.createElement('div');
            dueDateDiv.innerHTML = `<span>Due Date: </span>${taskInfo.dueDate.getDate()}/${taskInfo.dueDate.getMonth() + 1}/${taskInfo.dueDate.getFullYear()}`;

            const priorityDiv = document.createElement('div');
            priorityDiv.innerHTML = `<span>Priority: </span>${taskInfo.priority}`;

            info.appendChild(titleDiv)
            info.appendChild(descriptionDiv)
            info.appendChild(dueDateDiv)
            info.appendChild(priorityDiv)

            taskContainer.appendChild(info)
            tasksContainer.appendChild(taskContainer);
        })

        const addTaskButton = document.createElement('button');
        addTaskButton.innerText = "Add Task +";
        addTaskButton.addEventListener('click', () => loadTaskForm())

        tasksContainer.appendChild(addTaskButton);
    }

    const handleClickOutsideForm = (form) => {
        window.addEventListener('mouseup', (e) => {
            if (e.target != form && e.target.parentNode != form) {
                form.remove();
            }
        })
    }

    const loadTaskForm = (task) => {
        console.log(currentProject.getName());
        const taskForm = document.createElement('form');
        const formHeading = document.createElement('h3');

        const titleLabel = document.createElement('label');
        titleLabel.innerText = "Title";
        const titleInput = document.createElement('input');

        const descriptionLabel = document.createElement('label');
        descriptionLabel.innerText = "Description";
        const descriptionInput = document.createElement('textarea');

        const dueDateLabel = document.createElement('label');
        dueDateLabel.innerText = "Due Date";
        const dueDateInput = document.createElement('input');
        dueDateInput.type = "date";

        const priorityLabel = document.createElement('label');
        priorityLabel.innerText = "Priority";
        const prioritySelect = document.createElement('select');

        const nonePriorityOption = document.createElement('option');
        nonePriorityOption.innerText = 'None';
        nonePriorityOption.value = 'none';

        const highPriorityOption = document.createElement('option');
        highPriorityOption.innerText = 'High';
        highPriorityOption.value = 'high';

        const mediumPriorityOption = document.createElement('option');
        mediumPriorityOption.innerText = 'Medium';
        mediumPriorityOption.value = 'medium';

        const lowPriorityOption = document.createElement('option');
        lowPriorityOption.innerText = 'Low';
        lowPriorityOption.value = 'low';


        if (task) {
            formHeading.innerText = "Edit Task";
            titleInput.value = task.getTitle();
            descriptionInput.value = task.getDescription();
            const taskDateObj = task.getDueDate();
            dueDateInput.valueAsDate = new Date(taskDateObj.getFullYear(), taskDateObj.getMonth(), taskDateObj.getDate());
            const optionsArr = [nonePriorityOption, highPriorityOption, mediumPriorityOption, lowPriorityOption];
            const option = optionsArr.find(option => option.value === task.getPriority().toLowerCase());
            option.selected = true;
        } else {
            formHeading.innerText = "New Task";
            nonePriorityOption.selected = true;
        }

        const submitButton = document.createElement('button');
        submitButton.innerText = "Add Task";
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (task) {
                task.setTitle(titleInput.value);
                task.setDescription(descriptionInput.value);
                task.setDueDate(new Date(dueDateInput.valueAsDate.toUTCString()));
                task.setPriority(prioritySelect.value);
            } else {
                const newTask = Task(titleInput.value, descriptionInput.value, new Date(dueDateInput.valueAsDate), prioritySelect.value)
                currentProject.addTask(newTask);
                console.log(currentProject.getTasks());
            }
            TodoList.saveProjects();
            loadTasks();
            taskForm.remove();
        })

        handleClickOutsideForm(taskForm);

        prioritySelect.appendChild(nonePriorityOption);
        prioritySelect.appendChild(highPriorityOption);
        prioritySelect.appendChild(mediumPriorityOption);
        prioritySelect.appendChild(lowPriorityOption);

        taskForm.appendChild(formHeading);
        taskForm.appendChild(titleLabel);
        taskForm.appendChild(titleInput);
        taskForm.appendChild(descriptionLabel);
        taskForm.appendChild(descriptionInput);

        taskForm.appendChild(dueDateLabel);
        taskForm.appendChild(dueDateInput);
        taskForm.appendChild(priorityLabel);
        taskForm.appendChild(prioritySelect);
        taskForm.appendChild(submitButton);

        tasksContainer.appendChild(taskForm);
    }

    const loadProjectForm = project => {
        console.log(project);
        const projectForm = document.createElement('form');
        const formHeading = document.createElement('h3');
        const nameInput = document.createElement('input');
        const submitButton = document.createElement('button');

        if (project) {
            formHeading.innerText = project.getName();
            submitButton.innerText = "Save";
            nameInput.value = project.getName();
        } else {
            formHeading.innerText = "New Project";
            submitButton.innerText = "Add";
        }

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (project) {
                project.setName(nameInput.value);
            } else {
                TodoList.addProject(Project(nameInput.value))
            }
            loadHeader();
            projectForm.remove();
        })

        handleClickOutsideForm(projectForm);

        projectForm.appendChild(formHeading);
        projectForm.appendChild(nameInput);
        projectForm.appendChild(submitButton);
        header.appendChild(projectForm);
    }

    const handleProjectButtons = (e) => {
        if (e.target.className !== "project-container") {
            const project = TodoList.getProject(e.path[1].innerText);
            if (e.target.className === "fas fa-trash-alt delete-project-button") {
                TodoList.deleteProject(project);
                TodoList.saveProjects();
                loadHeader();
            } else if (e.target.className === "fas fa-pen edit-project-button") {
                loadProjectForm(project);
            }
        } else {
            const project = TodoList.getProject(e.target.innerText);
            currentProject = TodoList.getProject(project.getName());
            if (tasksContainer.innerHTML === "") {
                return loadTasks(project.getName());
            } else {
                tasksContainer.innerHTML = "";
                return loadTasks(project.getName());
            }
        }
    }

    const loadProjects = () => {
        let projects = TodoList.getProjects();
        projects.forEach(project => {
            const projectContainer = document.createElement('div');

            projectContainer.innerText = project.getName();
            projectContainer.className = "project-container";

            projectContainer.addEventListener('click', handleProjectButtons)

            const editButton = document.createElement('i');
            editButton.className = "fas fa-pen edit-project-button";

            const deleteButton = document.createElement('i');
            deleteButton.className = "fas fa-trash-alt delete-project-button";

            projectContainer.appendChild(editButton);
            projectContainer.appendChild(deleteButton);
            header.appendChild(projectContainer);
        })
    }

    const loadHeader = () => {
        header.innerHTML = "";
        const addProjectButton = document.createElement('button');
        addProjectButton.innerText = "+ Add Project";
        addProjectButton.id = 'add-project';

        addProjectButton.addEventListener('click', () => loadProjectForm());
        loadProjects();
        header.appendChild(addProjectButton);
    }

    return { loadHomePage, loadHeader, loadTasks }
})()

export default UI;