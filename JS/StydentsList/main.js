
                // PAGE

document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'start';
document.body.style.paddingTop = '40px';
document.body.style.fontFamily = 'Arial, sans-serif';

let formWrapper = document.querySelector(".form-wrapper");
formWrapper.style.border = '8px solid #389E28'
formWrapper.style.width = '25%';
formWrapper.style.borderRadius = '30px';
formWrapper.style.marginRight = '30px';
formWrapper.style.padding = '6px';

const form = document.getElementById('form');
form.style.display = 'flex';
form.style.flexDirection = 'column';
form.style.alignItems = 'center';

let lable = document.querySelectorAll('label');
for (i of lable) {
    i.style.fontSize = '1.3rem';
    i.style.lineHeight = '1.5';
    i.style.display = 'flex';
    i.style.flexDirection = 'column';
    i.style.alignItems = 'center';
    i.style.cursor = 'pointer';
    i.style.width = '70%'
}

lable[5].style.paddingBottom = '15px';
lable[10].style.paddingBottom = '15px';
document.querySelector('.submit_label').style.marginBottom = '30px'

let input = document.querySelectorAll('input');
for (i of input) {
  i.style.fontSize = '1.1rem';
  i.style.appearance = 'none';
  i.style.width = '100%';
  i.style.border = '2px solid #2C9B8C';
  i.style.borderRadius = '10px';
  i.style.textIndent = '7px';
}

input[5].style.backgroundColor = 'red'

let facultyWrapper = document.getElementById('faculty_wrapper');
facultyWrapper.style.display = 'flex';
facultyWrapper.style.flexDirection = 'column';
facultyWrapper.style.alignItems = 'center'
facultyWrapper.style.width = '100%';

let faculty = document.getElementById('faculty');
faculty.style.border = 'none';
faculty.style.backgroundColor = 'transparent';
faculty.style.color = '#35B957';
faculty.style.cursor = 'pointer';
faculty.style.borderBottom = '1px dashed #35B957'
faculty.style.borderRadius = '0';
faculty.style.marginBottom = '10px';

let submit = document.getElementById('submit');
submit.style.cursor = 'pointer';
submit.style.border = '3px solid #35B957';
submit.style.borderRadius = '20px'
submit.style.boxSizing = 'border-box';
submit.style.padding = '5px';
submit.style.backgroundColor = 'transparent';
submit.style.color = '#35B957'
submit.style.fontSize = '1.3rem';
submit.style.fontWeight = '500';

let variant = document.getElementsByClassName('variant');
for (let i = 0; i < variant.length; i++) {
  variant[i].style.border = '1px solid #B9A556';
  variant[i].style.borderRadius = '0'
  variant[i].style.backgroundColor = 'transparent';
  variant[i].style.marginBottom = '6px';
  variant[i].style.cursor = 'pointer';
  variant[i].style.display = 'none';

  variant[i].addEventListener ('click', function () {
    faculty.setAttribute('value', variant[i].getAttribute('value'));
    for (let i of variant) i.style.display = 'none';
  });
}

faculty.addEventListener('click', function () {
  for (let i of variant) i.style.display = 'block';
});

const tableList = document.getElementById('table_list');

const studentsList = [
  {surname: 'Чан', name: 'Джеки', patronymic: 'Эдуардович', birthday: '1954-04-07', stydyYear: 2023, faculty: 'Phisical education'},
  {surname: 'Шварцнегер', name: 'Арнольд', patronymic: 'Ринатович', birthday: '1947-07-30', stydyYear: 2001, faculty: 'Acting'},
  {surname: 'Хэттфилд', name: 'Джеймс', patronymic: 'Юрьевич', birthday: '1963-08-03', stydyYear: 2004, faculty: 'Metallurgy'},
  {surname: 'Кларк', name: 'Айзек', patronymic: 'Евгеньевич', birthday: '1988-10-12', stydyYear: 2008, faculty: 'Engineering'},
  {surname: 'Филипс', name: 'Тревор', patronymic: 'Аркадиевич', birthday: '1975-04-25', stydyYear: 2005, faculty: 'Flying'},
  {surname: 'Чан', name: 'Арнольд', patronymic: 'Аркадиевич', birthday: '1963-08-03', stydyYear: 2008, faculty: 'Flying'},
];

            // ФОРМА РЕГИСТРАЦИИ НОВОГО СТУДЕНТА

document.getElementById('birthday').setAttribute('max', currentDate());
document.getElementById('stydyYear').setAttribute('max', currentYear());

let warning = document.createElement('span');
warning.innerText = 'В выделенных красным графах, могли быть допущены ошибки: \n 1. Содержат цифры или спецсимволы \n 2. Содержат пробелы (допустимо применение дефиса)';
warning.style.fontSize = '0.9rem';
warning.style.marginBottom = '15px';
warning.style.color = '#A60D0D'

