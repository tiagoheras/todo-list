export default function Task(title, description, dueDate, priority) {

    const setTitle = newTitle => title = newTitle;
    const getTitle = () => title;

    const setDescription = newDescription => description = newDescription;
    const getDescription = () => description;

    const setDueDate = newDate => dueDate = newDate;
    const getDueDate = () => dueDate;

    const setPriority = newPriority => priority = newPriority;
    const getPriority = () => priority;

    return {getDescription, getDueDate, getPriority, getTitle, setTitle, setDescription, setDueDate, setPriority}
}