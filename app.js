"use strict";
const choice = document.querySelector('#choice');
const party = document.querySelector('#party');
const titleH1 = document.querySelector('#title_h1');
titleH1 === null || titleH1 === void 0 ? void 0 : titleH1.addEventListener('click', function () {
    console.log("test");
    location.reload();
});
// PARTY
const themeChoose = document.querySelector('.party-info-theme');
const score = document.querySelector('.party-info-score');
// ---------
const grid = document.querySelector('.party-grid');
let counter = 0;
let nbPair = 0;
let arrayLonger = 0;
let arrayGrid = [];
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
        btn5 === null || btn5 === void 0 ? void 0 : btn5.classList.remove('active');
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
        btn6 === null || btn6 === void 0 ? void 0 : btn6.classList.remove('active');
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
    // @ts-ignore
    nbPair = (4 * (gridChoice === null || gridChoice === void 0 ? void 0 : gridChoice.getAttribute('value'))) / 2;
    // @ts-ignore
    score === null || score === void 0 ? void 0 : score.innerHTML = `${counter} / ${nbPair}`;
    // @ts-ignore
    themeChoose === null || themeChoose === void 0 ? void 0 : themeChoose.innerHTML = selectEl.value;
    // @ts-ignore
    arrayLonger = 4 * (gridChoice === null || gridChoice === void 0 ? void 0 : gridChoice.getAttribute('value'));
    const arr = data.data[selectEl.value].card;
    const todel = arr.length - (arrayLonger / 2);
    arr.splice(arr.length - todel);
    grid === null || grid === void 0 ? void 0 : grid.classList.remove('grid-4');
    grid === null || grid === void 0 ? void 0 : grid.classList.remove('grid-5');
    grid === null || grid === void 0 ? void 0 : grid.classList.remove('grid-6');
    grid === null || grid === void 0 ? void 0 : grid.classList.add(`grid-${gridChoice === null || gridChoice === void 0 ? void 0 : gridChoice.getAttribute('value')}`);
    const dataUse = [...arr, ...arr];
    function buildGrid(arrayUse, theme) {
        if (arrayUse.length > 0) {
            const thisData = arrayUse;
            const random = Math.floor(Math.random() * ((thisData.length) - 0) + 0);
            const div = document.createElement('div');
            div.classList.add('card');
            div.setAttribute('value', `${thisData[random].value}`);
            const imgFront = document.createElement('img');
            imgFront.classList.add('front');
            imgFront.setAttribute('src', `./assets/${theme}/${thisData[random].img}`);
            imgFront.setAttribute('alt', `${thisData[random].value}`);
            div.appendChild(imgFront);
            const imgBack = document.createElement('img');
            imgBack.classList.add('back');
            imgBack.setAttribute('src', './assets/bg-game.jpg');
            imgBack.setAttribute('alt', 'dos de carte');
            div.appendChild(imgBack);
            grid === null || grid === void 0 ? void 0 : grid.appendChild(div);
            thisData.splice(random, 1);
            buildGrid(thisData, theme);
        }
        else {
            return;
        }
    }
    // Set card in grid
    buildGrid(dataUse, selectEl.value);
    // Toggle choice to show grid
    choice === null || choice === void 0 ? void 0 : choice.classList.remove('show');
    setTimeout(() => {
        choice === null || choice === void 0 ? void 0 : choice.classList.add('hide');
        party === null || party === void 0 ? void 0 : party.classList.remove('hide');
        setTimeout(() => {
            party === null || party === void 0 ? void 0 : party.classList.add('show');
        }, 100);
    }, 600);
    //---GAME---PLAY------------------------------------------------------------------//
    const timer = document.querySelector('.party-info-timer');
    let timeMin = '00';
    let timeSec = '00';
    let time = 0;
    let timerPlayer;
    let allTime;
    timerPlayer = setInterval(function () {
        time++;
        timeMin = Math.floor(time / 60) > 9 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
        timeSec = time % 60 > 9 ? time % 60 : `0${time % 60}`;
        allTime = `${timeMin}:${timeSec}`;
        //@ts-ignore
        timer === null || timer === void 0 ? void 0 : timer.innerHTML = allTime;
    }, 1000);
    let value1 = 'none';
    let value2 = 'none';
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((el) => {
        el.addEventListener('click', function () {
            el.classList.add('choose');
            if (value1 != 'none') {
                // @ts-ignore
                value2 = el.getAttribute('value');
            }
            else {
                // @ts-ignore
                value1 = el.getAttribute('value');
            }
            // Check if is pair
            if (value1 != 'none' && value2 != 'none') {
                allCards.forEach(el => {
                    el.classList.add('temporary-display');
                });
                if (value1 === value2) {
                    // @ts-ignore
                    counter += 1;
                    value1 = 'none';
                    value2 = 'none';
                    const allChoose = document.querySelectorAll('.choose');
                    setTimeout(() => {
                        allChoose.forEach(el => {
                            el.classList.remove('card');
                            el.classList.remove('choose');
                            el.classList.add('alreadychoose');
                            el.setAttribute('disabled', 'true');
                            // @ts-ignore
                            score === null || score === void 0 ? void 0 : score.innerHTML = `${counter} / ${nbPair}`;
                        });
                        allCards.forEach(el => {
                            el.classList.remove('temporary-display');
                        });
                    }, 400);
                }
                else {
                    value1 = 'none';
                    value2 = 'none';
                    setTimeout(() => {
                        allCards.forEach(el => {
                            el.classList.remove('choose');
                            el.classList.remove('temporary-display');
                        });
                    }, 1400);
                }
            }
            // Check si partie terminé
            if (counter === nbPair && nbPair != 0) {
                setTimeout(() => {
                    // @ts-ignore
                    clearInterval(timerPlayer);
                    window.alert(`Bravo ! Tu as gagné en ${allTime.split(':')[0]}min & ${allTime.split(':')[1]}sec !`);
                    location.reload();
                }, 600);
            }
        });
    });
});
