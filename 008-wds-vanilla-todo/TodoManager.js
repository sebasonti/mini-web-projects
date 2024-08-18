const LOCAL_STORAGE_TASK_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_Active_LIST_ID_KEY = 'task.activeListId';

export default class TodoManager {
  constructor(taskListsElement) {
    this.taskLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_LIST_KEY)) || [];
    this.activeListId = localStorage.getItem(LOCAL_STORAGE_Active_LIST_ID_KEY);
    this.taskListsElement = taskListsElement;
  }

  addTaskList(taskListName) {
    const newList = {
      name: taskListName,
      tasks: [],
      id: crypto.randomUUID(),
      pendingCount: 0,
    };
    this.taskLists.push(newList);
    this.activeListId = newList.id;
  }

  removeTaskList() {
    this.taskLists = this.taskLists.filter(taskList => taskList.id !== this.activeListId);
    this.activeListId = this.taskLists[this.taskLists.length - 1].id;
  }

  getActiveList() {
    return this.taskLists.find(taskList => taskList.id === this.activeListId);
  }

  setActiveListId(id) {
    this.activeListId = id;
  }

  render() {
    this.taskListsElement.innerHTML = '';
    this.taskLists
      .forEach(taskList => {
        const newTaskList = document.createElement('li');
        newTaskList.dataset.id = taskList.id;
        newTaskList.classList.add('list-name');
        newTaskList.innerText = taskList.name;
        if (taskList.id === this.activeListId) {
          newTaskList.classList.add('active-list');
        }
        this.taskListsElement.appendChild(newTaskList);
      });
  }

  save() {
    localStorage.setItem(LOCAL_STORAGE_TASK_LIST_KEY, JSON.stringify(this.taskLists));
    localStorage.setItem(LOCAL_STORAGE_Active_LIST_ID_KEY, this.activeListId);
  }

  saveAndRender() {
    this.save();
    this.render();
  }
}