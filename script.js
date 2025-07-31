document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // Płynne przewijanie do sekcji
    // ----------------------------------------
    const navLinks = document.querySelectorAll('.main-nav a');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const mainHeader = document.querySelector('.main-header');

    if (navLinks) {
        for (const link of navLinks) {
            link.addEventListener('click', smoothScroll);
        }
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Zamknij menu po kliknięciu w link na urządzeniach mobilnych
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            mainHeader.classList.remove('menu-open');
        }

        if (targetSection) {
            // Upewnij się, że nagłówek istnieje, aby nie wystąpił błąd
            const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    }

    // ----------------------------------------
    // Obsługa menu mobilnego
    // ----------------------------------------
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            mainHeader.classList.toggle('menu-open');
        });
    }
});
