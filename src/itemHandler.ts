
const addItemButton = document.querySelector(".add-item") as HTMLButtonElement;
const addItemDialog = document.querySelector("#item-dialog") as HTMLDialogElement;
const addItemForm = document.querySelector("#item-form") as HTMLFormElement;
const closeForm = document.querySelector("#close-item-dialog") as HTMLButtonElement;

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

		console.log(priority);

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

	const deleteButton = document.createElement("button");
	deleteButton.className = "delete";
	deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`

	itemButtons.append(expandButton, editButton, deleteButton);
	todoItem.append(title, desc, date, prio, itemButtons);
	list.appendChild(todoItem);
}

export {setupAddItems}