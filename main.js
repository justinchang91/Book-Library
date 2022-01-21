let allBooks = [];

function Book(title, author, genre, numPages) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.numPages = numPages;
    /*this.info = function() {
        let isRead = "not read yet";
        if (this.read) {
            isRead = "read";
        }
        return `${this.title} by ${this.author}, ${numPages} pages, ${isRead}`;
    }*/
}



const addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click", addBook);

const cancelBtn = document.querySelector(".cancel");
cancelBtn.addEventListener("click", addBook);

function addBook() {
    console.log(allBooks);
    const mainPage = document.querySelector(".main-page");
    mainPage.classList.toggle("active");

    const form = document.querySelector(".form-box");
    form.classList.toggle("active");
}

const form = document.querySelector(".form-input");
form.addEventListener("submit", submitBook);

function submitBook(e) {
    let title = form.elements["title"].value;
    let author = form.elements["author"].value;
    let genre = form.elements["genre"].value;
    let pages = form.elements["numPages"].value;

    e.preventDefault();

    let book = new Book(title, author, genre, pages);
    allBooks.unshift(book);
    console.log(allBooks);
    displayAllBooks();
    
    clearTextBoxes();
    addBook();
}

function clearTextBoxes() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("numPages").value = "";
}

function addBookToScreen() {
    const allBooksArea = document.querySelector(".book-area");
    const bookCover = document.createElement("div");
    bookCover.classList.add("book");
    bookCover.textContent = allBooks[0].title;  // Get most recent book
    allBooksArea.appendChild(bookCover);
}

function displayAllBooks() {
    const allBooksArea = document.querySelector(".book-area");
    removeAllChildNotes(allBooksArea);

    allBooks.forEach(book => {
        const bookHolder = document.createElement("div");
        bookHolder.classList.add("book-holder");

        const bookCover = document.createElement("div");
        bookCover.classList.add("book");
        if (!book.hasOwnProperty("colour")) {
            book.colour = setBookCoverColour();
        } 
        bookCover.style.backgroundColor = book.colour;
        bookCover.textContent = book.title;
        bookHolder.appendChild(bookCover);

        const author = document.createElement("div");
        author.textContent = book.author;
        bookHolder.appendChild(author);
        allBooksArea.appendChild(bookHolder);
    });
}

function removeAllChildNotes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

let usedColours = [];
let colours = ["dodgerblue", "crimson", "chartreuse", "chocolate", "cornflowerblue", "deeppink", 
                    "blueviolet", "black", "mediumvioletred", "darkviolet"];

function setBookCoverColour() {
    if (colours.length == 0) {
        colours = usedColours;
        usedColours = [];
    }

    let colour = colours[Math.floor(Math.random() * colours.length)];
    usedColours.push(colour);
    let deleteIndex = colours.findIndex(desiredColour => desiredColour == colour);
    console.log("Before: " + colours);
    colours.splice(deleteIndex, 1);
    console.log("After: " + colours);
    return colour;
}