import { compareAsc, format } from "date-fns"; 

const addItemButton = document.querySelector(".add-item") as HTMLButtonElement;
const addItemDialog = document.querySelector("#item-dialog") as HTMLDialogElement;
const addItemForm = document.querySelector("#item-form") as HTMLFormElement;
const closeForm = document.querySelector("#close-item-dialog") as HTMLButtonElement;
const editItemDialog = document.querySelector("#edit-item-dialog") as HTMLDialogElement;
const editItemForm = document.querySelector("#edit-item-form") as HTMLFormElement;

const itemList: Item[] = [];

class Item {
	title: string;
	description: string;
	duedate: string;
	priority: string;

	constructor(title: string, description: string, duedate: string, priority: string) {
		this.title = title;
		this.description = description;
		this.duedate = duedate;
		this.priority = priority;
	}
}

function setupAddItems() {
	addItemButton.addEventListener("click", () => {
		addItemDialog.showModal();
	})

	addItemForm.addEventListener("submit", (e) => {
		e.preventDefault();
		addItemDialog.close();
		
		const title = document.querySelector("#title") as HTMLInputElement;
		const description = document.querySelector("#description") as HTMLInputElement;
		const duedate = document.querySelector("#duedate") as HTMLInputElement;
		const priority = document.querySelector("#priority") as HTMLInputElement;

		const newItem = new Item(title.value, description.value, duedate.value, priority.value);
		itemList.push(newItem);
		displayItem(newItem);
	})

	closeForm.addEventListener("click", (e) => {
		e.preventDefault();
		addItemDialog.close();
	})
}

function displayItem(item: Item) {
	const list = document.querySelector(".list") as HTMLDivElement;

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
	expandButton.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`

	const editButton = document.createElement("button");
	editButton.className = "edit";
	editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
	addEditFunction(editButton);

	const deleteButton = document.createElement("button");
	deleteButton.className = "delete";
	deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`

	itemButtons.append(expandButton, editButton, deleteButton);
	todoItem.append(title, desc, date, prio, itemButtons);
	list.appendChild(todoItem);
}

function addEditFunction(editButton: HTMLButtonElement) {
	editButton.addEventListener("click", (e) => {
		const parent = editButton.parentElement?.parentElement;

		if (!parent) {
			return;
		}

		const title = parent.querySelector(".title") as HTMLHeadingElement;
		const description = parent.querySelector(".desc") as HTMLParagraphElement;
		const duedate = parent.querySelector(".target-date") as HTMLParagraphElement;
		const priority = parent.querySelector(".priority") as HTMLParagraphElement;

		const editTitle = document.querySelector("#new-title") as HTMLInputElement;
		const editDescription = document.querySelector("#new-description") as HTMLInputElement;
		const editDuedate = document.querySelector("#new-duedate") as HTMLInputElement;
		const editPriority = document.querySelector("#new-priority") as HTMLSelectElement;

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
			
		})

	})
}

export {setupAddItems}