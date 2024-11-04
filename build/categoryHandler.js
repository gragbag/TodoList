"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAddCategoryButton = setupAddCategoryButton;
const maxCategories = 10;
let currentCategories = 1;
const addCategoryButton = document.querySelector(".add-category");
const addCategoryDialog = document.querySelector("#category-dialog");
const addCategoryForm = document.querySelector("#category-form");
const closeDialogButton = document.querySelector("#close-category-dialog");
const editCategoryDialog = document.querySelector("#edit-category");
const editCategoryForm = document.querySelector("#category-edit-form");
const deleteCategoryDialog = document.querySelector("#confirm-delete");
const deleteCategoryForm = document.querySelector("#delete-form");
function setupAddCategoryButton() {
    addCategoryButton.addEventListener("click", () => {
        addCategoryDialog.showModal();
    });
    addCategoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addCategoryDialog.close();
        const category = document.querySelector("#name");
        addCategory(category.value);
        addCategoryForm.reset();
    });
    addCategoryDialog.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
        }
    });
    closeDialogButton.addEventListener("click", (e) => {
        e.preventDefault();
        addCategoryDialog.close();
    });
    editCategoryDialog.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
        }
    });
}
function addCategory(categoryName) {
    if (currentCategories == maxCategories) {
        return;
    }
    const categories = document.querySelector(".categories");
    const category = document.createElement("div");
    category.className = "category";
    const categoryTitle = document.createElement("button");
    categoryTitle.className = "category-name";
    categoryTitle.innerText = categoryName;
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    addEditFunction(editButton);
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    addDeleteFunction(deleteButton);
    category.append(categoryTitle, editButton, deleteButton);
    categories.appendChild(category);
    currentCategories++;
}
function addEditFunction(editButton) {
    editButton.addEventListener("click", (e) => {
        editCategoryDialog.showModal();
        editCategoryForm.addEventListener("submit", function changeName(e) {
            e.preventDefault();
            editCategoryDialog.close();
            editCategoryForm.removeEventListener("submit", changeName);
            const submittedButton = e.submitter;
            if (submittedButton.value === "close") {
                editCategoryForm.reset();
                return;
            }
            const input = document.querySelector("#new-name");
            const newName = input.value;
            if (newName) {
                const parent = editButton.parentElement;
                if (parent) {
                    const oldName = parent.children[0];
                    oldName.innerText = newName;
                }
            }
            editCategoryForm.reset();
        });
    });
}
function addDeleteFunction(deleteButton) {
    deleteButton.addEventListener("click", (e) => {
        deleteCategoryDialog.showModal();
        deleteCategoryForm.addEventListener("submit", function confirmDelete(e) {
            e.preventDefault();
            const submittedButton = e.submitter;
            if (submittedButton && submittedButton.value === "confirm") {
                const parent = deleteButton.parentElement;
                parent === null || parent === void 0 ? void 0 : parent.remove();
                currentCategories--;
            }
            deleteCategoryForm.removeEventListener("submit", confirmDelete);
            deleteCategoryDialog.close();
        });
    });
}
