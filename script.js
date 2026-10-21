// Select the page elements.
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const message = document.querySelector('#message');
const clearButton = document.querySelector('#clear-completed');
const filterButtons = document.querySelectorAll('[data-filter]');
const storageKey = 'marvin-daylist-tasks-v1';
let tasks = [];
let currentFilter = 'all';

// Load tasks saved by this app, and ignore invalid saved data.
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(saved)) {
    tasks = saved.filter(function (task) {
      return task && typeof task.title === 'string' && task.title.trim() &&
        task.title.length <= 150 && typeof task.done === 'boolean';
    });
  }
} catch (error) {
  document.querySelector('#storage-warning').hidden = false;
}

function saveTasks() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch (error) {
    document.querySelector('#storage-warning').hidden = false;
  }
}

function renderTasks() {
  list.replaceChildren();
  let visibleCount = 0;
  let remaining = 0;
  let completed = 0;

  tasks.forEach(function (task, index) {
    if (task.done) completed++; else remaining++;
    if (currentFilter === 'active' && task.done) return;
    if (currentFilter === 'completed' && !task.done) return;
    visibleCount++;

    const item = document.createElement('li');
    item.className = task.done ? 'task done' : 'task';
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    const text = document.createElement('span');
    // textContent displays user text safely, without interpreting HTML.
    text.textContent = task.title;
    label.append(checkbox, text);

    checkbox.addEventListener('change', function () {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
      message.textContent = task.done ? 'Task completed. Nice work!' : 'Task marked active.';
      const nextCheckbox = list.querySelectorAll('input')[Math.min(visibleCount - 1, list.children.length - 1)];
      if (nextCheckbox) nextCheckbox.focus();
    });

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete-button';
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', 'Delete task: ' + task.title);
    remove.addEventListener('click', function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      message.textContent = 'Task deleted.';
      input.focus();
    });
    item.append(label, remove);
    list.appendChild(item);
  });

  document.querySelector('#task-count').textContent = remaining + ' left to do';
  clearButton.disabled = completed === 0;
  const empty = document.querySelector('#empty-state');
  empty.hidden = visibleCount !== 0;
  empty.querySelector('h3').textContent = tasks.length === 0 ? 'A fresh start.' : 'Nothing here for now.';
  empty.querySelector('p').textContent = tasks.length === 0 ?
    'Add your first task. Small steps count.' : 'Try another filter to see your other tasks.';
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    message.textContent = 'Please write a task first.';
    input.focus();
    return;
  }
  tasks.push({ title: title, done: false });
  currentFilter = 'all';
  updateFilters();
  saveTasks();
  renderTasks();
  input.value = '';
  input.focus();
  message.textContent = 'Task added.';
});

function updateFilters() {
  filterButtons.forEach(function (button) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === currentFilter));
  });
}

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    currentFilter = button.dataset.filter;
    updateFilters();
    renderTasks();
    message.textContent = 'Showing ' + currentFilter + ' tasks.';
  });
});

clearButton.addEventListener('click', function () {
  tasks = tasks.filter(function (task) { return !task.done; });
  saveTasks();
  renderTasks();
  message.textContent = 'Completed tasks cleared.';
  input.focus();
});

renderTasks();
