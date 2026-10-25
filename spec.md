# Daylist: short project specification

## Purpose
Help a user manage a simple daily task list without creating an account.

## Core functions
Add a trimmed, non-empty task (up to 150 characters); edit task names with save and cancel; toggle completion; delete individual tasks; filter all/active/completed; clear completed tasks; show the remaining count and helpful empty states.

## Technical design
Static HTML, CSS, and vanilla JavaScript. A task is an object with a title string and done boolean. Tasks live in an array and are persisted as JSON in localStorage under marvin-daylist-tasks-v1. DOM elements are created with createElement; task text uses textContent. No external services, dependencies, or secrets.

## User interface
A calm green and cream layout, responsive task form, task list, filter controls, accessible status text, visible focus styles, and reduced-motion support.

## Acceptance criteria
Adding, editing, cancelling edits, completing, reopening, filtering, deleting, and clearing tasks update the UI and count correctly. Refresh restores saved data. Whitespace-only tasks are rejected. Invalid storage data does not crash the app. At small screen widths, controls remain usable. Keyboard users can operate the form, checkboxes, and buttons.

## Hosting and scope
Deploy on GitHub Pages from main, root folder. No backend, account system, reminders, or cross-device syncing.
