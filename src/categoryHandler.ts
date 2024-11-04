const maxCategories = 10;
let currentCategories = 1;

const addCategoryButton = document.querySelector(".add-category") as HTMLButtonElement;
const addCategoryDialog = document.querySelector("#category-dialog") as HTMLDialogElement;
const addCategoryForm = document.querySelector("#category-form") as HTMLFormElement;
const closeDialogButton = document.querySelector("#close-category-dialog") as HTMLButtonElement;
const editCategoryDialog = document.querySelector("#edit-category") as HTMLDialogElement;
const editCategoryForm = document.querySelector("#category-edit-form") as HTMLFormElement;
const deleteCategoryDialog = document.querySelector("#confirm-delete") as HTMLDialogElement;
const deleteCategoryForm = document.querySelector("#delete-form") as HTMLFormElement;

function setupAddCategoryButton() {
	addCategoryButton.addEventListener("click", () => {
		addCategoryDialog.showModal();
	})
	
	addCategoryForm.addEventListener("submit", (e) => {
		e.preventDefault();
		addCategoryDialog.close();
		const category = document.querySelector("#name") as HTMLInputElement;
		addCategory(category.value);
		addCategoryForm.reset();
	})
	
	closeDialogButton.addEventListener("click", (e) => {
		e.preventDefault();
		addCategoryDialog.close();
	})

}

function addCategory(categoryName: string) {

	if (currentCategories == maxCategories) {
		return;
	}

	const categories = document.querySelector(".categories") as HTMLDivElement;

	const category = document.createElement("div");
	category.className = "category";

	const categoryTitle = document.createElement("button");
	categoryTitle.className = "category-name"
	categoryTitle.innerText = categoryName;

	const editButton = document.createElement("button");
	editButton.className = "edit";
	editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
	addEditFunction(editButton);

	const deleteButton = document.createElement("button");
	deleteButton.className = "delete";
	deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
	addDeleteFunction(deleteButton);

	category.append(categoryTitle, editButton, deleteButton);
	categories.appendChild(category);

	currentCategories++;
}

function addEditFunction(editButton: HTMLButtonElement) {
	editButton.addEventListener("click", (e) => {
		editCategoryDialog.showModal();

		editCategoryForm.addEventListener("submit", function changeName(e) {
			e.preventDefault();
			editCategoryDialog.close();

			const input = document.querySelector("#new-name") as HTMLInputElement;
			const newName: string = input.value; 

			if (newName) {
				const parent = editButton.parentElement;
				if (parent) {
					const oldName = parent.children[0] as HTMLButtonElement;
					oldName.innerText = newName;
				}
			}
			

			editCategoryForm.removeEventListener("submit", changeName);
			editCategoryForm.reset();
		});

	})
}

function addDeleteFunction(deleteButton: HTMLButtonElement) {
	
	deleteButton.addEventListener("click", (e) => {
		deleteCategoryDialog.showModal();

		deleteCategoryForm.addEventListener("submit", function confirmDelete(e) {
			e.preventDefault();
			console.log(e.submitter);
			const submittedButton = e.submitter as HTMLButtonElement;

			if (submittedButton && submittedButton.value === "confirm") {
				const parent = deleteButton.parentElement;
				parent?.remove();
				currentCategories--;
			}

			deleteCategoryForm.removeEventListener("submit", confirmDelete);
			deleteCategoryDialog.close();
		})
	})

	
}



export {setupAddCategoryButton}