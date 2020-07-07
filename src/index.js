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
        title: 'Make ramen'
      },
      {
        id: 1, 
        title: 'Meat Toilet'
      }
    ]
    this.tasks = [
      {
        id: 0, 
        projectID: 0, 
        title: 'Get pork bones', 
        dueDate: '2020-10-10',
        priority: 'Low', 
        notes: 'do this please',
        complete: false,
      },
      {
        id: 1, 
        projectID: 1, 
        title: 'get toilet',
        dueDate: '2020-10-10',
        priority: 'Medium', 
        notes: 'do this please',
        complete: false,
      },
      {
        id: 2, 
        projectID: 2, 
        title: 'Buy carrots', 
        dueDate: '2020-10-10',
        priority: 'High', 
        notes: 'do this please',
        complete: false,
      }
    ]
  }
  bindTaskListChanged(task) {
    this.onTaskListChanged = task
  }

  bindProjectListChanged(project) {
    this.onProjectListChanged = project
  }

  bindShowView(task) {
    this.showView = task
  }

  addProject(project) {
    const projectID = this.projects.length
    const newProject = { id: projectID, title: project}
    this.projects.push(newProject)
    this.onProjectListChanged(this.projects)
  }

  addTask(title, date, priority, projectID) {
    console.log(priority)
    const taskID = this.tasks.length
    const newTask = { 
      id: taskID, 
      projectID: projectID,
      title: title,
      date: date,
      priority: priority,
      complete: false,
    }
    this.tasks.push(newTask)
    this.onTaskListChanged(this.tasks)
  }

  deleteProject(id) {
    this.projects = this.projects.filter(project => project.id !== id)

    this._commit(this.todos)
  }
  
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id)
    this.onTaskListChanged(this.tasks)

  }

  toggleTodo(id) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { id: task.id, title: task.title, complete: !task.complete, priority: task.priority} : task
    )
    this.onTaskListChanged(this.tasks)
  }

  sort(id) {
    if (id === 'all') {
      console.log(this.tasks)
      this.showView(this.tasks)
    }

    else {

    this.newtasks = this.tasks.map(task => {

      if (task.projectID === id) return { id: task.id, title: task.title, complete: 
        task.complete, priority: task.priority, projectID: task.projectID, date: task.date}
    })

    this.showView(this.newtasks)
  }
}
  changePriority(id) {

    this.newnewtasks = this.tasks.map(task => {

      if (task.id === id ) {
        let currentPriority = task.priority
        switch (currentPriority) {
          case "Low":
            currentPriority = 'Medium'
            break;
          case "Medium":
            currentPriority = 'High'
            break;
          case "High":
            currentPriority = 'Low'
            break;
          default:
        }
        return { id: task.id, title: task.title, complete: task.complete, priority: currentPriority}
      }
        else {
          return task
        }
      }
    )
    this.tasks = this.newnewtasks
    this.onTaskListChanged(this.newnewtasks)
  }
}

/**
 *View
 *
 * Visual representation of the model.
 */
