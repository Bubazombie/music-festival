document.addEventListener('DOMContentLoaded', function(){
    startApp();
});

function startApp() {
    fixedNavegation();
    createGalery();
    scrollNav();
}

function fixedNavegation() {
    const bar = document.querySelector('.header');
    const aboutFestival = document.querySelector('.about-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if (aboutFestival.getBoundingClientRect().top < 0) { //o sea si ya pasamos el elemento
            bar.classList.add('fixed');
            body.classList.add('body-scroll');
        } else {
            bar.classList.remove('fixed');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const links = document.querySelectorAll('.main-navigation a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({behavior: "smooth"});
        });
    });
}

function createGalery () {
    const galery = document.querySelector('.galery-images');

    for (let i=1; i<=12; i++) {
        const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
            alt="imagen galery">
        `;
        image.onclick = function() { //para poder pasarle parámetros, lo tengo que pasar como callback function
            showImage(i);
        }

        galery.appendChild(image);
    }
}

function showImage(id) {
    const image = document.createElement('picture');
    image.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
        alt="imagen galery">
    `;

    //Create overlay with image
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick  = function() {
        const body = document.querySelector('body');
        body.classList.remove('fixed-body');
        overlay.remove();
    }

    //Button to close modal window
    const closeModal = document.createElement('P');
    closeModal.textContent = 'X';
    closeModal.classList.add('close-button');
    closeModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fixed-body');
        overlay.remove();
    }
    overlay.appendChild(closeModal);

    //Add it to HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fixed-body');
}