const state = {
  tasks: []
};

const list = document.querySelector("#taskList");

function saveState() {
  localStorage.setItem("simpleTasks", JSON.stringify(state));
}

function render() {
  list.innerHTML = "";

  state.tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    list.append(li);
  });
}

function addTask(title) {
  state.tasks.push({
    id: Date.now(),
    title,
    completed: false
  });

  saveState();
  render();
}

addTask("Practice state-driven rendering");
