"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAddItems = setupAddItems;
const addItemButton = document.querySelector(".add-item");
const addItemDialog = document.querySelector("#item-dialog");
const addItemForm = document.querySelector("#item-form");
const closeForm = document.querySelector("#close-item-dialog");
const editItemDialog = document.querySelector("#edit-item-dialog");
const editItemForm = document.querySelector("#edit-item-form");
const itemList = [];
class Item {
    constructor(title, description, duedate, priority) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
    }
}
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
        const priority = document.querySelector("#priority");
        const newItem = new Item(title.value, description.value, duedate.value, priority.value);
        itemList.push(newItem);
        displayItem(newItem);
    });
    closeForm.addEventListener("click", (e) => {
        e.preventDefault();
        addItemDialog.close();
    });
}
function displayItem(item) {
    const list = document.querySelector(".list");
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.dataset.index = String(itemList.length - 1);
    const title = document.createElement("h2");
    title.innerText = item.title;
    title.className = "title";
    const desc = document.createElement("p");
    desc.innerText = item.description;
    desc.className = "desc";
    const date = document.createElement("p");
    date.innerText = item.duedate;
    date.className = "target-date";
    const prio = document.createElement("p");
    prio.innerText = item.priority;
    prio.className = "priority";
    const itemButtons = document.createElement("div");
    itemButtons.className = "item-buttons";
    const expandButton = document.createElement("button");
    expandButton.className = "expand";
    expandButton.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    addEditFunction(editButton);
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    itemButtons.append(expandButton, editButton, deleteButton);
    todoItem.append(title, desc, date, prio, itemButtons);
    list.appendChild(todoItem);
}
function addEditFunction(editButton) {
    editButton.addEventListener("click", (e) => {
        var _a;
        const parent = (_a = editButton.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (!parent) {
            return;
        }
        const title = parent.querySelector(".title");
        const description = parent.querySelector(".desc");
        const duedate = parent.querySelector(".target-date");
        const priority = parent.querySelector(".priority");
        const editTitle = document.querySelector("#new-title");
        const editDescription = document.querySelector("#new-description");
        const editDuedate = document.querySelector("#new-duedate");
        const editPriority = document.querySelector("#new-priority");
        editTitle.value = title.innerText;
        editDescription.value = description.innerText;
        editDuedate.value = duedate.innerText;
        editPriority.value = priority.innerText;
        editItemDialog.showModal();
        editItemForm.addEventListener("submit", function edit(e) {
            e.preventDefault();
            title.innerText = editTitle.value;
            description.innerText = editDescription.value;
            duedate.innerText = editDuedate.value;
            priority.innerText = editPriority.value;
            const parentIndex = parent.dataset.index;
            if (parentIndex) {
                const itemIndex = parseInt(parentIndex);
                const item = itemList[itemIndex];
                item.title = editTitle.value;
                item.description = editDescription.value;
                item.duedate = editDuedate.value;
                item.priority = editPriority.value;
            }
            editItemDialog.close();
            editItemForm.reset();
            editItemForm.removeEventListener("submit", edit);
        });
    });
}
