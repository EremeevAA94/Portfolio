// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(dificulty) {
  let count = 1;
  let arr = [];
  
  do {
    arr.push(count);
    arr.push(count);
    count++
  } while (count < dificulty + 1);
    
  return arr;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
  let shuffledArr = [];
  let oldArr = [...arr];

  for (let i = 0; i < arr.length; i++) {
    let random = Math.floor(Math.random() * oldArr.length);
    shuffledArr.push(oldArr[random]);
    oldArr.splice(random, 1);
  }

  return shuffledArr;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

        // General

document.body.style.fontFamily = 'Arial, sans-serif'
document.body.style.backgroundColor = '#FFE3B6';
document.body.style.padding = '10vw';
document.body.style.margin = '0';
document.body.style.display = 'flex';
document.body.style.alignItems = 'center';
document.body.style.flexDirection = 'column';

let clicks = [{value1: null, value2: null}];
let endGameCount = 0;


        // Стартовый POPUP с выбором сложности

(function startGame() {
  const POPUP_WRAPPER = document.createElement('div');
  const POPUP = document.createElement('div');
  const POPUP_TITLE = document.createElement('p');
  POPUP_TITLE.innerText = 'Choose Dificulty';
  const BUTTON_WRAPPER = document.createElement('div');
  const EASY_BTN = document.createElement('button');
  EASY_BTN.innerText = 'Easy peasy (4x4)';
  const MEDIUM_BTN = document.createElement('button');
  MEDIUM_BTN.innerText = 'Medium 6x6'
  const HARD_BTN = document.createElement('button');
  HARD_BTN.innerText = 'Nightmare 8x8'

  POPUP_WRAPPER.style.height = "120vh";
  POPUP_WRAPPER.style.width = '100%';
  POPUP_WRAPPER.style.display = 'flex';
  POPUP_WRAPPER.style.justifyContent = 'center';
  POPUP_WRAPPER.style.paddingTop = '25vh'
  POPUP_WRAPPER.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  POPUP_WRAPPER.style.position = 'absolute';
  POPUP_WRAPPER.style.top = '0';

  POPUP.style.height = '30%';
  POPUP.style.width = '60%';
  POPUP.style.display = 'flex';
  POPUP.style.flexDirection = 'column';
  POPUP.style.alignItems = 'center';
  POPUP.style.backgroundColor = '#FFE3B6';
  POPUP.style.border = '10px solid rgba(0, 0, 0, 0.3)';
  POPUP.style.borderRadius = '20px';
  POPUP.style.opacity = '0.9';

  POPUP_TITLE.style.color = '#2B8B81';
  POPUP_TITLE.style.fontSize = '3vw';

  BUTTON_WRAPPER.style.display = 'flex';
  BUTTON_WRAPPER.style.width = '100%'
  BUTTON_WRAPPER.style.justifyContent = 'space-around';

  EASY_BTN.style.fontSize = '2vw';
  EASY_BTN.style.padding = '10px'
  EASY_BTN.style.cursor = 'pointer';
  EASY_BTN.style.appearance = 'none';
  EASY_BTN.style.color = '#469400';
  EASY_BTN.style.backgroundColor = 'transparent';
  EASY_BTN.style.border = '5px solid #469400'
  EASY_BTN.style.borderRadius = '10px';

  MEDIUM_BTN.style.fontSize = '2vw';
  MEDIUM_BTN.style.padding = '10px'
  MEDIUM_BTN.style.cursor = 'pointer';
  MEDIUM_BTN.style.appearance = 'none';
  MEDIUM_BTN.style.color = '#FFC700';
  MEDIUM_BTN.style.backgroundColor = 'transparent';
  MEDIUM_BTN.style.border = '5px solid #FFC700'
  MEDIUM_BTN.style.borderRadius = '10px';

  HARD_BTN.style.fontSize = '2vw';
  HARD_BTN.style.padding = '10px'
  HARD_BTN.style.cursor = 'pointer';
  HARD_BTN.style.appearance = 'none';
  HARD_BTN.style.color = '#FF3100';
  HARD_BTN.style.backgroundColor = 'transparent';
  HARD_BTN.style.border = '5px solid #FF3100'
  HARD_BTN.style.borderRadius = '10px';
  
  document.body.append(POPUP_WRAPPER);
  POPUP_WRAPPER.append(POPUP);
  POPUP.append(POPUP_TITLE);
  POPUP.append(BUTTON_WRAPPER);
  BUTTON_WRAPPER.append(EASY_BTN);
  BUTTON_WRAPPER.append(MEDIUM_BTN);
  BUTTON_WRAPPER.append(HARD_BTN);

  POPUP_WRAPPER.addEventListener('click', function () {
    POPUP.style.boxShadow = '0 0 10px 5px red';
  })

  EASY_BTN.addEventListener('click', function () {
    createField ();
    for (let i of shuffle(createNumbersArray(8))) createCard(i);
    for (let i of field.children) { 
      i.style.width = 'calc(25% - 4px)';
      i.style.fontSize = '7vw';
    }
    resetSpareMargins(3, 12, 15);
    POPUP_WRAPPER.remove();
  })

  MEDIUM_BTN.addEventListener('click', function () {
    createField ();
    for (let i of shuffle(createNumbersArray(18))) createCard(i); 
    for (let i of field.children) { 
      i.style.width = 'calc(16.55% - 4px)';
      i.style.fontSize = '4.5vw';
    }
    resetSpareMargins(5, 30, 35);
    POPUP_WRAPPER.remove();
  })

  HARD_BTN.addEventListener('click', function () {
    createField ();
    for (let i of shuffle(createNumbersArray(32))) createCard(i);
    for (let i of field.children) { 
      i.style.width = 'calc(12.25% - 4px)';
      i.style.fontSize = '3vw';
    }
    resetSpareMargins(7, 56, 63);
    POPUP_WRAPPER.remove();
  })
})()


          // Функция создания игрового поля
   
