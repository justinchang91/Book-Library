let allBooks = [];

function Book(title, author, genre, numPages) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.numPages = numPages;
    this.read = false;  // Automatically have every new book be unread
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

    e.preventDefault();  // Don't actually submit anything

    let book = new Book(title, author, genre, pages);
    allBooks.unshift(book);
    console.log(allBooks);
    displayAllBooks();
    
    clearTextBoxes();
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
    bottomArea.classList.add("bottom-area")
    // Read status circle
    const readCircle = document.createElement("div");
    readCircle.classList.add("read-circle");
    // Add functionality that check's the book objects read status
    bottomArea.appendChild(readCircle);

    // Author name
    const author = document.createElement("div");
    author.textContent = book.author;
    bottomArea.appendChild(author);

    // The 3 dots options menu
    const optionsIcon = document.createElement("div");
    optionsIcon.classList.add("options-icon");

    for (let i = 0; i < 3; i++) {
        const smallDot = document.createElement("div");
        smallDot.classList.add("small-dot");
        optionsIcon.appendChild(smallDot);
    }

    optionsIcon.addEventListener("click", function(e){
        loadOptions(e, book);
    });
    bottomArea.appendChild(optionsIcon);
}

function loadOptions(e, book) {
    const optionsMenu = document.querySelector(".options-menu");
    if (e.clientX > 1600) {
        optionsMenu.style.top = `${e.clientY}px`;
        optionsMenu.style.left = `${e.clientX-205}px`
    } else {
        optionsMenu.style.top = `${e.clientY}px`;
        optionsMenu.style.left = `${e.clientX+10}px`
    }

    optionsMenu.classList.toggle("active");
    highlightHoveredOptions();  // Make options get highlighted when mouseOver

    // Need to find out which book was clicked.

    // Add the functionality for each option here.
    document.querySelector(".read").addEventListener("click", function(e){
        markAsRead(e, book);
    });
    
}

function highlightHoveredOptions() {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(option => {
        option.addEventListener("mouseenter", function(e) {
            option.style.backgroundColor = "rgb(41, 54, 76)"
        });
        option.addEventListener("mouseout", function(e) {
            option.style.removeProperty("background-color");
        });
    });
}

function markAsRead(e, book) {
    // Wrong. This marks the first book with forest green
    // Need to edit the actual book object's attribute.
    // 1. Get a reference to actual book object
    // 2. Find out which book was clicked
    console.log(book);

    // Set the book object's read status
    if (!book.hasOwnProperty("read")) {
        book.read = true;
    } else {
        book.read = !book.read;
    }

    // Set the book's DOM element read status
    const readStatus = document.querySelector(".read-circle");
    readStatus.style["background-color"] = "forestgreen";

    // Need to also find a way for the options menu to say either mark as read 
    // or mark as unread depending on the book's read value.
    // Close the optionsMenu
    const optionsMenu = document.querySelector(".options-menu");
    optionsMenu.classList.toggle("active");
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

let usedColours = [];
let colours = ["dodgerblue", "crimson", "limegreen", "chocolate", "mediumaquamarine", 
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

function displayBookInfo(e) {
    const bookCover = e.target;
    const bookTitle = e.target.bookTitle;
    let book = allBooks.find(book => book.title === bookTitle);
    console.log(book);
    console.log(allBooks);

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