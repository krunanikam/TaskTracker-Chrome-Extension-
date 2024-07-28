document.getElementById('saveTask').addEventListener('click', () => {
    const task = document.getElementById('task').value;
    if (task) {
        chrome.storage.sync.get('tasks', (data) => {
            const tasks = data.tasks || [];
            tasks.push(task);
            chrome.storage.sync.set({ tasks: tasks }, () => {
                displayTasks();
                document.getElementById('task').value = '';
            });
        });
    }
  });
  
  function displayTasks() {
    chrome.storage.sync.get('tasks', (data) => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear the existing tasks
        if (data.tasks) {
            data.tasks.forEach((task, index) => {
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                taskItem.innerText = task;
                taskItem.addEventListener('click', () => {
                    removeTask(index);
                });
                taskList.appendChild(taskItem);
            });
        }
    });
  }
  
  function removeTask(index) {
    chrome.storage.sync.get('tasks', (data) => {
        const tasks = data.tasks || [];
        tasks.splice(index, 1);
        chrome.storage.sync.set({ tasks: tasks }, () => {
            displayTasks();
        });
    });
  }
  
  document.addEventListener('DOMContentLoaded', displayTasks);
  
  document.getElementById('addTaskButton').addEventListener('click', () => {
    const taskInputSection = document.getElementById('taskInputSection');
    taskInputSection.classList.toggle('hidden');
  });
  