function createField () {
  const field = document.createElement('div');
  field.id = 'field';

  field.style.padding = '5px';
  field.style.marginBottom = '30px';
  field.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
  field.style.border = '10px solid rgba(0, 0, 0, 0.3)';
  field.style.borderRadius = '20px';
  field.style.width = '50%';
  field.style.display = 'flex';
  field.style.flexWrap = 'wrap';

  document.body.append(field);
}


          // Функция создания карточки

function createCard (innerNumber) {
  let card = document.createElement('div');

  card.style.margin = '0 5px 5px 0';
  card.style.boxSizing = 'border-box';
  card.style.backgroundColor = '#2B8B81'; 
  card.style.border = '5px solid #2B8B81';
  card.style.borderRadius = '20px';
  card.style.display = 'flex';
  card.style.justifyContent = 'center';
  card.style.alignItems = 'center';
  card.style.color = 'transparent';
  card.style.cursor = 'pointer';

  card.addEventListener ('mouseover', function () {
    card.style.outline = '4px solid white';
  })
  card.addEventListener ('mouseout', function () {
    card.style.outline = 'none';
  })

  card.addEventListener('click', function () {
    card.style.backgroundColor = '#69BAB1'
    card.style.color = 'white';
    card.style.pointerEvents = 'none';

    clicks[0].value1 === null ? clicks[0].value1 = card.innerText : clicks[0].value2 = card.innerText;

    if (clicks[0].value1 == clicks[0].value2) {
      setTimeout(() => {
        for (let i of field.children) {
          if (i.innerText == clicks[0].value1) i.style.visibility = 'hidden';
        }

        clicks = [{value1: null, value2: null}];
        endGameCount += 2;

        if (field.children.length == endGameCount) endGame();
      }, 200)
    } else if (clicks[0].value1 != clicks[0].value2 && clicks[0].value2 !== null) {
      setTimeout(() => {
        for (let i of field.children) {
          i.style.backgroundColor = '#2B8B81';
          i.style.color = 'transparent';
          i.style.pointerEvents = 'auto';
        }
        clicks = [{value1: null, value2: null}];
      }, 200)
    }
  })
  card.innerText = innerNumber;
  field.append(card);
}

function resetSpareMargins (right, bottom, last) {
  for (let i = right; i < field.children.length; i += (right + 1)) field.children[i].style.margin = '0 0 5px 0';
  for (let i = bottom; i < field.children.length; i++) field.children[i].style.margin = '0 5px 0 0';
  field.children[last].style.margin = '0';
}


          // Функция вызова кнопки в конце игры

function endGame () {
  const btnStartAgain = document.createElement('button');

  btnStartAgain.innerText = 'Сыграть ещё раз';
  btnStartAgain.style.fontSize = '4vw';
  btnStartAgain.style.appearance = 'none';
  btnStartAgain.style.color = '#00B358';
  btnStartAgain.style.border = '8px solid #00B358';
  btnStartAgain.style.borderRadius = '10px';
  btnStartAgain.style.backgroundColor = 'transparent';
  btnStartAgain.style.cursor = 'pointer';


  btnStartAgain.addEventListener ('click', function () {
    location.reload()
  })

  document.body.append(btnStartAgain);
}