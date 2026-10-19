/* Daymark — small, dependency-free personal task and expense tracker. */
(() => {
  'use strict';

  const STORAGE_KEY = 'daymark-data-v1';
  const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
  const today = new Date();
  const dateInputValue = (date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  };
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const uid = () => (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const readData = () => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { tasks: Array.isArray(data.tasks) ? data.tasks : [], expenses: Array.isArray(data.expenses) ? data.expenses : [] };
    } catch { return { tasks: [], expenses: [] }; }
  };
  let state = readData();
  let taskFilter = 'all';
  let toastTimer;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { showToast('Could not save. Check your browser storage settings.'); }
  };
  const showToast = (message) => {
    const toast = $('#toast'); toast.textContent = message; toast.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
  };
  const formatShortDate = (value) => {
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? 'No date' : new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(date);
  };
  const monthExpenses = () => state.expenses.filter((expense) => expense.date.slice(0, 7) === dateInputValue(today).slice(0, 7));

  function renderStats() {
    const open = state.tasks.filter((task) => !task.completed).length;
    const done = state.tasks.length - open;
    const monthly = monthExpenses();
    const total = monthly.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    const percent = state.tasks.length ? Math.round((done / state.tasks.length) * 100) : 0;
    $('#open-task-total').textContent = open;
    $('#done-task-total').textContent = done;
    $('#task-stat-caption').textContent = open === 1 ? 'task to focus on' : 'tasks to focus on';
    $('#completion-progress').style.width = `${percent}%`;
    $('#completion-caption').textContent = state.tasks.length ? `${percent}% of your tasks complete` : 'A fresh start';
    $('#month-expense-total').textContent = money.format(total);
    $('#expense-panel-total').textContent = money.format(total);
    $('#month-expense-count').textContent = monthly.length;
    $('#heading-task-count').textContent = open;
    $('#nav-task-count').textContent = open;
    $('#filter-all-count').textContent = state.tasks.length;
    $('#filter-active-count').textContent = open;
    $('#filter-done-count').textContent = done;
  }

  function renderTasks() {
    const query = $('#task-search').value.trim().toLocaleLowerCase();
    const tasks = state.tasks.filter((task) => (taskFilter === 'all' || (taskFilter === 'active' ? !task.completed : task.completed)) && `${task.title} ${task.notes || ''}`.toLocaleLowerCase().includes(query));
    const list = $('#task-list');
    if (!tasks.length) {
      const hasTasks = state.tasks.length > 0;
      list.innerHTML = `<div class="empty-state"><span class="empty-illustration">${query || taskFilter !== 'all' ? '⌕' : '✳'}</span><strong>${query ? 'No matches just yet' : taskFilter !== 'all' ? `No ${taskFilter === 'active' ? 'open' : 'completed'} tasks` : 'A little space to begin'}</strong><p>${query ? 'Try a different search.' : taskFilter !== 'all' ? 'Try another filter to see your tasks.' : 'Add a task and make today yours.'}</p>${!hasTasks ? '<button class="text-button" data-action="open-task-form">＋ Add your first task</button>' : ''}</div>`;
    } else {
      list.innerHTML = tasks.map((task) => `<article class="task-row ${task.completed ? 'is-complete' : ''}" data-task-id="${escapeHTML(task.id)}"><button class="check-button" data-action="toggle-task" aria-label="${task.completed ? 'Mark incomplete' : 'Mark complete'}" aria-pressed="${task.completed}">${task.completed ? '✓' : ''}</button><div class="task-copy"><div class="task-title">${escapeHTML(task.title)}</div>${task.notes ? `<div class="task-note">${escapeHTML(task.notes)}</div>` : ''}</div><span class="priority-pill priority-${escapeHTML(task.priority || 'normal')}">${escapeHTML(task.priority || 'normal')}</span><button class="row-menu" data-action="edit-task" aria-label="Edit ${escapeHTML(task.title)}">✎</button><button class="row-menu delete-button" data-action="delete-task" aria-label="Delete ${escapeHTML(task.title)}">×</button></article>`).join('');
    }
    const remaining = state.tasks.filter((task) => !task.completed).length;
    $('#task-footer-text').textContent = remaining ? `${remaining} ${remaining === 1 ? 'task' : 'tasks'} to go. One thing at a time.` : state.tasks.length ? 'Look at you, getting things done.' : 'A little at a time.';
  }

  const categoryIcons = { 'Food & drink': '☕', Transport: '↗', Shopping: '◈', Bills: '▤', Health: '✳', Entertainment: '♫', Other: '◉' };
  function renderExpenses() {
    const expenses = [...state.expenses].sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 5);
    const list = $('#expense-list');
    if (!expenses.length) {
      list.innerHTML = '<div class="expense-empty"><span>◈</span><div><strong>Your spending, at a glance</strong><small>Add an expense to start tracking.</small></div></div>';
      return;
    }
    list.innerHTML = expenses.map((expense) => `<article class="expense-row" data-expense-id="${escapeHTML(expense.id)}"><span class="category-icon category-${escapeHTML((expense.category || 'Other').toLowerCase().replace(/[^a-z]+/g, '-'))}">${categoryIcons[expense.category] || '◉'}</span><div class="expense-copy"><strong>${escapeHTML(expense.description)}</strong><small>${escapeHTML(expense.category)} <span>·</span> ${formatShortDate(expense.date)}</small></div><strong class="expense-amount">${money.format(Number(expense.amount))}</strong><button class="row-menu expense-menu" data-action="edit-expense" aria-label="Edit ${escapeHTML(expense.description)}">✎</button><button class="row-menu delete-button" data-action="delete-expense" aria-label="Delete ${escapeHTML(expense.description)}">×</button></article>`).join('');
  }

  function render() { renderStats(); renderTasks(); renderExpenses(); }
  function openTaskForm(task = null) {
    const form = $('#task-form'); form.reset(); form.elements.id.value = task?.id || '';
    form.elements.title.value = task?.title || ''; form.elements.notes.value = task?.notes || ''; form.elements.priority.value = task?.priority || 'normal';
    $('#task-dialog-title').textContent = task ? 'Edit task' : 'Add a task'; clearErrors(form); $('#task-dialog').showModal(); $('#task-title').focus();
  }
  function openExpenseForm(expense = null) {
    const form = $('#expense-form'); form.reset(); form.elements.id.value = expense?.id || '';
    form.elements.description.value = expense?.description || ''; form.elements.amount.value = expense?.amount ?? '';
    form.elements.date.value = expense?.date || dateInputValue(today); form.elements.category.value = expense?.category || 'Food & drink';
    $('#expense-dialog-title').textContent = expense ? 'Edit expense' : 'Add an expense'; clearErrors(form); $('#expense-dialog').showModal(); $('#expense-description').focus();
  }
  function clearErrors(form) { $$('.field-error', form).forEach((node) => { node.textContent = ''; }); $$('.form-input', form).forEach((node) => node.removeAttribute('aria-invalid')); }
  function setError(form, name, message) { const field = form.elements[name]; const error = $(`[data-error-for="${name}"]`, form); error.textContent = message; field.setAttribute('aria-invalid', 'true'); if (!fieldToFocus) fieldToFocus = field; }
  let fieldToFocus = null;
  function taskSubmit(event) {
    event.preventDefault(); const form = event.currentTarget; clearErrors(form); fieldToFocus = null;
    const title = form.elements.title.value.trim();
    if (!title) setError(form, 'title', 'Give your task a name.');
    if (title.length > 100) setError(form, 'title', 'Keep the title under 100 characters.');
    if (fieldToFocus) { fieldToFocus.focus(); return; }
    const id = form.elements.id.value; const existing = state.tasks.find((task) => task.id === id);
    const task = { id: id || uid(), title, notes: form.elements.notes.value.trim(), priority: form.elements.priority.value, completed: existing?.completed || false, createdAt: existing?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
    state.tasks = existing ? state.tasks.map((item) => item.id === id ? task : item) : [task, ...state.tasks];
    save(); render(); $('#task-dialog').close(); showToast(existing ? 'Task updated.' : 'Task added.');
  }
  function expenseSubmit(event) {
    event.preventDefault(); const form = event.currentTarget; clearErrors(form); fieldToFocus = null;
    const description = form.elements.description.value.trim(); const amount = Number(form.elements.amount.value); const date = form.elements.date.value;
    if (!description) setError(form, 'description', 'Add a short description.');
    if (!Number.isFinite(amount) || amount <= 0) setError(form, 'amount', 'Enter an amount greater than zero.');
    if (amount > 100000000) setError(form, 'amount', 'Enter an amount below ₹10 crore.');
    if (!date || Number.isNaN(Date.parse(`${date}T00:00:00`))) setError(form, 'date', 'Choose a valid date.');
    if (fieldToFocus) { fieldToFocus.focus(); return; }
    const id = form.elements.id.value; const existing = state.expenses.find((item) => item.id === id);
    const expense = { id: id || uid(), description, amount, date, category: form.elements.category.value, createdAt: existing?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
    state.expenses = existing ? state.expenses.map((item) => item.id === id ? expense : item) : [expense, ...state.expenses];
    save(); render(); $('#expense-dialog').close(); showToast(existing ? 'Expense updated.' : 'Expense added.');
  }

  document.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-action]');
    if (actionButton) {
      const action = actionButton.dataset.action;
      if (action === 'open-task-form') openTaskForm();
      if (action === 'open-expense-form') openExpenseForm();
      if (action === 'close-dialog') actionButton.closest('dialog').close();
      if (action === 'toggle-task') {
        const row = actionButton.closest('[data-task-id]'); const task = state.tasks.find((item) => item.id === row.dataset.taskId);
        if (task) { task.completed = !task.completed; task.updatedAt = new Date().toISOString(); save(); render(); }
      }
      if (action === 'edit-task') { const row = actionButton.closest('[data-task-id]'); openTaskForm(state.tasks.find((item) => item.id === row.dataset.taskId)); }
      if (action === 'edit-expense') { const row = actionButton.closest('[data-expense-id]'); openExpenseForm(state.expenses.find((item) => item.id === row.dataset.expenseId)); }
      if (action === 'delete-task' || action === 'delete-expense') {
        const isTask = action === 'delete-task'; const row = actionButton.closest(isTask ? '[data-task-id]' : '[data-expense-id]');
        const id = isTask ? row.dataset.taskId : row.dataset.expenseId; const list = isTask ? state.tasks : state.expenses;
        const item = list.find((entry) => entry.id === id); const label = isTask ? item?.title : item?.description;
        if (item && confirm(`Delete “${label}”? This cannot be undone.`)) {
          if (isTask) state.tasks = state.tasks.filter((entry) => entry.id !== id); else state.expenses = state.expenses.filter((entry) => entry.id !== id);
          save(); render(); showToast(isTask ? 'Task deleted.' : 'Expense deleted.');
        }
      }
      if (action === 'clear-completed') {
        const count = state.tasks.filter((task) => task.completed).length;
        if (!count) { showToast('No completed tasks to clear.'); return; }
        state.tasks = state.tasks.filter((task) => !task.completed); save(); render(); showToast(`${count} completed ${count === 1 ? 'task' : 'tasks'} cleared.`);
      }
      return;
    }
    const nav = event.target.closest('[data-nav]');
    if (nav) { $$('.nav-link').forEach((link) => link.classList.toggle('active', link === nav)); }
  });

  document.addEventListener('contextmenu', (event) => {
    const row = event.target.closest('[data-task-id], [data-expense-id]'); if (!row) return;
    event.preventDefault();
    const isTask = row.hasAttribute('data-task-id');
    const collection = isTask ? state.tasks : state.expenses;
    const id = isTask ? row.dataset.taskId : row.dataset.expenseId;
    const item = collection.find((entry) => entry.id === id);
    const label = isTask ? item?.title : item?.description;
    if (!item || !confirm(`Delete “${label}”? This cannot be undone.`)) return;
    if (isTask) state.tasks = state.tasks.filter((entry) => entry.id !== id);
    else state.expenses = state.expenses.filter((entry) => entry.id !== id);
    save(); render(); showToast(isTask ? 'Task deleted.' : 'Expense deleted.');
  });

  $('#task-form').addEventListener('submit', taskSubmit);
  $('#expense-form').addEventListener('submit', expenseSubmit);
  $('#task-search').addEventListener('input', renderTasks);
  document.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-task-filter]'); if (!tab) return;
    taskFilter = tab.dataset.taskFilter; $$('[data-task-filter]').forEach((button) => button.classList.toggle('active', button === tab)); renderTasks();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' && !event.target.matches('input, textarea, select')) {
      const selected = document.activeElement?.closest('[data-task-id], [data-expense-id]');
      if (selected) { event.preventDefault(); selected.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true })); }
    }
  });

  $('#today-date').textContent = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(today);
  $('#today-label').textContent = new Intl.DateTimeFormat('en-IN', { weekday: 'long' }).format(today).toUpperCase();
  render();
})();
