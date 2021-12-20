/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
let allTascs = [];
let valueInput = '';
let input = null;

window.onload = function init() {
  input = document.getElementById('add-task');
  input.addEventListener('change', updateValue);
};

onClickButton = () => {
  allTascs.push({
    text: valueInput,
    isCheck: false,
  });
  valueInput = '';
  input.value = '';
  render();
};

updateValue = (event) => {
  valueInput = event.target.value;
};
render = () => {
  const content = document.getElementById('wrapper');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allTascs.map((item, index) => {
    const container = document.createElement('div');
    container.className = 'task-container';
    container.id = `task-${index};`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.isCheck;
    checkbox.onclick = function () {
      onChangeChekbox(index);
    };
    container.appendChild(checkbox);
    const text = document.createElement('p');
    text.innerText = item.text;
    text.className = item.isCheck ? 'text-task done-text' : 'text-task';

    // ЕДАКТИРОВАНИЕ ЗАДАЧИ
    // Ищем задачу
    const letsFindTask = (e) => {
      const taskText = e.target.closest('div').querySelector('.text-task').textContent;
      const findTasc = allTascs.find((el) => el.text === taskText);
      const taskIndex = allTascs.indexOf(findTasc);
      return taskIndex;
    };

    const imageEdit = document.createElement('img');// добавляем изображение
    imageEdit.src = 'images/edit.png';// прописываем путь до изображения
    container.appendChild(imageEdit);// добавляем дочерний элемент изображение

    // обработчик
    imageEdit.addEventListener('click', (e) => {
      taskIndex = letsFindTask(e);
      if (taskIndex !== -1) {
        e.target.closest('div').querySelector('.text-task').innerHTML = `
                <form class="form">
                <input class="input"></input>
                </form>`;
      }
      const input = document.querySelector('.input');
      input.value = allTascs[taskIndex].text;
      const form = document.querySelector('.form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.remove();
        allTascs[taskIndex.text = input.value];
        render();
      });

      const imageCheck = document.createElement('img');// добавляем изображение
      imageCheck.src = 'images/check.png';// прописываем путь до изображения
      container.appendChild(imageCheck);// добавляем дочерний элемент изображение
      imageCheck.className = 'img_check';
    });

    const imageDel = document.createElement('img');

    // удаление задачи
    imageDel.onclick = () => {
      // eslint-disable-next-line no-use-before-define
      deleteTask(index);
    };

    imageDel.src = 'images/cross.png';

    container.appendChild(imageDel);
    container.appendChild(text);
    content.appendChild(container);
  });
};

onChangeChekbox = (index) => {
  allTascs[index].isCheck = !allTascs[index].isCheck;
  console.log('allTascs', allTascs);
  render();
};

// функция для удаления задачи
const deleteTask = (ind) => {
  allTascs = allTascs.filter((value, index) => index !== ind);
  render();
};
