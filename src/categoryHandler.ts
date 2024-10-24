const maxCategories = 10;
let currentCategories = 1;

const addCategoryButton = document.querySelector(".add-category") as HTMLButtonElement;
const addCategoryDialog = document.querySelector("#category-dialog") as HTMLDialogElement;
const addCategoryForm = document.querySelector("#category-form") as HTMLFormElement;
const closeDialogButton = document.querySelector("#close-category-dialog") as HTMLButtonElement;

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

	const category = document.createElement("button");
	category.innerText = categoryName;

	categories.appendChild(category);

	currentCategories++;
}



export {setupAddCategoryButton}