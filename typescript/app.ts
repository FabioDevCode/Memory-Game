console.log("MEMORY GAME");
const btns: NodeListOf<Element> = document.querySelectorAll('.btn-grid');



// Function avant partie
btns.forEach((el: Element): void => {
    el.addEventListener('click', (): void => {
        btns.forEach((el: Element): void => {
            el.classList.remove('active');
        });
        el.classList.toggle('active');
    });
});
