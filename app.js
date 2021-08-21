function main() {
    const sliderContainer = document.querySelector('.slider-container');
    const slideRight = document.querySelector('.right-slide');
    const slideLeft = document.querySelector('.left-slide');
    const upButton = document.querySelector('.up-button');
    const downButton = document.querySelector('.down-button');
    const slidesLength = slideLeft.querySelectorAll('div').length;

    let activeSlideIndex = 0;

    slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

    function iMoveSlides() {
        let sliderHeight = sliderContainer.clientHeight;
        slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
        slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    }

    function teleport() {
        slideLeft.style.transition = 'transform .0s ease-in-out';
        slideRight.style.transition = 'transform .0s ease-in-out';
        iMoveSlides();
    }

    function noTeleport() {
        slideLeft.style.transition = 'transform .5s ease-in-out';
        slideRight.style.transition = 'transform .5s ease-in-out';
        iMoveSlides();
    }

    addHandler(sliderContainer, 'wheel', wheel);

    function addHandler(object, event, handler) {
        if (object.addEventListener) {
            object.addEventListener(event, handler, false);
        }
        else if (object.attachEvent) {
            object.attachEvent('on' + event, handler);
        }
    }

    function wheel(event) {
        event = event || window.event;

        var delta = event.deltaY || event.detail || event.wheelDelta;

        if (delta < 0) {
            changeSlide('up');
        }
        else {
            changeSlide('down');
        }
    }

    upButton.addEventListener('click', () => changeSlide('up'));
    downButton.addEventListener('click', () => changeSlide('down'));


    const changeSlide = (direction) => {

        if (direction === 'up') {
            activeSlideIndex++;

            if (activeSlideIndex > slidesLength - 1) {

                activeSlideIndex = 1;
                teleport();

                setTimeout(function () {
                    activeSlideIndex++;
                    noTeleport();
                }, 1)

                return;
            }

        } else if (direction === 'down') {
            activeSlideIndex--;

            if (activeSlideIndex < 0) {
                activeSlideIndex = slidesLength - 2;
                teleport();

                setTimeout(function () {
                    activeSlideIndex--;
                    noTeleport();
                }, 1);
                return;
            }
        }
        noTeleport();
    }
}


window.addEventListener('load', function (event) {
    main();
});


