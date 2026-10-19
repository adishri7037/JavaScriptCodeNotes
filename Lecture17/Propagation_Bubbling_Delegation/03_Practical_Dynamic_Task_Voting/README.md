
## Goal
Build a task list where tasks can be added dynamically and each task can be completed or deleted.

## Key requirement
Use ONE click listener on `#taskList`.

Do not attach separate click listeners to every task button.

## Flow

User clicks Complete/Delete
        ↓
button receives event
        ↓
event bubbles
        ↓
#taskList listener receives event
        ↓
event.target.closest("[data-action]")
        ↓
find parent [data-id]
        ↓
read action + id
        ↓
update tasks array
        ↓
renderTasks()

## Why dynamic elements work

Every time `renderTasks()` creates new buttons, the buttons do not need new listeners.

The event bubbles from the new button to `#taskList`, where the existing delegated listener handles it.

## Extension: Voting List

Change each item to contain:

```html
<li data-id="1">
  <span>JavaScript</span>
  <strong data-votes>0</strong>
  <button data-action="vote">Vote</button>
</li>
```

Inside the delegated listener:

```js
if (action === "vote") {
  item.votes++;
}
```

The same architecture works for:
- voting systems
- shopping carts
- task managers
- FAQ lists
- product lists
- notification lists
