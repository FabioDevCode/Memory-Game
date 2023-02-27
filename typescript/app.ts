const choice: Element|null = document.querySelector('#choice');
const party: Element|null = document.querySelector('#party');

// PARTY
const themeChoose: Element|null = document.querySelector('.party-info-theme');
const timer: Element|null = document.querySelector('.party-info-time');
const score: Element|null = document.querySelector('.party-info-score');
// ---------
const grid: Element|null = document.querySelector('.party-grid');

let counter: Number = 0;
let nbPair: Number = 0;

let arrayLonger = 0;
let arrayGrid = [];

// DATA - set in LocalStorage
fetch('../data/data.json')
.then(res => res.json())
.then((data): void => {
    localStorage.setItem('memory-data', JSON.stringify(data));
});

// @ts-ignore
const data = JSON.parse(localStorage.getItem('memory-data'));

// CREATE - Select :
const selectEl: HTMLSelectElement = document.createElement('select');
selectEl.setAttribute('id', 'select-theme');
selectEl.setAttribute('name', 'thme');
data.theme.forEach((el: String): void => {
    const option: HTMLOptionElement = document.createElement('option');
    option.setAttribute('value', `${el}`);
    option.innerText = `${el}`;

    selectEl.appendChild(option);
})
choice?.appendChild(selectEl);

// CREATE - Buttons for grid :
const divBtn: HTMLDivElement  = document.createElement('div');
divBtn.setAttribute('class', 'btn-grid-list');
for(let i: number = 4; i <= 6; i++) {
    const btn = document.createElement('button');
    btn.setAttribute('value', `${i}`);
    btn.classList.add('btn-grid');
    btn.classList.add(`btn-grid-${i}`);
    if(i === 4) {
        btn.classList.add('active');
    }

    const imgSvg: HTMLImageElement = document.createElement('img');
    imgSvg.setAttribute('src', `./assets/4x${i}.svg`);
    imgSvg.setAttribute('alt', `Grille 4x${i}`);

    btn.append(imgSvg);
    divBtn.appendChild(btn);
};
choice?.appendChild(divBtn);

// Adapte les boutons du choix des grilles en fonction du select
disabledBtn(selectEl.value);
selectEl.addEventListener('change', function(){
    disabledBtn(this.value);
});

function disabledBtn(selectValue: String): void {
    //@ts-ignore
    const grid = data.data[selectValue].grid;
    const array = grid.map((el: String) => {
        return el.replace('4x', '');
    })

    const btn6: Element|null = document.querySelector('.btn-grid-6');
    const btn5: Element|null = document.querySelector('.btn-grid-5');
    const btn4: Element|null = document.querySelector('.btn-grid-4');

    if(!array.includes('6')) {
        btn5?.classList.remove('active');
        btn6?.classList.remove('active');
        btn6?.classList.add('disabled');
        btn4?.classList.remove('disabled');
        btn4?.classList.add('active');
    } else {
        btn6?.classList.remove('disabled');
    };
    if(!array.includes('5')) {
        btn6?.classList.remove('active');
        btn5?.classList.remove('active');
        btn5?.classList.add('disabled');
        btn4?.classList.remove('disabled');
        btn4?.classList.add('active');
    } else {
        btn5?.classList.remove('disabled');
    };
};

// CREATE - Button PLAY
const btnPlay = document.createElement('button');
btnPlay.classList.add('btn-play');
btnPlay.innerText = 'PLAY';
choice?.appendChild(btnPlay);

// Action choice
const btns: NodeListOf<Element> = document.querySelectorAll('.btn-grid');

btns.forEach((el: Element): void => {
    el.addEventListener('click', (): void => {
        if(el.getAttribute('class')?.includes('disabled')) {
            return;
        }
        btns.forEach((el: Element): void => {
            el.classList.remove('active');
        });
        el.classList.toggle('active');
    });
});

btnPlay.addEventListener('click', function() {
    const gridChoice: Element|null = document.querySelector('.btn-grid.active');


    // @ts-ignore
    nbPair = (4 * gridChoice?.getAttribute('value'))/2;
    // @ts-ignore
    score?.innerHTML = `${counter} / ${nbPair}`;
    // @ts-ignore
    themeChoose?.innerHTML = selectEl.value;
    // @ts-ignore
    arrayLonger = 4 * gridChoice?.getAttribute('value');

    const arr = data.data[selectEl.value].card;
    const todel = arr.length - (arrayLonger/2);
    arr.splice(arr.length - todel)

    grid?.classList.remove('grid-4');
    grid?.classList.remove('grid-5');
    grid?.classList.remove('grid-6');
    grid?.classList.add(`grid-${gridChoice?.getAttribute('value')}`);

    const gridValue = gridChoice?.getAttribute('value');

    console.log("====================");
    console.log(arrayLonger);
    console.log(selectEl.value);
    console.log(gridValue);
    console.log("====================");

    const dataUse = [...arr, ...arr];
    console.log(dataUse);

    function buildGrid(arrayUse: {value: String, img: String}[], theme: String) {
        if(arrayUse.length > 0) {
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

            grid?.appendChild(div);

            thisData.splice(random, 1);

            buildGrid(thisData, theme);
        } else {
            return;
        }
    }

    // Set card in grid
    buildGrid(dataUse, selectEl.value);

    // Toggle choice to show grid
    choice?.classList.remove('show');
    setTimeout(() => {
        choice?.classList.add('hide');
        party?.classList.remove('hide');
        setTimeout(()=> {
            party?.classList.add('show');
        }, 100)
    }, 600);



    //---GAME---PLAY------------------------------------------------------------------//
    let value1: String = 'none';
    let value2: String = 'none';

    const allCards: NodeListOf<Element> = document.querySelectorAll(".card");

    allCards.forEach((el: Element): void => {
        el.addEventListener('click', function(){
            el.classList.add('choose');

            if(value1 != 'none') {
                // @ts-ignore
                value2 = el.getAttribute('value');
            } else {
                // @ts-ignore
                value1 = el.getAttribute('value');
            }

            // Check if is pair
            if(value1 != 'none' && value2 != 'none') {
                allCards.forEach(el => {
                    el.classList.add('temporary-display');
                });

                if(value1 === value2) {
                    // @ts-ignore
                    counter += 1;
                    value1 = 'none';
                    value2 = 'none';

                    const allChoose: NodeListOf<Element> = document.querySelectorAll('.choose');
                    setTimeout(() => {
                        allChoose.forEach(el => {
                            el.classList.remove('card');
                            el.classList.remove('choose');
                            el.classList.add('alreadychoose');
                            el.setAttribute('disabled', 'true');
                            // @ts-ignore
                            score?.innerHTML = `${counter} / ${nbPair}`;
                        });
                        allCards.forEach(el => {
                            el.classList.remove('temporary-display');
                        });
                    }, 400);
                } else {
                    value1 = 'none';
                    value2 = 'none';
                    setTimeout(() => {
                        allCards.forEach(el => {
                            el.classList.remove('choose');
                            el.classList.remove('temporary-display');
                        });
                    }, 1400);
                }

                console.log(counter);
            }


            // Check si partie terminé
            if(counter === nbPair && nbPair != 0) {
                setTimeout(() => {
                    window.alert('Bravo ! Tu as gagné !');
                    location.reload();
                }, 600);
            }
        });
    });
});



































