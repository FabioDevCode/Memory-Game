"use strict";
console.log("MEMORY GAME");
const btns = document.querySelectorAll('.btn-grid');
// Function avant partie
btns.forEach((el) => {
    el.addEventListener('click', () => {
        btns.forEach((el) => {
            el.classList.remove('active');
        });
        el.classList.toggle('active');
    });
});
