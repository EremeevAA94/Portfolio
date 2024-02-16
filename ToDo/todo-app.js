(function () {

      // Вернёт оглавление страницы

  function createAppTitle (title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }


      // Вернёт форму 

  function createTodoItemForm () {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-controll');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    if (!input.value) {
      button.setAttribute('disabled', 'disabled');
    } 

    return {
      form,
      input,
      button, 
    }
  }

      // Вернёт пустой список

  function createTodoList () {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  } 

      // Вернет li с указанным name

  function createTodoItem (name) {
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
        item,
        doneButton,
        deleteButton
    }
  }


        // Подгрузит на страницу форму

  function createTodoApp (container, title, listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.input.addEventListener('input', function () {
      if (!todoItemForm.input.value) {
        todoItemForm.button.setAttribute('disabled', 'disabled');
      } else {
        todoItemForm.button.removeAttribute('disabled');
      }
    })

    let arrOfItems = [];

        // Подгрузка списка дел из localStorage
 
    if (!(JSON.parse(localStorage.getItem(listName)) === null  || JSON.parse(localStorage.getItem(listName)) == 0)) {

      function formListFromLocalStorage (page) {
          for (item of localStorageGetData(page)) {
            let todoItem = createTodoItem(item.name);

            let itemObj = {
              id: arrOfItems.length,
              name: item.name,
              done: false
            }
            if (item.done === true) { 
              itemObj.done = true;
              todoItem.item.classList.toggle('list-group-item-success');
            }
            arrOfItems.push(itemObj);

            function getId() {
              for (let i = 0; i < todoList.children.length; i++) {
                if (todoList.children[i] == todoItem.item) return i;
              }
            }

            todoItem.doneButton.addEventListener('click', function () {
              todoItem.item.classList.toggle('list-group-item-success');
              arrOfItems[getId()].done = true;
              localStorageSetData(page);
            });

            todoItem.deleteButton.addEventListener('click', function () {
              if (confirm('Вы уверены?')) {
                arrOfItems.splice(getId(), 1);
    
                (function sortId () {
                  let newId = 0;
                  for (item of arrOfItems) {
                    item.id = newId;
                    newId++
                  }
                })()
    
                todoItem.item.remove();
              }
              localStorageSetData(page);
            });
            todoList.append(todoItem.item);
          }
      }
      formListFromLocalStorage(listName);
    }

          // Функции localStorage

    function localStorageSetData (name) {                     
      localStorage.setItem(name, JSON.stringify(arrOfItems));
    }

    function localStorageGetData (name) {               
      return JSON.parse(localStorage.getItem(name));
    }

          // Создаёт и подгружает li, обнуляет input формы

    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();

      todoItemForm.button.setAttribute('disabled', 'disabled');

      let todoItem = createTodoItem(todoItemForm.input.value);

      let itemObj = {
        id: arrOfItems.length,
        name: todoItemForm.input.value,
        done: false
      }
      arrOfItems.push(itemObj);

      function getId() {
        for (let i = 0; i < todoList.children.length; i++) {
          if (todoList.children[i] == todoItem.item) return i;
        }
      }

          // Кнопка "Готово"

      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
        arrOfItems[getId()].done = true;
        localStorageSetData(listName);
      });

        // Кнопка "Удалить"

      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          arrOfItems.splice(getId(), 1);
          (function sortId () {
            let newId = 0;
            for (item of arrOfItems) {
              item.id = newId;
              newId++
            }
          })()
          todoItem.item.remove();
        }
        localStorageSetData(listName);
      });

      todoList.append(todoItem.item);
      localStorageSetData(listName);
      todoItemForm.input.value = '';
    })
  }

  window.createTodoApp = createTodoApp;

})()