"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAddItems = setupAddItems;
const addItemButton = document.querySelector(".add-item");
const addItemDialog = document.querySelector("#item-dialog");
const addItemForm = document.querySelector("#item-form");
const closeForm = document.querySelector("#close-item-dialog");
function setupAddItems() {
    addItemButton.addEventListener("click", () => {
        addItemDialog.showModal();
    });
    addItemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addItemDialog.close();
        const title = document.querySelector("#title");
        const description = document.querySelector("#description");
        const duedate = document.querySelector("#duedate");
        const priority = document.querySelector("#name");
        addItem(title.value, description.value, duedate.value, priority.value);
    });
    closeForm.addEventListener("click", (e) => {
        e.preventDefault();
        addItemDialog.close();
    });
}
function addItem(title, description, duedate, priority) {
    const list = document.querySelector(".list");
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    const titleElement = document.createElement("h2");
    titleElement.innerText = title;
    titleElement.className = "title";
    const desc = document.createElement("p");
    desc.innerText = description;
    desc.className = "desc";
    const date = document.createElement("p");
    date.innerText = duedate;
    date.className = "target-date";
    const prio = document.createElement("p");
    prio.innerText = priority;
    prio.className = "priority";
    todoItem.append(titleElement, desc, date, prio);
    list.appendChild(todoItem);
}
