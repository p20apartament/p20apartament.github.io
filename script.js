document.addEventListener('DOMContentLoaded', () => {
    // Płynne przewijanie do sekcji
    const navLinks = document.querySelectorAll('.main-nav a');

    for (const link of navLinks) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Zamknij menu po kliknięciu w link na urządzeniach mobilnych
        if (window.innerWidth <= 768) {
            const menuToggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');
            const mainHeader = document.querySelector('.main-header');

            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            mainHeader.classList.remove('menu-open');
        }

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
    const mainHeader = document.querySelector('.main-header');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            mainHeader.classList.toggle('menu-open');
        });
    }
});
