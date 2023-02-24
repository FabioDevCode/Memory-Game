const btns: NodeListOf<Element> = document.querySelectorAll('.btn-grid');
const select: Element|null = document.querySelector('#select-theme');
const play: Element|null = document.querySelector('.btn-play');

// Select options
fetch('../data/data.json')
.then(res => res.json())
.then(data => {
    data.theme.forEach((el: any): void => {
        const option: HTMLOptionElement = document.createElement('option');
        option.value = el;
        option.innerHTML = el;
        select?.appendChild(option);
    });
});

// Grid btns
btns.forEach((el: Element): void => {
    el.addEventListener('click', (): void => {
        btns.forEach((el: Element): void => {
            el.classList.remove('active');
        });
        el.classList.toggle('active');
    });
});

// Btn play
play?.addEventListener('click', function() {

    btns.forEach(el => {
        if(el.getAttribute('class')?.includes('active')) {
           console.log(el.getAttribute('value'));
        }
    });

});































