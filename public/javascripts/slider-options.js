document.addEventListener('DOMContentLoaded', function () {
    // инициализация слайдера
    let slider = new SimpleAdaptiveSlider('.slider', {
        loop: true,
        autoplay: true,
        interval: 10000,
        swipe: true,
    });
});