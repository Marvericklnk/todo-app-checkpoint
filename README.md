# Daylist — Todo App

A small task tracker by Marvin, created with ChatGPT/Codex using HTML, CSS, and plain JavaScript. No frameworks, backend, API keys, or installation required.

## Features
- Add tasks with a button or Enter.
- Mark tasks complete or active with a checkbox.
- Filter All, Active, and Completed tasks.
- Delete a task or clear completed tasks.
- Keep tasks after refreshing using localStorage.
- Responsive layout, keyboard controls, accessible labels, and live feedback.

## Run locally
Download the repository ZIP, extract it, and open index.html in your browser. Alternatively, open the folder in VS Code and use Live Server. Keep index.html, style.css, and script.js in the same folder.

## Files
- index.html: semantic page structure and task form.
- style.css: responsive styling.
- script.js: task interactions and browser storage.
- spec.md: short technical and functional specification.
- AI-PROMPT.md: prompt used to guide implementation.

## Deployment
GitHub Pages serves the main branch at the repository root. There is no build step. See the repository's Settings → Pages for the published URL.

## Test checklist
1. Add two tasks, including one with Enter.
2. Check and uncheck a task.
3. Check All, Active, and Completed filters.
4. Refresh and confirm tasks remain.
5. Delete a task, then clear completed tasks.
6. Submit whitespace only: no task should be created.
7. Check the layout on a narrow screen and navigate with the keyboard.

## Storage limitations
Tasks are stored in this browser only, not shared between devices. Clearing browser data removes them. If storage is blocked, a warning appears and tasks work for the current visit. There is no sign-in or cloud synchronization.
