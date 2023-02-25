"use strict";
const choice = document.querySelector('#choice');
const party = document.querySelector('#party');
// DATA - set in LocalStorage
fetch('../data/data.json')
    .then(res => res.json())
    .then((data) => {
    localStorage.setItem('memory-data', JSON.stringify(data));
});
// @ts-ignore
const data = JSON.parse(localStorage.getItem('memory-data'));
// CREATE - Select :
const selectEl = document.createElement('select');
selectEl.setAttribute('id', 'select-theme');
selectEl.setAttribute('name', 'thme');
data.theme.forEach((el) => {
    const option = document.createElement('option');
    option.setAttribute('value', `${el}`);
    option.innerText = `${el}`;
    selectEl.appendChild(option);
});
choice === null || choice === void 0 ? void 0 : choice.appendChild(selectEl);
// CREATE - Buttons for grid :
const divBtn = document.createElement('div');
divBtn.setAttribute('class', 'btn-grid-list');
for (let i = 4; i <= 6; i++) {
    const btn = document.createElement('button');
    btn.setAttribute('value', `${i}`);
    btn.classList.add('btn-grid');
    btn.classList.add(`btn-grid-${i}`);
    if (i === 4) {
        btn.classList.add('active');
    }
    const imgSvg = document.createElement('img');
    imgSvg.setAttribute('src', `./assets/4x${i}.svg`);
    imgSvg.setAttribute('alt', `Grille 4x${i}`);
    btn.append(imgSvg);
    divBtn.appendChild(btn);
}
;
choice === null || choice === void 0 ? void 0 : choice.appendChild(divBtn);
// Adapte les boutons du choix des grilles en fonction du select
disabledBtn(selectEl.value);
selectEl.addEventListener('change', function () {
    disabledBtn(this.value);
});
function disabledBtn(selectValue) {
    //@ts-ignore
    const grid = data.data[selectValue].grid;
    const array = grid.map((el) => {
        return el.replace('4x', '');
    });
    const btn6 = document.querySelector('.btn-grid-6');
    const btn5 = document.querySelector('.btn-grid-5');
    const btn4 = document.querySelector('.btn-grid-4');
    if (!array.includes('6')) {
        btn6 === null || btn6 === void 0 ? void 0 : btn6.classList.remove('active');
        btn6 === null || btn6 === void 0 ? void 0 : btn6.classList.add('disabled');
        btn4 === null || btn4 === void 0 ? void 0 : btn4.classList.remove('disabled');
        btn4 === null || btn4 === void 0 ? void 0 : btn4.classList.add('active');
    }
    else {
        btn6 === null || btn6 === void 0 ? void 0 : btn6.classList.remove('disabled');
    }
    ;
    if (!array.includes('5')) {
        btn5 === null || btn5 === void 0 ? void 0 : btn5.classList.remove('active');
        btn5 === null || btn5 === void 0 ? void 0 : btn5.classList.add('disabled');
        btn4 === null || btn4 === void 0 ? void 0 : btn4.classList.remove('disabled');
        btn4 === null || btn4 === void 0 ? void 0 : btn4.classList.add('active');
    }
    else {
        btn5 === null || btn5 === void 0 ? void 0 : btn5.classList.remove('disabled');
    }
    ;
}
;
// CREATE - Button PLAY
const btnPlay = document.createElement('button');
btnPlay.classList.add('btn-play');
btnPlay.innerText = 'PLAY';
choice === null || choice === void 0 ? void 0 : choice.appendChild(btnPlay);
// Action choice
const btns = document.querySelectorAll('.btn-grid');
btns.forEach((el) => {
    el.addEventListener('click', () => {
        var _a;
        if ((_a = el.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.includes('disabled')) {
            return;
        }
        btns.forEach((el) => {
            el.classList.remove('active');
        });
        el.classList.toggle('active');
    });
});
btnPlay.addEventListener('click', function () {
    const gridChoice = document.querySelector('.btn-grid.active');
    console.log(selectEl.value);
    console.log(gridChoice === null || gridChoice === void 0 ? void 0 : gridChoice.getAttribute('value'));
});
