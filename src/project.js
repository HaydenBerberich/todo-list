import Todo from './todo.js';
import Storage from './localStorage.js';

export default class Project {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.todos = [];
    }

    addTodo(title, description, dueDate, priority) {
        const todo = new Todo(title, description, dueDate, priority)
        this.todos.push(todo);
        Storage.setLocalStorage();
    }

    editTodo(id, title, description, dueDate, priority) {
        const todo = this.todos.find(todo => todo.id === id);

        todo.editTodo(title, description, dueDate, priority)
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        Storage.setLocalStorage();
    }
}