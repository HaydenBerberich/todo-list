import ProjectManager from './projectManager.js';
import Project from './project.js';
import trashSvg from './assets/trash.svg';
import editSvg from './assets/edit.svg';

export let formMode = '';
export let todoId;

export default (() => {
    function updateSidebar() {
        const projects = ProjectManager.getProjects();
        const projectContainer = document.querySelector('#projects');

        projectContainer.replaceChildren();

        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project-div');
            const projectButton = document.createElement('button');
            projectButton.classList.add('project');
            projectButton.textContent = project.title;
            projectButton.addEventListener('click', () => {
                ProjectManager.setCurrentProject(project);
                displayProject();
            })
            projectDiv.appendChild(projectButton);
            const trash = document.createElement('button');
            const trashIcon = document.createElement('img');
            trashIcon.src = trashSvg;
            trashIcon.alt = 'Trash';
            trash.dataset.id = project.id;

            trash.addEventListener('click', () => {
                const id = trash.dataset.id;
                ProjectManager.removeProject(id);
                updateSidebar();
            })

            trash.appendChild(trashIcon);
            trash.id = 'trash';
            projectDiv.appendChild(trash);

            projectContainer.appendChild(projectDiv);
        });
    }

    function displayProject() {
        const project = ProjectManager.getCurrentProject();
        const display = document.querySelector('#display');
        
        display.replaceChildren();

        const titleElement = document.createElement('h1');
        titleElement.textContent = project.title;
        display.appendChild(titleElement);

        const tasksHeader = document.createElement('h2');
        tasksHeader.textContent = 'Todos';

        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = '+';

        const todoDialog = document.querySelector('#todo-dialog')

        addTaskButton.addEventListener('click', () => {
            formMode = 'add';
            todoDialog.showModal();
        })

        const tasksHeaderDiv = document.createElement('div')
        tasksHeaderDiv.id = 'tasks-header';

        tasksHeaderDiv.append(tasksHeader, addTaskButton);

        display.appendChild(tasksHeaderDiv);

        const table = document.createElement('table');
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const complete = document.createElement('th');
        complete.textContent = 'Complete';
        const title = document.createElement('th');
        title.textContent = 'Title';
        const dueDate = document.createElement('th');
        dueDate.textContent = 'Due Date';
        const priority = document.createElement('th');
        priority.textContent = 'Priority';
        const description = document.createElement('th');
        description.textContent = 'Description';
        const edit = document.createElement('th');
        edit.textContent = 'Edit';
        const del = document.createElement('th');
        del.textContent = 'Delete';
        headerRow.append(complete, title, dueDate, priority, description, edit, del);
        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        const tableBody = document.createElement('tbody');

        project.todos.forEach(todo => {
            const complete = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => {
                todo.completed = checkbox.checked;
            })
            complete.appendChild(checkbox);

            const title = document.createElement('td');
            title.textContent = todo.title;
            
            const dueDate = document.createElement('td');
            dueDate.textContent = todo.dueDate;

            const priority = document.createElement('td');
            priority.textContent = todo.priority;

            const description = document.createElement('td');
            description.textContent = todo.description;

            const edit = document.createElement('td');
            const editButton = document.createElement('button');

            editButton.addEventListener('click', () => {
                const todoForm = document.querySelector('#todo-form');
                const todoDialog = document.querySelector('#todo-dialog');

                formMode = 'edit';
                todoId = todo.id;

                todoForm.todoTitle.value = todo.title;
                todoForm.description.value = todo.description;
                todoForm.dueDate.value = todo.dueDate;
                todoForm.priority.value = todo.priority;

                todoDialog.showModal();
            })

            const editImg = document.createElement('img');
            editImg.src = editSvg;
            editButton.appendChild(editImg);
            edit.appendChild(editButton);

            const del = document.createElement('td');
            const delButton = document.createElement('button');
            delButton.dataset.id = todo.id;

            delButton.addEventListener('click', () => {
                project.removeTodo(delButton.dataset.id);
                displayProject();
            })

            const delImg = document.createElement('img');
            delImg.src = trashSvg;
            delButton.appendChild(delImg);
            del.appendChild(delButton);

            const row = document.createElement('tr');
            row.append(complete, title, dueDate, priority, description, edit, del)

            tableBody.append(row);
        })

        table.append(tableBody);

        if (project.todos.length > 0) {
            display.appendChild(table);
        }
    }

    return {
        updateSidebar,
        displayProject,
    }
})();