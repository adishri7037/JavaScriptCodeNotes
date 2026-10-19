# DOM Traversal & Interactive Profile Project

## Lecture Topic
- parentElement and children
- closest()
- Combining selection, content, attributes, classes, and element creation
- Basic separation of data, logic, and rendering
- DOM debugging checklist

## Practical
Build an interactive profile with:
1. Profile information
2. FAQ accordion
3. Random quote generator
4. Theme toggle
5. Dynamic skill rendering

## How to Run
Open `index.html` in a browser. For the best debugging experience, use VS Code with Live Server or any local web server.

## Suggested Teaching Flow
1. Inspect the DOM tree in DevTools.
2. Demonstrate parentElement and children.
3. Demonstrate closest() from a nested button.
4. Trace event targets with closest().
5. Separate data, logic, and rendering in `app.js`.
6. Modify classes and attributes.
7. Add/render dynamic content.
8. Use the debugging checklist.

## Folder Structure
- index.html
- styles.css
- app.js
- examples/
- questions/



Selection + Content + Attributes + Classes + Creation
SELECT
  ↓
CREATE
  ↓
CLASS
  ↓
CONTENT
  ↓
ATTRIBUTES
  ↓
APPEND
