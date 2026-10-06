import ProjectManager from './projectManager.js';
import Project from './project.js';
import Todo from './todo.js';

export default (() => {
    function setLocalStorage(projects) {
        localStorage.setItem('projects', JSON.stringify(ProjectManager.getProjects()));
    }

    function loadLocalStorage() {
        const projects = JSON.parse(localStorage.getItem('projects'));

        ProjectManager.setProjects(projects.map(projectData => {
            const project = new Project(projectData.title)
            project.id = projectData.id;

            project.todos = projectData.todos.map(todoData => {
                const todo = new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
                todo.id = todoData.id;
                todo.completed = todoData.completed;

                return todo;
            });
            return project;
        }));
    }

    return {
        setLocalStorage,
        loadLocalStorage,
    }
})();