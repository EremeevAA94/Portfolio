function handleFormSubmit() {
  //e.preventDefault();

  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const releaseYear = document.getElementById("releaseYear").value;
  const isWatched = document.getElementById("isWatched").checked;

  const film = {
    title: title,
    genre: genre,
    releaseYear: releaseYear,
    isWatched: isWatched,
  };
  addFilm(film);
}

async function addFilm(film) {
  await fetch("https://sb-film.skillbox.cc/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: "painandgainn7@gmail.com",
    },
    body: JSON.stringify(film),
  });

  document.getElementById("title").value = '';
  document.getElementById("genre").value = '';
  document.getElementById("releaseYear").value = '';
  document.getElementById("isWatched").checked = false;

  renderTable();
}

async function renderTable() {
  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "painandgainn7@gmail.com",
    },
  });
  const films = await filmsResponse.json();

  const filmTableBody = document.getElementById("film-tbody");

  filmTableBody.innerHTML = "";

  films.forEach((film, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td><button id='deleteBtn'>Удалить</button></td>
    `;
    filmTableBody.appendChild(row);
  });
  filterReset()
  addDeleteButtons()
}

document.getElementById("film-form").addEventListener("submit", (e) => {
  e.preventDefault()
  validate() && handleFormSubmit()
});

renderTable();


// ------------------------------------------------

function addDeleteButtons () {
  let deleteBtn = document.querySelectorAll('#deleteBtn');
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', async () => {
      const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
        headers: {
          email: "painandgainn7@gmail.com",
        },
      });
      const films = await filmsResponse.json();
      deleteFilm(films[i].id);
    })   
  }
  async function deleteFilm (id) {
    await fetch(`https://sb-film.skillbox.cc/films/${id}`, {
      method: 'DELETE',
      headers: {
        email: 'painandgainn7@gmail.com'
      }
    })
    renderTable();
  }
}

// -------------------------------------------------

let deleteAllBtn = document.querySelector('#deleteAllBtn');
deleteAllBtn.addEventListener('click', async () => {
  await fetch(`https://sb-film.skillbox.cc/films`, {
    method: 'DELETE',
    headers: {
      email: 'painandgainn7@gmail.com'
    }
  })
  renderTable();
});

//---------------------------------------------------

let filterForm = document.querySelector('#filterForm');
let filterTitle = document.querySelector('#filterTitle');
let filterGenre = document.querySelector('#filterGenre');
let filterReleaseYear = document.querySelector('#filterReleaseYear');
let filterIsWatched = document.querySelector('#filterIsWatched');
let filmTbody = document.querySelector('#film-tbody');

function filterFunc () {
  for (let el of filmTbody.children) {
    (!filterTitle.value || el.children[0].textContent.includes(filterTitle.value)) &&
      (!filterGenre.value || el.children[1].textContent.includes(filterGenre.value)) &&
        (!filterReleaseYear.value || el.children[2].textContent.includes(filterReleaseYear.value)) &&
          (filterIsWatched.value === 'all' || el.children[3].textContent === (filterIsWatched.value==='watched' ? 'Да' : 'Нет')) ?
            el.style.display = 'table-row' : el.style.display = 'none';
  }
}

function filterReset() {
  filterTitle.value = '', filterGenre.value = '', filterReleaseYear.value = '', filterIsWatched.value = 'all';
};

filterIsWatched.addEventListener('change', () => {filterFunc()});
filterForm.addEventListener('keyup', () => {filterFunc()});

// -----------------------------------

function validate () {
  let specPattern = ['`', '~', '@', '#', '$', '^', '*', '{', '}'];
  let numPattern = [1,2,3,4,5,6,7,8,9,0];

  function check (pattern, target) {for (let el of pattern) {if (target.includes(el)) return true}};

  if (check(specPattern, document.getElementById("title").value)) {
    setValidationMessage ();
    return false;
  } else if (check(specPattern, document.getElementById("genre").value)) { 
    setValidationMessage ();
    return false;
  } else if (check(numPattern, document.getElementById("genre").value)) {
    setValidationMessage ();
    return false;
  } else if (typeof +document.getElementById("releaseYear").value !== 'number') {
    setValidationMessage ();
    return false;
  } else if (document.getElementById("releaseYear").value.length !== 4) {
    setValidationMessage ();
    return false;
  } else {

    return true;
  }

  function setValidationMessage () {
    let ul = document.createElement('ul');
    ul.style.color = 'red';
    ul.innerHTML = `<li>В поле "Название" не допускаются спецсимволы</li>
                    <li>В поле "Жанр" не допускаются спецсимволы и цифры</li>
                    <li>В поле "Год" не допускаются спецсимволы и буквы</li>
                    <li>Поле "Год" должно быть в четырёхзначном формате</li>`;
    let filmForm = document.querySelector('#film-form');
    filmForm.append(ul);
    setTimeout(() => {
      filmForm.removeChild(ul)
    }, 7000)
  }
}