// Application state is the source of truth for the data.
const state = {
  tasks: [
    { id: 1, title: "Learn DOM", completed: false },
    { id: 2, title: "Practice localStorage", completed: true }
  ],
  filter: "all"
};

console.log(state.tasks);
console.log(state.tasks.filter(task => !task.completed));
