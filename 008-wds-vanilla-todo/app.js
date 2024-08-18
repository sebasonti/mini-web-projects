import { TodoList } from "./TodoList.js";
import TodoManager from "./TodoManager.js";
import Utils from "./utils.js";

const taskLists = document.querySelector('.task-lists');
const taskList = document.querySelector('.tasks');
const listTitle = document.querySelector('.current-task-list .header .title');
const taskCount = document.querySelector('.task-count');
const newListForm = document.getElementById('new-list');
const newTaskForm = document.getElementById('new-task');
const clearCompletedBtn = document.querySelector('[data-clear-completed]');
const deleteListBtn = document.querySelector('[data-delete-list]');

const todoManager = new TodoManager(taskLists);
const activeTaskList = new TodoList(listTitle, taskList, taskCount);
todoManager.render();
activeTaskList.setActiveTaskList(todoManager.getActiveList());
activeTaskList.render();

newListForm.addEventListener('submit', (e) => {
  e.preventDefault();
  todoManager.addTaskList(Utils.getFormField(newListForm, 'list-name'));
  todoManager.saveAndRender();
  newListForm.reset();
  activeTaskList.setActiveTaskList(todoManager.getActiveList());
  activeTaskList.render();
});

newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  activeTaskList.addTask(Utils.getFormField(newTaskForm, 'task-subject'));
  todoManager.save();
  activeTaskList.render();
  newTaskForm.reset();
});

taskLists.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const activeListId = e.target.dataset.id;
    todoManager.setActiveListId(activeListId);
    todoManager.saveAndRender();
    activeTaskList.setActiveTaskList(todoManager.getActiveList());
    activeTaskList.render();
  }
});

taskList.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const taskId = e.target.getAttribute('id');
    const isChecked = e.target.hasAttribute('checked');
    if (!isChecked) {
      activeTaskList.completeTask(taskId);
    } else {
      activeTaskList.restoreTask(taskId);
    }
    todoManager.save();
    activeTaskList.render();
  }
});

clearCompletedBtn.addEventListener('click', () => {
  activeTaskList.clearCompleted();
  todoManager.save();
  activeTaskList.render();
});

deleteListBtn.addEventListener('click', () => {
  todoManager.removeTaskList();
  todoManager.saveAndRender();
  activeTaskList.setActiveTaskList(todoManager.getActiveList());
  activeTaskList.render();
});