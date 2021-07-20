let library = [
  /*  new Book("The Hobbit", "by J.R.R. Tolkien", " 295 pages", "not read yet"), */
];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "read" : "have not read yet";
}

function getForm() {
  return document.getElementsByTagName("form")[0];
}

function qq() {
  getForm().style.display = "none";
}
getInputs = () => {
  return document.getElementsByTagName("input");
};
addBookToLibrary = () => {
  getForm().style.display = "block";
};
window.onclick = (event) => {
  if (event.target == getForm()) getForm().style.display = "none";
};
displayBooks = () => {
  var table = document.createElement("table");
  var tblBody = document.createElement("tbody");
  let r = document.createElement("tr");
  let keys = Object.keys(library[0]);
  for (var j = 0; j < keys.length; j++) {
    var cell = document.createElement("td");
    var cellText = document.createTextNode(`${keys[j]}`);
    cell.appendChild(cellText);
    r.appendChild(cell);
  }
  tblBody.appendChild(r);

  for (let objectValue in library) {
    let row = document.createElement("tr");
    let button = document.createElement("button");
    let buttonChange = document.createElement("button");
    for (let value of Object.values(library[objectValue])) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(`${value}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    button.setAttribute("id", objectValue);
    button.onclick = function () {
      removeBook(event);
    };
    button.appendChild(document.createTextNode("remove"));
    row.appendChild(button);
    buttonChange.setAttribute("id", objectValue);
    buttonChange.onclick = function () {
      library[objectValue].changeRead();
      let table = document.getElementsByTagName("table");
      table[table.length - 1].style.display = "none";
      displayBooks();
    };
    buttonChange.appendChild(document.createTextNode("change read status"));
    row.appendChild(buttonChange);
    tblBody.appendChild(row);
  }
  table.appendChild(tblBody);
  document.getElementById("shelf").appendChild(table);
  table.setAttribute("border", "2");
  localStorage.setItem("book", JSON.stringify(library));
};
addBook = () => {
  library.push(
    new Book(
      getInputs()[0].value,
      getInputs()[1].value,
      getInputs()[2].value,
      getInputs()[3].checked
    )
  );
  qq();
  let table = document.getElementsByTagName("table");
  table[table.length - 1].style.display = "none";
  displayBooks();
  /* getForm().reset(); */
};
removeBook = (event) => {
  let table = document.getElementsByTagName("table");
  table[table.length - 1].style.display = "none";
  library.splice(event.explicitOriginalTarget.id, 1);
  displayBooks();
};

Book.prototype.changeRead = function () {
  this.read = this.read == "read" ? "not read yet" : "read";
};

let data = JSON.parse(localStorage.getItem("book"));
for (let a in data) {
  library.push(
    new Book(data[a].title, data[a].author, data[a].pages, data[a].read)
  );
}
saveToLocal = () => {
  localStorage.setItem("book", JSON.stringify(library));
};
