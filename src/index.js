import './styles.css';
import Todo from './todo.js';
import Project from './project.js';
import ProjectManger from './projectManager.js';
import Dom from './dom.js';
import { formMode, todoId } from './dom.js';
import Storage from './localStorage.js';

if (localStorage.getItem('projects')) {
    Storage.loadLocalStorage();
    Dom.updateSidebar();
}

const addProjectButton = document.querySelector('#add-project');
const projectDialog = document.querySelector('#project-dialog');

addProjectButton.addEventListener('click', () => {
    projectDialog.showModal();
})

const projectForm = document.querySelector('#project-form');

projectForm.addEventListener('submit', event => {
    event.preventDefault();

    const title = projectForm.title.value;
    ProjectManger.addProject(title);

    Dom.updateSidebar();
    projectDialog.close();
    projectForm.title.value = '';
    Dom.displayProject();
})

const todoForm = document.querySelector('#todo-form');
const todoDialog = document.querySelector('#todo-dialog');

todoForm.addEventListener('submit', e => {
    e.preventDefault();

    const currentProject = ProjectManger.getCurrentProject();

    const title = todoForm.todoTitle.value;
    const description = todoForm.description.value;
    const dueDate = todoForm.dueDate.value;
    const priority = todoForm.priority.value;

    if (formMode === 'add') {
        currentProject.addTodo(title, description, dueDate, priority)
    } else if (formMode === 'edit') {
        currentProject.editTodo(todoId, title, description, dueDate, priority)
    }
    
    Dom.displayProject();
    todoDialog.close();
    todoForm.todoTitle.value = '';
    todoForm.description.value = '';
    todoForm.dueDate.value = '';
    todoForm.priority.value = '';
});