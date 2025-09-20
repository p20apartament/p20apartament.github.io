document.addEventListener('DOMContentLoaded', () => {
    // Płynne przewijanie
    const navLinks = document.querySelectorAll('.main-nav a');
    for (const link of navLinks) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    }

    // Obsługa menu mobilnego
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        header.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            header.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Obsługa lightboxa
    const galleryImages = document.querySelectorAll('.gallery-item-placeholder img');
    const lightbox = document.querySelector('#lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Wyłącza przewijanie strony
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Przywraca przewijanie strony
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Przywraca przewijanie strony
        }
    });
});
