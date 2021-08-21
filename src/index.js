import UI from "./modules/UI/UI";
import Project from "./modules/utils/Project";
import TodoList from "./modules/utils/TodoList";

// const tomorrowProject = Project("Tomorrow");

// const projects = TodoList.getProjects();
// const tomorrowTasks = projects.map(project => project.getTomorrowsTasks()).flat();

// console.log(TodoList.getProject("Cosas").getTomorrowsTasks());

// tomorrowTasks.forEach(task => {
//     return tomorrowProject.addTask(task);
// });

// const inbox = Project("Inbox");
// TodoList.addProject(inbox);
// TodoList.addProject(tomorrowProject);

TodoList.getProjectsFromStorage();
console.log(TodoList.getProjects());

UI.loadHomePage();
UI.loadHeader();