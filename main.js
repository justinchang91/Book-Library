let allBooks = [];

// function Book(title, author, genre, numPages) {
//     this.title = title;
//     this.author = author;
//     this.genre = genre;
//     this.numPages = numPages;
//     this.read = false;  // Automatically have every new book be unread
// }

class Book {

    constructor(title, author, genre, numPages) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.numPages = numPages;
        this.read = false;
    }
}

let greetingMessage = document.querySelector(".greeting-message");
const date = new Date();
const time = date.getHours();
if (time < 12) {
    greetingMessage.textContent = "Good morning, Justin";
} else if (time < 18) {
    greetingMessage.textContent = "Good afternoon, Justin";
} else {
    greetingMessage.textContent = "Good evening, Justin";
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

const form = document.querySelector(".form-input");
form.addEventListener("submit", submitBook);

function submitBook(e) {
    let title = form.elements["title"].value;
    let author = form.elements["author"].value;
    let genre = form.elements["genre"].value;
    let pages = form.elements["numPages"].value;

    e.preventDefault();  // Don't actually submit anything

    let book = new Book(title, author, genre, pages);
    allBooks.unshift(book);
    displayAllBooks();
    
    clearTextBoxes();
    document.querySelector(".form-input").reset();
    addBook(); // Toggle off the form 
}

function clearTextBoxes() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("numPages").value = "";
}

function displayAllBooks() {
    const allBooksArea = document.querySelector(".book-area");
    removeAllChildNodes(allBooksArea);

    allBooks.forEach(book => {
        const bookHolder = document.createElement("div");
        bookHolder.classList.add("book-holder");

        const bookCover = document.createElement("div");
        editBookCoverInfo(bookCover, book);
        bookHolder.appendChild(bookCover);

        const bottomArea = document.createElement("div");
        editBottomInfoOfBook(bottomArea, book);
        bookHolder.appendChild(bottomArea);

        allBooksArea.appendChild(bookHolder);
    });

    console.log(allBooks);
}

function editBookCoverInfo(bookCover, book) {
    bookCover.classList.add("book");
    if (!book.hasOwnProperty("colour")) {
        book.colour = setBookCoverColour();
    } 
    bookCover.style.backgroundColor = book.colour;
    bookCover.textContent = book.title;
    bookCover.addEventListener("click", function(e) {
        if (!book.hasOwnProperty("info")) {
            book.info = true;
        } else {
            book.info = !book.info;
        }
    });
    bookCover.bookTitle = book.title;
    bookCover.addEventListener("click", displayBookInfo);
}

function editBottomInfoOfBook(bottomArea, book) {
    bottomArea.classList.add("bottom-area");
    
    // Author name
    const author = document.createElement("div");
    author.textContent = book.author;
    bottomArea.appendChild(author);

    // Options
    const optionsRow = document.createElement("div");
    optionsRow.classList.add("options-row");

    // Read button
    const readButton = document.createElement("div");
    readButton.classList.add("read-button");
    if (book.read) {
        readButton.textContent = "Read";
        readButton.classList.add("active");
    } else {
        readButton.textContent = "Unread";
    }

    readButton.addEventListener("click", function() {
        changeReadStatus(allBooks.indexOf(book));
    });

    optionsRow.appendChild(readButton);

    // The delete button
    const deleteButton = document.createElement("div");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Remove";

    deleteButton.addEventListener("click", function() {
        deleteBook(allBooks.indexOf(book));
    });
    optionsRow.appendChild(deleteButton);

    bottomArea.appendChild(optionsRow);
}

function changeReadStatus(bookIndex) {
    allBooks[bookIndex].read = !allBooks[bookIndex].read;
    displayAllBooks();
}

function deleteBook(bookIndex) {
    allBooks.splice(bookIndex, 1);
    displayAllBooks();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

let usedColours = [];
let colours = ["dodgerblue", "crimson", "red", "tomato", "limegreen", "darkorange", "saddlebrown",
                    "blueviolet", "black", "mediumvioletred", "deepskyblue", "deeppink", "hotpink",
                    "orangered", "mediumslateblue", "olivedrab", "yellowgreen", "steelblue", "violet"];

function setBookCoverColour() {
    if (colours.length == 0) {
        colours = usedColours;
        usedColours = [];
    }

    let colour = colours[Math.floor(Math.random() * colours.length)];
    usedColours.push(colour);
    let deleteIndex = colours.findIndex(desiredColour => desiredColour == colour);
    colours.splice(deleteIndex, 1);
    return colour;
}

function displayBookInfo(e) {
    const bookCover = e.target;
    const bookTitle = e.target.bookTitle;
    let book = allBooks.find(book => book.title === bookTitle);

    if (book.info === true) {
        bookCover.classList.toggle("active");
        bookCover.textContent = "";

        const infoArea = document.createElement("div");
        const genre = document.createElement("div");
        genre.textContent = `Genre: ${book.genre}`;
        const numPages = document.createElement("div");
        numPages.textContent = `Pages: ${book.numPages}`;
        infoArea.appendChild(genre);
        infoArea.appendChild(numPages);
        infoArea.classList.add("info-area");
        bookCover.appendChild(infoArea);

    } else {
        bookCover.classList.toggle("active");
        removeAllChildNodes(bookCover);
        bookCover.textContent = book.title;
    }
}