form.addEventListener('submit', function (e) {
  e.preventDefault();

  function createNewStudent () {

    if (isValidText(document.getElementById('surname').value) === false) document.getElementById('surname').style.border = '2px solid #2C9B8C' 
    else {
      document.getElementById('surname').style.border = '4px solid red';
      document.querySelector('.submit_label').prepend(warning)
      createNewStudent ();
    }

    if (isValidText(document.getElementById('name').value) === false) document.getElementById('name').style.border = '2px solid #2C9B8C';
    else {
      document.getElementById('name').style.border = '4px solid red';
      document.querySelector('.submit_label').prepend(warning)
      createNewStudent ();
    }

    if (isValidText(document.getElementById('patronymic').value) === false) document.getElementById('patronymic').style.border = '2px solid #2C9B8C';
    else {
      document.getElementById('patronymic').style.border = '4px solid red';
      document.querySelector('.submit_label').prepend(warning)
      createNewStudent ();
    }

    let studentObj = {
      surname: corectInitials(document.getElementById('surname').value),
      name: corectInitials(document.getElementById('name').value),
      patronymic: corectInitials(document.getElementById('patronymic').value),
      birthday: document.getElementById('birthday').value,
      stydyYear: +document.getElementById('stydyYear').value,
      faculty: document.getElementById('faculty').value
    }

    document.getElementById('surname').value = '';
    document.getElementById('name').value = '';
    document.getElementById('patronymic').value = '';
    document.getElementById('birthday').value = '';
    document.getElementById('stydyYear').value = '';
    document.getElementById('faculty').value = '';

    return studentObj;
  };

  warning.remove();
  studentsList.push(createNewStudent());
  faculty.setAttribute('value', 'Metallurgy')
  clearSearchAndFilter();
  renderStudentsTable(studentsList);
});


        // ВАЛИДАЦИЯ, КОРРЕКТИРОВКИ И ДАТЫ

function currentDate() {
  return new Date().toISOString().split("T")[0];
}

function currentYear () {
  return +(new Date().toISOString().split("-")[0]);
}

function currentMonth () {
  return +(new Date().toISOString().split("-")[1]);
}

function currentDay () {
  return +(new Date().toISOString().split("-")[2].split("T")[0]);
}

function isValidText(text) {
  return /[^A-Za-zА-Яа-яЁё\-]/.test(text)   // true == false!!!
}

function corectInitials (initial) {
  if (initial.split('-').length == 2) newName = initial.split('-')[0].substring(0, 1).toUpperCase() + initial.split('-')[0].substring(1).toLowerCase() + '-' + initial.split('-')[1].substring(0, 1).toUpperCase() + initial.split('-')[1].substring(1).toLowerCase();
  else newName = initial.substring(0, 1).toUpperCase() + initial.substring(1).toLowerCase();
  return newName;
}


        // ТАБЛИЦА (СТИЛИ)

let tableWrapper = document.querySelector(".table-wrapper");
tableWrapper.style.border = '8px solid #35C0CD'
tableWrapper.style.width = '65%';
tableWrapper.style.minHeight = '480px';
tableWrapper.style.borderRadius = '30px';
tableWrapper.style.padding = '6px';
tableWrapper.style.boxSizing = 'border-box';
tableWrapper.style.textAlign = 'center';

document.querySelector('#search_title').style.fontSize = '1.3rem';
document.querySelector('#search_title').style.display = 'block';
document.querySelector('#search_title').style.fontWeight = '700';
document.querySelector('#search_title').style.padding = '8px 0';
document.querySelector('#search_title').style.borderBottom = '2px solid #B9A556';

let searchForm = document.querySelector('#search_form');
searchForm.style.display = 'flex';
searchForm.style.justifyContent = 'space-between';
searchForm.style.borderBottom = '2px solid #B9A556';
searchForm.style.marginBottom = '30px';
searchForm.style.padding = '0 20px';

let searchLabel = document.querySelectorAll('.search_label');
for (i of searchLabel) {
  i.style.fontSize = '0.9rem';
  i.style.appearance = 'none';
  i.style.paddingRight = '15px';
  i.style.width = '100%';
}

let searchInput = document.querySelectorAll('.search_input');
for (i of searchInput) {
  i.style.backgroundColor = '#E5FFFF';
}

let searchText = document.getElementById('search_text');

let facultySearchWrapper = document.getElementById('faculty_search_wrapper');
facultySearchWrapper.style.display = 'flex';
facultySearchWrapper.style.flexDirection = 'column';
facultySearchWrapper.style.alignItems = 'center'

