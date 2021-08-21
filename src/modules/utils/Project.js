export default function Project(name) {
    let tasks = []
    const getName = () => name;
    const setName = newName => name = newName;

    const getTasks = () => tasks;

    const getTask = title => {
        return tasks.find(task => {
            return task.getTitle() === title;
        })
    }

    const addTask = task => {
        const taskTitle = task.getTitle();
        const titleAlreadyExists = tasks.some(task => task.getTitle() === taskTitle);
        if (titleAlreadyExists) {
            alert("A task with the same title already exists, please try with a different name.")
        } else {
            tasks.push(task);
        }
    }

    const isTomorrow = (date) => {
        const today = new Date();
        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() - 1 === today.getDate();
    }

    const getTomorrowsTasks = () => tasks.filter(task => isTomorrow(task.getDueDate()));

    const deleteTask = task => {
        tasks.splice(tasks.indexOf(task), 1);
    }

    return { getName, setName, getTask, getTasks, addTask, getTomorrowsTasks, deleteTask};
}