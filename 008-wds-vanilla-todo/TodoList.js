export class TodoList {
  constructor(listTitleElement, taskListElement, taskCountElement) {
    this.listTitleElement = listTitleElement;
    this.taskListElement = taskListElement;
    this.taskCountElement = taskCountElement;
    this.taskList = null;
  }

  setActiveTaskList(taskList) {
    if (taskList) {
      this.taskList = taskList
    }
  }

  addTask(subject) {
    this.taskList.tasks.push({
      subject,
      completed: false,
      id: crypto.randomUUID()
    });
    this.taskList.pendingCount += 1;
  }

  clearCompleted() {
    this.taskList.tasks = this.taskList.tasks.filter(task => !task.completed);
  }

  completeTask(id) {
    const task = this.taskList.tasks.find((task) => task.id === id);
    task.completed = true;
    this.taskList.pendingCount -= 1;
  }

  restoreTask(id) {
    const task = this.taskList.tasks.find((task) => task.id === id);
    task.completed = false;
    this.taskList.pendingCount += 1;
  }

  render() {
    if (!this.taskList) return;
    this.taskListElement.innerHTML = '';
    this.listTitleElement.innerText = this.taskList.name;
    this.taskCountElement.innerText = `${this.taskList.pendingCount} tasks remaining`;

    this.taskList.tasks
      .forEach(task => {
        const newTask = document.createElement('li');
        newTask.classList.add('task');
        newTask.dataset.id = task.id;
        newTask.innerHTML = `
          <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}/>
          <label for="${task.id}">
            <span class="custom-checkbox"></span>
            ${task.subject}
          </label>
        `;
        this.taskListElement.appendChild(newTask);
      });
  }
}