let searchFaculty = document.getElementById('search_faculty');
searchFaculty.style.cursor = 'pointer';
searchFaculty.style.marginBottom = '5px';
searchFaculty.style.width = '100%';

let searchBirthday = document.getElementById('search_birthday');

let searchStydyYear = document.getElementById('search_stydyYear');

let searchReset = document.querySelector('.search_reset');
searchReset.style.height = 'fit-content';
searchReset.style.marginTop = '1.3rem';
searchReset.style.width = 'fit-content';
searchReset.style.backgroundColor = '#FFCEC8';
searchReset.style.cursor = 'pointer';

let searchFacultyVariant = document.getElementsByClassName('search_faculty_variant');
for (let i = 0; i < searchFacultyVariant.length; i++) {
  searchFacultyVariant[i].style.border = '1px solid #B9A556';
  searchFacultyVariant[i].style.backgroundColor = 'transparent';
  searchFacultyVariant[i].style.marginBottom = '6px';
  searchFacultyVariant[i].style.cursor = 'pointer';
  searchFacultyVariant[i].style.display = 'none';
}



        // СОБЫТИЯ ФОРМЫ ПОИСКА И СОРТИРОВКИ

searchFaculty.addEventListener('click', function () {
  for (let i of searchFacultyVariant) i.style.display = 'block';
});

for (let i = 0; i < searchFacultyVariant.length; i++) {
  searchFacultyVariant[i].addEventListener ('click', function () {
    searchFaculty.setAttribute('value', searchFacultyVariant[i].getAttribute('value'));
    for (let i of searchFacultyVariant) i.style.display = 'none';
  });
}

function clearSearchAndFilter () {
  searchText.value = '';
  searchFaculty.value = 'Любой';
  searchBirthday.value = '';
  searchStydyYear.value = '';
}

searchReset.addEventListener('click', function () {
  clearSearchAndFilter();
  renderStudentsTable(studentsList);
});

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();

  (function searchResult () {

    let searchArr = [];

    if (searchText.value !== '') findInitials();
    if (searchFaculty.value !== 'Любой') findFaculty();
    if (searchBirthday.value !== '') findBirthday();
    if (searchStydyYear.value !== '') findStydyYear();

    function findInitials () {
      for (let i = 0; i < studentsList.length; i++) {
        if (studentsList[i].surname.includes(searchText.value)) searchArr.push(studentsList[i]);
        else if (studentsList[i].name.includes(searchText.value)) searchArr.push(studentsList[i]);
        else if (studentsList[i].patronymic.includes(searchText.value)) searchArr.push(studentsList[i]);
      }
    }

    function findFaculty () {
      if (searchArr != 0) searchArr = searchArr.filter((element) => element.faculty == searchFaculty.value);
      else searchArr = studentsList.filter((element) => element.faculty == searchFaculty.value);
    }

    function findBirthday() {
      if (searchArr != 0) searchArr = searchArr.filter((element) => element.birthday == searchBirthday.value);
      else searchArr = studentsList.filter((element) => element.birthday == searchBirthday.value);
    }

    function findStydyYear() {
      if (searchArr != 0) searchArr = searchArr.filter((element) => element.stydyYear == searchStydyYear.value);
      else searchArr = studentsList.filter((element) => element.stydyYear == searchStydyYear.value);
    }

    renderStudentsTable(searchArr);
  })();

});



            // ФИЛЬТРАЦИЯ ПО СТОЛБЦАМ (СТИЛИ)

document.getElementById('table_titles').style.display = 'flex';
document.getElementById('table_titles').style.flexWrap = 'nowrap';
document.getElementById('table_titles').style.justifyContent = 'space-between';
document.getElementById('table_titles').style.marginBottom = '5px';

let titleButtons = document.getElementsByClassName('title_buttons');
titleButtons[0].style.width = '35%';
titleButtons[1].style.width = '20%';
titleButtons[2].style.width = '22%';
titleButtons[3].style.width = '22%';
for (i of titleButtons) {
  i.style.appearance = 'none';
  i.style.color = 'white';
  i.style.border = '2px solid #B9A556';
  i.style.backgroundColor = '#B9A556';
  i.style.fontSize = '1.3rem';
  i.style.cursor = 'pointer';
}

            // ФИЛЬТРАЦИЯ ПО СТОЛБЦАМ (СОБЫТИЯ)

titleButtons[0].addEventListener ('click', function () {
  let newArr = [];
  for (let i of tableList.children) newArr.push(i.innerText.split(' ')[0]);
  newArr.sort();

  for (let i = newArr.length - 1; i > -1; i--) {
    let counter = 0;
    for (let j = counter; j < newArr.length; j++) {
      counter++
      if (tableList.children[j].innerText.split(' ')[0] === newArr[i]) tableList.prepend(tableList.children[j])
    }
  }
});

