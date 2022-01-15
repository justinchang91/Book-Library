let allBooks = [];

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

const addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click", addBook);

const cancelBtn = document.querySelector(".cancel");
cancelBtn.addEventListener("click", addBook);

function addBook() {
    const mainPage = document.querySelector(".main-page");
    mainPage.classList.toggle("active");

    const form = document.querySelector(".form-box");
    form.classList.toggle("active");
}
