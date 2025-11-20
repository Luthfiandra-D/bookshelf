const STORAGE_KEY = "BOOKSHELF_APPS";
let books = [];
let editingId = null;

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) books = JSON.parse(stored);
    renderBooks();
}

function renderBooks(filtered = null) {
    const incomplete = document.getElementById("incompleteBookList");
    const complete = document.getElementById("completeBookList");

    incomplete.innerHTML = "";
    complete.innerHTML = "";

    const list = filtered || books;

    list.forEach(book => {
        const item = document.createElement("div");
        item.dataset.bookid = book.id;
        item.setAttribute("data-testid", "bookItem");

        item.innerHTML = `
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>

        <div>
          <button data-testid="bookItemIsCompleteButton">
            ${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
          </button>
          <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          <button data-testid="bookItemEditButton">Edit Buku</button>
        </div>
      `;

        item.querySelector("[data-testid='bookItemIsCompleteButton']").onclick =
            () => toggleComplete(book.id);

        item.querySelector("[data-testid='bookItemDeleteButton']").onclick =
            () => deleteBook(book.id);

        item.querySelector("[data-testid='bookItemEditButton']").onclick =
            () => loadBookForEditing(book.id);

        if (book.isComplete) complete.appendChild(item);
        else incomplete.appendChild(item);
    });
}

document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("bookFormTitle").value.trim();
    const author = document.getElementById("bookFormAuthor").value.trim();
    const year = parseInt(document.getElementById("bookFormYear").value.trim());
    const isComplete = document.getElementById("bookFormIsComplete").checked;

    if (!title || !author || !year) {
        alert("Semua kolom harus diisi!");
        return;
    }

    if (editingId === null) {
        const newBook = {
            id: +new Date(),
            title,
            author,
            year,
            isComplete
        };
        books.push(newBook);
    } else {
        const book = books.find(b => b.id === editingId);
        book.title = title;
        book.author = author;
        book.year = year;
        book.isComplete = isComplete;
        editingId = null;

        const btn = document.getElementById("bookFormSubmit");
        btn.innerHTML = 'Masukkan Buku ke rak <span>Belum selesai dibaca</span>';
        btn.style.backgroundColor = "";
    }

    saveData();
    renderBooks();
    this.reset();
});


function toggleComplete(id) {
    const book = books.find(b => b.id === id);
    book.isComplete = !book.isComplete;

    saveData();
    renderBooks();
}


function deleteBook(id) {
    if (!confirm("Yakin hapus buku?")) return;

    books = books.filter(b => b.id !== id);

    saveData();
    renderBooks();
}

function loadBookForEditing(id) {
    const book = books.find(b => b.id === id);
    editingId = id;

    document.getElementById("bookFormTitle").value = book.title;
    document.getElementById("bookFormAuthor").value = book.author;
    document.getElementById("bookFormYear").value = book.year;
    document.getElementById("bookFormIsComplete").checked = book.isComplete;

    const btn = document.getElementById("bookFormSubmit");
    btn.innerHTML = "Update Buku";
    btn.style.backgroundColor = "#ff9800";
}


document.getElementById("searchBook").addEventListener("submit", function (e) {
    e.preventDefault();

    const q = document.getElementById("searchBookTitle").value
        .toLowerCase().trim();

    if (q === "") {
        renderBooks();
        return;
    }

    const result = books.filter(book =>
        book.title.toLowerCase().includes(q)
    );

    renderBooks(result);
});


document.addEventListener("DOMContentLoaded", loadData);
