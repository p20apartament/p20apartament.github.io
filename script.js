document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');

    for (const link of navLinks) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.main-header').offsetHeight, // Odejmujemy wysokość nagłówka
                behavior: 'smooth'
            });
        }
    }
});