titleButtons[1].addEventListener ('click', function () {
  let newArr = [];
  for (let i of tableList.children) newArr.push(i.innerText.split('\n')[1]);
  newArr.sort();

  for (let i = newArr.length - 1; i > -1; i--) {
    let counter = 0;
    for (let j = counter; j < newArr.length; j++) {
      counter++
      if (tableList.children[j].innerText.split('\n')[1] === newArr[i]) tableList.prepend(tableList.children[j])
    }
  }
});

titleButtons[2].addEventListener ('click', function () {
  let newArr = [];
  for (let i of tableList.children) newArr.push(i.innerText.split('\n')[2].split('.')[2]);
  newArr.sort();

  for (let i = newArr.length - 1; i > -1; i--) {
    let counter = 0;
    for (let j = counter; j < newArr.length; j++) {
      counter++
      if (tableList.children[j].innerText.split('\n')[2].split('.')[2] === newArr[i]) tableList.prepend(tableList.children[j])
    }
  }
});

titleButtons[3].addEventListener ('click', function () {
  let newArr = [];
  for (let i of tableList.children) newArr.push(i.innerText.split('\n')[3].split('-')[0]);
  newArr.sort();

  for (let i = newArr.length - 1; i > -1; i--) {
    let counter = 0;
    for (let j = counter; j < newArr.length; j++) {
      counter++
      if (tableList.children[j].innerText.split('\n')[3].split('-')[0] === newArr[i]) tableList.prepend(tableList.children[j])
    }
  }
});



         // Отрисовка таблицы со студентами

function renderStudentsTable(arr) {  
  clearTable();
  if (arr.length != 0) {
    for (let i = 0; i < arr.length; i++) {
      getStudentItem(arr[i]);
    }
  }
}
renderStudentsTable(studentsList);



          // Формирование строки студента в таблице

function getStudentItem (obj) {
  let rowWrapper = document.createElement('div');
  rowWrapper.style.display = 'flex';
  rowWrapper.style.alignItems = 'center';
  rowWrapper.style.flexWrap = 'nowrap';
  rowWrapper.style.marginBottom = '10px';
  
  let inicials = document.createElement('span');
  inicials.style.display = 'block';
  inicials.style.fontSize = '1.2rem'
  inicials.style.width = '35%';
  inicials.style.borderRight = '4px solid #B9A556';
  inicials.innerText = `${obj.surname} ${obj.name} ${obj.patronymic}`;

  let faculty = document.createElement('span');
  faculty.style.display = 'block';
  faculty.style.fontSize = '1.2rem'
  faculty.style.width = '20%';
  faculty.style.borderRight = '4px solid #B9A556';
  faculty.innerText = `${obj.faculty}`;

  let birth = document.createElement('span');
  birth.style.display = 'block';
  birth.style.fontSize = '1.2rem'
  birth.style.width = '22%';
  birth.style.borderRight = '4px solid #B9A556';
  birth.innerText = `${obj.birthday.split('-')[2]}.${obj.birthday.split('-')[1]}.${obj.birthday.split('-')[0]} (${getStudentAge()})`;

  function getStudentAge () {
    let age = currentYear() - +obj.birthday.split('-')[0];
    let word;
    if (currentMonth() < +obj.birthday.split('-')[1] && currentDay() > +obj.birthday.split('-')[2]) age--;
    if (+(age.toString()[1]) == 1) word = ' год';
    else if (+(age.toString()[1]) < 5 && +(age.toString()[1]) > 0) word = ' года';
    else word = ' лет';
    return age + word;
  }

  let stydyYear = document.createElement('span');
  stydyYear.style.display = 'block';
  stydyYear.style.fontSize = '1.2rem'
  stydyYear.style.width = '22%';
  stydyYear.innerText = `${obj.stydyYear}-${obj.stydyYear + 4} (${whatCours()})`;

  function whatCours () {
    if (currentYear() > (obj.stydyYear + 4)) return 'Закончил'; 
    else if (currentYear() <= (obj.stydyYear + 4) && currentMonth() < 9) return ((obj.stydyYear + 4) - currentYear() -1) + ' курс';
    else if (currentYear() <= (obj.stydyYear + 4) && currentMonth() >= 9) return ((obj.stydyYear + 4) - currentYear()) + ' курс';
  }

  tableList.append(rowWrapper);
  rowWrapper.append(inicials);
  rowWrapper.append(faculty);
  rowWrapper.append(birth);
  rowWrapper.append(stydyYear);
}


        //  ОБНУЛЯЕМ ПОЛЕ ТАБЛИЦЫ

function clearTable () {
  if (tableList.children.length > 0) {
    do {
      tableList.children[0].remove();
    } while (tableList.children.length > 0);
  }
}