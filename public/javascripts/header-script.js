const iconMenu = document.querySelector('.menu__icon');

if (iconMenu) {
    const iconBody = document.querySelector('.menu__body');
    iconMenu.addEventListener("click", (e) => {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        iconBody.classList.toggle('_active');
    })
}

