"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAddCategoryButton = setupAddCategoryButton;
const maxCategories = 10;
let currentCategories = 1;
const addCategoryButton = document.querySelector(".add-category");
const addCategoryDialog = document.querySelector("#category-dialog");
const addCategoryForm = document.querySelector("#category-form");
const closeDialogButton = document.querySelector("#close-category-dialog");
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
    closeDialogButton.addEventListener("click", (e) => {
        e.preventDefault();
        addCategoryDialog.close();
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
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    category.append(categoryTitle, editButton, deleteButton);
    categories.appendChild(category);
    currentCategories++;
}
