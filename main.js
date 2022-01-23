let allBooks = [];

function Book(title, author, genre, numPages) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.numPages = numPages;
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

function displayAllBooks() {
    const allBooksArea = document.querySelector(".book-area");
    removeAllChildNodes(allBooksArea);

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
        bookCover.addEventListener("click", function(e) {
            if (!book.hasOwnProperty("info")) {
                book.info = true;
            } else {
                book.info = !book.info;
            }
        });
        bookCover.bookTitle = book.title;
        bookCover.addEventListener("click", displayBookInfo);
        bookHolder.appendChild(bookCover);

        // const author = document.createElement("div");
        // author.textContent = book.author;
        // bookHolder.appendChild(author);
        // allBooksArea.appendChild(bookHolder);

        // allBooksArea.appendChild(bookHolder);

        const bottomArea = document.createElement("div");
        bottomArea.classList.add("bottom-area")

        const readCircle = document.createElement("div");
        readCircle.classList.add("read-circle");
        bottomArea.appendChild(readCircle);

        const author = document.createElement("div");
        author.textContent = book.author;
        bottomArea.appendChild(author);

        const optionsIcon = document.createElement("div");
        optionsIcon.classList.add("options-icon");

        for (let i = 0; i < 3; i++) {
            const smallDot = document.createElement("div");
            smallDot.classList.add("small-dot");
            optionsIcon.appendChild(smallDot);
        }
        bottomArea.appendChild(optionsIcon);

        bookHolder.appendChild(bottomArea);
        allBooksArea.appendChild(bookHolder);
    });
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

        // I want to instead make a popup on a 3 dot selector
        // const optionsArea = document.createElement("div");
        // const readCheck = document.createElement("button");
        // readCheck.textContent = "Read";
        // //readCheck.addEventListener("click", )
        // const removeBook = document.createElement("button");
        // removeBook.textContent = "Remove"
        // optionsArea.appendChild(readCheck);
        // optionsArea.appendChild(removeBook);
        // optionsArea.classList.add("options-area");

        // bookCover.appendChild(infoArea);
        // bookCover.appendChild(optionsArea);

    } else {
        bookCover.classList.toggle("active");
        removeAllChildNodes(bookCover);
        bookCover.textContent = book.title;
    }
}