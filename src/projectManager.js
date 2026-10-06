import Project from './project.js';
import Storage from './localStorage.js';

export default (() => {
    let projects = [];
    let currentProject;

    function setProjects(newProjects) {
        projects = newProjects;
    }

    function addProject(title) {
        const project = new Project(title);
        currentProject = project;
        projects.push(project);
        Storage.setLocalStorage();
    }

    function getCurrentProject() {
        return currentProject;
    }

    function setCurrentProject(project) {
        currentProject = project;
    }

    function removeProject(id) {
        projects = projects.filter(project => project.id !== id);
        Storage.setLocalStorage();
    }

    function getProjects() {
        return projects;
    }

    return {
        addProject,
        removeProject,
        getCurrentProject,
        setCurrentProject,
        getProjects,
        setProjects,
    }
})();