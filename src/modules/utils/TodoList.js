import Project from "./Project";
import Task from "./Task";

const TodoList = (function () {
    let projects = [];

    const getProjects = () => projects;

    const getProjectsFromStorage = () => {
        const projectsData = JSON.parse(localStorage.getItem("todoList"));
        console.log(projectsData);
        projectsData.forEach(project => {
            const newProject = Project(project.name);
            const tasksData = project.tasks;
            tasksData.forEach(task => {
                const newTask = Task(task.title, task.description, new Date(task.dueDate.year, task.dueDate.month, task.dueDate.day), task.priority);
                newProject.addTask(newTask)
            })
            return addProject(newProject);
        });
    }

    const saveProjects = () => {
        const formattedProjects = projects.map(project => {
            const formattedTasks = project.getTasks().map(task => {
                return {
                    title: task.getTitle(),
                    description: task.getDescription(),
                    dueDate: {
                        year: task.getDueDate().getFullYear(),
                        month: task.getDueDate().getMonth(),
                        day: task.getDueDate().getDate()
                    },
                    priority: task.getPriority()
                }
            })
            return {
                name: project.getName(),
                tasks: formattedTasks
            }
        })
        localStorage.setItem("todoList", JSON.stringify(formattedProjects))
    }

    const getProject = name => {
        return projects.find(project => {
            return project.getName() === name;
        })
    }

    const addProject = project => {
        const projectName = project.getName();
        const nameAlreadyExists = projects.some(project => project.getName() === projectName);
        if (nameAlreadyExists) {
            alert("A Project with the same name already exists, please try with a different name.")
        } else {
            projects.push(project);
        }
    };

    const deleteProject = project => {
        projects.splice(projects.indexOf(project), 1);
    }

    return { getProject, getProjects, addProject, deleteProject, saveProjects, getProjectsFromStorage };
})()

export default TodoList