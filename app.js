"use strict";
const btns = document.querySelectorAll('.btn-grid');
const select = document.querySelector('#select-theme');
const play = document.querySelector('.btn-play');
// Select options
fetch('../data/data.json')
    .then(res => res.json())
    .then(data => {
    data.theme.forEach((el) => {
        const option = document.createElement('option');
        option.value = el;
        option.innerHTML = el;
        select === null || select === void 0 ? void 0 : select.appendChild(option);
    });
});
// Grid btns
btns.forEach((el) => {
    el.addEventListener('click', () => {
        btns.forEach((el) => {
            el.classList.remove('active');
        });
        el.classList.toggle('active');
    });
});
// Btn play
play === null || play === void 0 ? void 0 : play.addEventListener('click', function () {
    btns.forEach(el => {
        var _a;
        if ((_a = el.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.includes('active')) {
            console.log(el.getAttribute('value'));
        }
    });
});
