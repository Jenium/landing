// закрепление меню при скроле.

const $navi = document.querySelector('.navi-wrap');
const $navigation = document.querySelector('.navigation');

window.addEventListener('scroll', function () {
    let top = $navigation.getBoundingClientRect().top;

    if (top <= 0) {
        $navi.classList.add('nav-top');
    } else {
        $navi.classList.remove('nav-top');
    }
});

// переключение активного класса по навигации

const $sectionID = document.querySelectorAll('.section');
const $menuLink = document.querySelectorAll('.menu-list a');
const $centerWindow = window.innerHeight / 2;

window.addEventListener('scroll', function () {
    $sectionID.forEach(section => {
        const offsetTop = section.getBoundingClientRect().top;
        const offsetBottom = section.getBoundingClientRect().bottom;
        const idSection = '#' + section.getAttribute('id');
        
        if (offsetTop <= $centerWindow && offsetBottom > $centerWindow) {
            const $link = document.querySelector(`.menu-list a[href="${idSection}"]`);
            document.querySelector('.menu-list a.active')?.classList.remove('active');

            $link.classList.add('active');           
        }
    });
});

// анимация для блоков

const $animate = document.querySelectorAll('.animate');
$animate.forEach(element => {
    const myFunc = animateMove(element);

    if (element.hasAttribute('data-delay')) {
        element.style.animationDelay = element.dataset.delay;
    }

    window.addEventListener('scroll', myFunc);          // на скролл
    myFunc();                                           // на загрузку экрана
});

function animateMove(elem) {
    return function () {
        let bottomWindow = window.innerHeight;
        let topElem = elem.getBoundingClientRect().top;
        let bottomElem = elem.getBoundingClientRect().bottom;

        if ((topElem <= bottomWindow && topElem > 0) || (bottomElem > 0 && bottomElem <= bottomWindow)) { //
            if (!elem.style.animationName) {
                const delay = elem.dataset.delay || 0;

                setTimeout(() => {
                    elem.style.animationName = elem.dataset.animation;
                }, delay);
            }
        } 
    }
}

// Слайдер пагинации

const $tape = document.querySelector('.feedback-tape');
const $itemButton = document.querySelectorAll('.pagination-page');

$itemButton.forEach((item, index) => {

    item.addEventListener('click', function () {
        slideNum(index);

        document.querySelector('.pagination-page.active')?.classList.remove('active');

        this.classList.add('active');
    });
});

function slideNum(index) {
    $tape.style.left = `${-100 * index}%`;
}


// Скролл по кнопкам

const $click = document.querySelectorAll('.click');

$click.forEach(clk => {
    clk.addEventListener('click', function (e) {
        e.preventDefault();
        let href = this.getAttribute('href').substring(1);
        console.log(href);
        const scrollTarget = document.getElementById(href);
        const elemPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elemPosition,
            behavior: 'smooth'
        });
    });
});


//  Кнопка ТОП

const $buttonUp = document.querySelector('.scroll-top');

window.addEventListener('scroll', function () {

    if ($navigation.getBoundingClientRect().top <= 0) {
        $buttonUp.style.display = 'block';
        $buttonUp.style.opacity = 1;
    } else {
        $buttonUp.style.opacity = 0;
        $buttonUp.style.display = 'none';
    }
});