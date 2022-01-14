let allBooks = [];

const addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click", addBook);

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.info = function() {
        let isRead = "not read yet";
        if (this.read) {
            isRead = "read";
        }
        return `${this.title} by ${this.author}, ${numPages} pages, ${isRead}`;
    }
}

function addBook() {
    // Take user's input and store Book into array

    // Step 1 create a div
    const formBox = document.createElement("div");
    formBox.classList.add("form-box");

    const mainPage = document.querySelector(".main-page");
    mainPage.classList.add("blur");
    
    document.body.appendChild(formBox);

    const form = document.querySelector(".form-box");

    const formTitle = document.createElement("h2");
    formTitle.textContent = "Add a new book";
    formTitle.classList.add("form-title");
    form.appendChild(formTitle);
}
