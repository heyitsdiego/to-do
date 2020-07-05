/*
The model is the data. In this todo application, that'll be the actual todos, 
and the methods that will add, edit, or delete them.

The view is how the data is displayed. In this todo application, that will be 
the rendered HTML in the DOM and CSS.

The controller connects the model and the view. It takes user input, such as 
clicking or typing, and handles callbacks for user interactions.

The model never touches the view. The view never touches the model. 
The controller connects them.
 */

class Model {
  constructor() {
    this.projects = [
      {
        id: 0, 
        title: 'Test'
      }
    ]
    this.tasks = [
      {
        id: 0, 
        projectID: 0, 
        title: 'Test', 
        priority: 'Low', 
        notes: 'do this please'
      }
    ]
  }

  addProject(project) {
    const projectID = this.project.length
    const newProject = { id: projectID, title: project}
    this.projects.push(newProject)
  }

  addTask(title, project, dueDate, notes) {
    const taskID = this.tasks.length
    const newTask = { 
      id: taskID, 
      title: title,
      project: project,
      dueDate: dueDate,
      notes: notes,
    }
    this.projects.push(newTask)
  }

  deleteProject(id) {
    this.projects = this.projects.filter(project => project.id !== id)

    this._commit(this.todos)
  }
  
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id)

    this._commit(this.todos)
  }
}

/**
 *View
 *
 * Visual representation of the model.
 */
class View {
  constructor() {
    // Create header
    const header = this.createElement('header')
    // Create main to container projects and tasks
    const main = this.createElement('main')
    // Create container div for projects
    const projectsContainer = this.createElement('div', 'project-list-container')
    // Create container div for taks
    const tasksContainer = this.createElement('div', 'task-list-container')

    const container = this.getElement('#container')
  }
  // Create a new element
  createElement(tag, attribute) {
    const element = document.createElement(tag);
    if (attribute) {
      element.classList.add(attribute);
    }
    return element
  }
  // Get an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector)
    return element
  }
  // Display projects
  displayProjects(projects) {
    if (projects.length === 0) {
      const p = this.createElement('p')
      p.textContent = 'No Projects'
      this.projectsContainer.append(p)
    }
    else {
      projects.forEach(project => {
        const projectDiv = createElement('div', '.project-div')
        projectDiv.setAttribute('project-id', project.id)
        const span = this.createElement('span')
        span.textContent = project.title;
        // Create a delete button for every project
        const deleteButton = this.createElement('button', 'delete')
        deleteButton.textContent = 'Delete'
        // Append paragraph and delete button to project div
        projectDiv.append(span, deleteButton)
        // Append project div to project list container
        this.projectsContainer.append(projectDiv)
      })
    }
  }
  // Display projects
  displayTasks(tasks) {
    // Get the active project
    const activeProject = this.getElement('.active-project')
    // Get the attribute of this active project
    const projectAttribute = activeProject.getAttribute('project-id')
    // Filter the array of tasks to find which ones belong to the active project
    const newArray = tasks.filter(task => task.projectID !== projectAttribute)
    // If there are no elements that belong to the active project show a message
    if (newArray.length === 0) {
      const p = this.createElement('p')
      p.textContent = 'Add Tasks'
      this.tasksContainer.append(p)
    }
    else {
      newArray.forEach(element => {
        // Create a container div for the task
        const taskDiv = createElement('div', '.task-div')

        taskDiv.setAttribute('task-id', element.id)

        const span = this.createElement('span')
        span.textContent = keys[0];
        
        const priorityButton = this.createElement('button', 'priority')
        priorityButton.textContent = element.priority
        // Create a delete button for every project
        const deleteButton = this.createElement('button', 'delete')
        deleteButton.textContent = 'Delete'
        // Append paragraph and delete button to project div
        projectDiv.append(span, priorityButton, deleteButton)
        // Append project div to project list container
        this.tasksContainer.append(taskDiv)
      })
    }
  }
}
/**
 * Controller
 *
 * Links the user input and the view output.
 */
class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    // Explicit this binding

    // Display initial todos
    this.onTodoListChanged(this.model.projects)
  }
  onTodoListChanged = (projects) => {
    this.view.displayProjects(projects)
  }
}

const app = new Controller(new Model(), new View())