class View {
  constructor() {
    this.container = this.getElement('#container')

    // Create main container
    this.main = this.createElement('main')

    // Create container for projects
    this.projectsContainer = this.createElement('div', 'projects-container')
    // Create All Tasks Button
    this.allTasksDiv = this.createElement('div', 'all-projects')
    this.allTasks = this.createElement('button', 'project-button')
    this.allTasks.textContent = 'All Tasks'
    this.allTasks.setAttribute('project-id', 'all')
    this.allTasksDiv.append(this.allTasks)
    // Create Add Project Container
    this.addProjectContainer = this.createElement('div', 'add-project-container')
    //    Create Add Project Button
    this.addProjectButton = this.createElement('button', 'add-project-button')
    this.addProjectButton.textContent = 'Add Project'
    //    Create Add Project Form
    this.form = this.createElement('form', 'hidden')
    this.form.setAttribute('id', 'add-project-form')
    this.input = this.createElement('input')
    this.input.name = 'project name'
    this.input.placeholder = 'project name'
    this.projectSubmitbutton = this.createElement('button')
    this.projectSubmitbutton.textContent = 'Save'
    this.projectSubmitbutton.type = 'submit'
    this.projectResetbutton = this.createElement('button')
    this.projectResetbutton.textContent = 'Hide'
    this.projectResetbutton.type = 'reset'
    //    Append it all inside the form
    this.form.append(this.input, this.projectSubmitbutton, this.projectResetbutton)
    // Put add project button and form inside addProjectContainer
    this.addProjectContainer.append(this.addProjectButton, this.form)
    // Append all tasks to projects container, tasks and add button will go later
    this.projectsA = this.createElement('div', 'projectsa')
    this.projectsContainer.append(this.allTasksDiv, this.projectsA, this.addProjectContainer)
    this.main.append(this.projectsContainer)
    this.container.append(this.main)

    // Create container for tasks
    this.tasksContainer = this.createElement('div', 'tasks-container')
    // Create header fot tasks
    this.header = this.createElement('header')
    this.headerSpan = this.createElement('span');
    this.headerSpan.textContent = 'My Day'
    this.header.append(this.headerSpan)
    // Add header to tasks container, all tasks and add task will go after
    this.tasksContainer.append(this.header)
    // 
    this.addTaskForm = this.createElement('form', 'add-task-form')
    this.addTaskInput = this.createElement('input')
    this.addTaskInput.name = 'task name'
    this.addTaskInput.placeholder = 'project name'
    this.dateInput = this.createElement('input')
    this.dateInput.name = 'date'
    this.dateInput.type = 'date'
    this.dateInput.setAttribute('id', 'date')
    this.taskSubmitbutton = this.createElement('button')
    this.taskSubmitbutton.type = 'submit'
    this.taskSubmitbutton.textContent = 'Save'
    this.select = this.createElement('select', 'select')
    this.select.add(new Option('Low', 'Low'));
    this.select.add(new Option('Medium', 'Medium'));
    this.select.add(new Option('High', 'High'));
    this.addTaskForm.append(this.addTaskInput, this.dateInput, this.select, this.taskSubmitbutton)
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
      this.projectsA.append(p)
    }
    else {
      while (this.projectsA.firstChild) {
        this.projectsA.removeChild(this.projectsA.firstChild)
      }
      projects.forEach(project => {
        const projectDiv = this.createElement('div', 'project')
        projectDiv.setAttribute('project-id', project.id)
        const button = this.createElement('button', 'project-button')
        button.textContent = project.title;
        // Create a delete button for every project
        const deleteButton = this.createElement('button', 'delete')
        deleteButton.textContent = 'Delete'
        // Append paragraph and delete button to project div
        projectDiv.append(button, deleteButton)
        // Append project div to project list container
        this.projectsA.append(projectDiv)
      })
    }
  }
  // Display projects
  displayAllTasks(tasks) {
    const current = document.querySelector('[active]')
    // current = this.getElement('[active]')
    while (this.tasksContainer.firstChild) {
      this.tasksContainer.removeChild(this.tasksContainer.firstChild)
    }
    // If there are no elements that belong to the active project show a message
    if (tasks.length === 0) {
      const p = this.createElement('p')
      p.textContent = 'Add Tasks'
      this.tasksContainer.append(p)
    }
    // else if () {
    if (current === true)
    else {
      tasks.forEach(element => {

        if (element === undefined) return
        // Create a container div for the task
        const task = this.createElement('div', 'task')
        // Give it a unique task-id to recognize it in the task array
        task.setAttribute('task-id', element.id)
        // Create a checkbox for the ask
        const checkbox = this.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = task.complete
        // Create a span and then give it the title of the task
        const span = this.createElement('span')
        if (element.complete) {
          const strike = this.createElement('s')
          strike.textContent = element.title
          span.append(strike)
        } else {
          // Otherwise just display the text
          span.textContent = element.title
        }
        const span2 = this.createElement('span')
        span2.textContent = element.date

        const priorityButton = this.createElement('button', 'priority')
        priorityButton.textContent = element.priority
        // Create a delete button for every project
        const deleteButton = this.createElement('button', 'delete')
        deleteButton.textContent = 'Delete'
        // Append paragraph and delete button to project div
        task.append(checkbox, span, span2, priorityButton, deleteButton)
        // Append project div to project list container
        this.tasksContainer.append(task)
        this.main.append(this.tasksContainer)
        this.container.append(this.main)
      })
    }
    this.addTaskContainer = this.createElement('div', 'add-task-container')
    this.addTaskButton = this.createElement('button', 'add-task-button')
    this.addTaskButton.textContent = 'Add Task'
    this.addTaskContainer.append(this.addTaskForm, this.addTaskButton)
    // Put is all inside Container
    this.tasksContainer.append(this.addTaskContainer)

  }
  displayAddProjectForm() {
    const form = this.getElement('form')
    form.style.display = 'none'
    const addTask = this.getElement('.add-task-button')
    addTask.style.display = 'auto'
  }

  bindToggleTodo(handler) {
    this.tasksContainer.addEventListener('change', event => {
      if (event.target.type === 'checkbox') {
        const id = parseInt(event.target.parentElement.attributes[1].nodeValue)
        handler(id)
      }
    })
  }

  doitall(handler, deletes, addTaskHandler, toggle) {
    this.tasksContainer.addEventListener('click', event => {
      event.preventDefault()
      console.log(event.target)
      if (event.target.className=== 'priority') {
        const id = parseInt(event.target.parentElement.attributes[1].nodeValue)
        console.log(id)
        handler(id)
      }
      if (event.target.className=== 'delete') {
        const id = parseInt(event.target.parentElement.attributes[1].nodeValue)
        console.log(id)
        deletes(id)
      }
      if (event.target.textContent === 'Add Task') {
        const form = this.getElement('.add-task-form')
        form.style.display = 'inline'
        const addTask = this.getElement('.add-task-button')
        addTask.style.display = 'none'
      }
      if (event.target.textContent === 'Save') {
        console.log(event)
        const form = this.getElement('.add-task-form');
        const date = form[1].value
        console.log(form)
        console.log(date)
        const title = form[0].value;
        const priority = form[2].value;
        const getprojectid = parseInt(document.querySelector('[active]').attributes[1].nodeValue)

        console.log(priority)
        form.reset()
        const a = document.querySelector('[active]').attributes.class  
        consle.log(a)

        addTaskHandler(title, date, priority, getprojectid)
        form.style.display = 'none'
        const addTask = this.getElement('.add-task-button')
        addTask.style.display = 'auto'
        // const priority = form[1].value;

      }
      if (event.target.type === 'checkbox') {
        const id = parseInt(event.target.parentElement.attributes[1].nodeValue)
        toggle(id)
      }


    })
  }

  bindShowTasks(handler, handler2, handler3) {
    this.projectsContainer.addEventListener('click', event => {
      event.preventDefault()
      console.log(event.target.textContent)
      if (event.target.className === 'project-button') {
        const projectnodes = document.querySelectorAll('.project')
        projectnodes.forEach(node => node.removeAttribute('active'))
        event.target.parentElement.setAttribute('active', 'true')
        const projectID = parseInt(event.target.parentElement.attributes[1].nodeValue);
        console.log(projectID)
        // this.tasks = this.tasks.map(task =>
        //   task.id === id ? { id: task.id, title: task.title, complete: !task.complete, priority: task.priority} : task
        // )
        handler(projectID)
      }
      if (event.target.textContent === 'All Tasks') {
        handler('all')
      }
      if (event.target.textContent === 'Add Project') {
        const projectform = this.getElement('.hidden')
        projectform.style.display = 'block'
      }
      if (event.target.textContent === 'Save') {

        const form = document.getElementById('add-project-form')
        const title = form[0].value
        form.reset()
        const projectform = this.getElement('.hidden')
        projectform.style.display = 'none'
        console.log(title)
        handler3(title)



      }
    })
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
    // Display initial todos
    this.onProjectListChanged(this.model.projects)

    this.model.bindProjectListChanged(this.onProjectListChanged)


    this.onTaskListChanged(this.model.tasks, this.handleShow)

    this.model.bindTaskListChanged(this.onTaskListChanged)

    this.view.doitall(this.handleDoItAll, this.handleDeleteTask, this.handleAddTask, this.handleToggleTodo)
    this.model.bindShowView(this.showView)
    this.view.bindToggleTodo(this.handleToggleTodo)
    this.view.bindShowTasks(this.handleShow, this.onTaskListChanged, this.handleAddProject)
  }

  giveViews = (p) => {
    this.view.showshow(p)
  }

  onProjectListChanged = (projects) => {
    this.view.displayProjects(projects)
  }

  onTaskListChanged = (tasks) => {
    this.view.displayAllTasks(tasks)
  }

  handleAddProject = (project) => {
    this.model.addProject(project)
}

  handleDeleteProject = (project) => {
    this.model.deleteProject(project)
}

  handleAddTask = (task, one, two, three) => {
    this.model.addTask(task, one, two, three)
}

  handleDeleteTask = (task) => {
    this.model.deleteTask(task)
  }

  displayAllTasks = () => {
    this.view.displayAllTasks(tasks)
  }

  handleToggleTodo = id => {
    this.model.toggleTodo(id)
  }
  handleShow = id => {
    this.model.sort(id)
  }

  showView = tasks => {
    this.view.displayAllTasks(tasks)
  }
  handleDoItAll = id => {
    this.model.changePriority(id)
  }
}

const app = new Controller(new Model(), new View())