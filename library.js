let library = [
  /*  new Book("The Hobbit", "by J.R.R. Tolkien", " 295 pages", "not read yet"), */
];
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  get getTitle() {
    return this.title;
  }
  set setTitle(name) {
    this.title = name;
  }
  get getRead() {
    return this.read ? 'read' : 'not read yet';
  }
  set setRead(arg) {
    console.log(arg);
    this.read = !arg;
  }
}

const tbate = new Book('tbate', 'turtle93', '???', false);
console.log(tbate);

const domStuff = (() => {
  const getInput = () => {
    const inputs = document.querySelectorAll('input');
    const input1 = inputs[0].value;
    const input2 = inputs[1].value;
    const input3 = inputs[2].value;
    const input4 = inputs[3].checked;
    return { input1, input2, input3, input4 };
  };
  const loadBooks = () => {
    const container = document.querySelector('.container');
    const form = document.querySelector('#input-form');
    for (let value in library) {
      const card = document.createElement('div');
      card.classList.add('card', 'crd-flx');
      for (let prop in library[value]) {
        const title = document.createElement('p');
        title.textContent = library[value][prop];
        card.appendChild(title);
      }
      const btn = document.createElement('button');
      btn.textContent = 'Change Status';
      card.id = value;
      btn.addEventListener('click', (event) => {
        event.target.setRead = event.target.setRead;
      });
      card.appendChild(btn);
      container.insertBefore(card, form);
    }
  };
  const pushClass = () => {
    const input = getInput();
    library.push(
      new Book(input.input1, input.input2, input.input3, input.input4)
    );
  };
  const addBook = () => {
    pushClass();
    const container = document.querySelector('.container');
    const form = document.querySelector('#input-form');
    const card = document.createElement('div');
    card.classList.add('card', 'crd-flx');
    card.id = `card-${library.length - 1}`;
    let inputs = library[library.length - 1];
    for (let value in inputs) {
      const title = document.createElement('p');
      title.textContent =
        inputs[value] !== inputs.read
          ? inputs[value]
          : inputs[value]
          ? 'read'
          : 'not read yet';
      card.appendChild(title);
    }
    const btn = document.createElement('button');
    btn.textContent = 'Change Status';
    btn.addEventListener('click', (event) => {
      console.log(event.target);
      library[event.target.id].setRead = library[event.target.id].read;
      let card = document.querySelectorAll(`#card-${event.target.id} p`)[3];
      card.textContent = library[event.target.id].getRead;
    });
    btn.id = library.length - 1;
    card.appendChild(btn);
    container.insertBefore(card, form);
  };
  return {
    loadBooks,
    addBook,
  };
})();
const btn = document.querySelector('form button');
btn.addEventListener('click', () => {
  domStuff.addBook();
});
domStuff.loadBooks();
