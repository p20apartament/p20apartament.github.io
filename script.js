document.addEventListener('DOMContentLoaded', () => {
    // === Elementy Lightboxa ===
    const lightbox = document.querySelector('#lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxWwwLink = document.querySelector('.lightbox-www-link');
    const lightboxClose = document.querySelector('.lightbox-close');

    function openLightbox(imgSrc, imgAlt, description, wwwLink) {
        lightboxImage.src = imgSrc;
        lightboxImage.alt = imgAlt;
        lightboxDescription.textContent = description;
        lightboxWwwLink.href = wwwLink;
        lightboxWwwLink.style.display = wwwLink ? 'inline-block' : 'none';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // === Modal rezerwacji ===
    const bookingModal = document.querySelector('#booking-modal');
    const bookingIframe = document.querySelector('.booking-iframe');
    const bookingClose = document.querySelector('.booking-modal-close');

    function openBookingModal(url) {
        bookingIframe.src = url;
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeBookingModal() {
        bookingModal.classList.remove('active');
        bookingIframe.src = '';
        document.body.style.overflow = 'auto';
    }

    // === Modal polityki prywatności ===
    const privacyModal = document.querySelector('#privacy-modal');
    const privacyIframe = document.querySelector('.privacy-iframe');
    const privacyClose = document.querySelector('.privacy-modal-close');

    function openPrivacyModal(url) {
        privacyIframe.src = url;
        privacyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePrivacyModal() {
        privacyModal.classList.remove('active');
        privacyIframe.src = '';
        document.body.style.overflow = 'auto';
    }

    // === Modal regulaminu ===
    const regulaminModal = document.querySelector('#regulamin-modal');
    const regulaminIframe = document.querySelector('.regulamin-iframe');
    const regulaminClose = document.querySelector('.regulamin-modal-close');

    function openRegulaminModal(url) {
        regulaminIframe.src = url;
        regulaminModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeRegulaminModal() {
        regulaminModal.classList.remove('active');
        regulaminIframe.src = '';
        document.body.style.overflow = 'auto';
    }

    // === Modal eventu ===
    const eventModal = document.querySelector('#event-modal');
    const eventIframe = document.querySelector('.event-iframe');
    const eventClose = document.querySelector('.event-modal-close');

    // Flaga do włączania/wyłączania modala eventu (zmień na true/false w zależności od potrzeby)
    const showEventModal = false; // Ustaw na true, aby pokazać modal, false aby zamknąć
    const eventFile = 'event.html'; // Plik HTML dla eventu

    function openEventModal(url) {
        if (showEventModal) {
            eventIframe.src = url;
            eventModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeEventModal() {
        eventModal.classList.remove('active');
        eventIframe.src = '';
        document.body.style.overflow = 'auto';
    }

    // Automatyczne otwarcie modala eventu przy ładowaniu strony, jeśli flaga jest true
    if (showEventModal) {
        openEventModal(eventFile);
    }

    // Obsługa zamykania modala eventu
    eventClose.addEventListener('click', closeEventModal);
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeEventModal();
        }
    });

    // === Płynne przewijanie ===
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

    // === Obsługa menu mobilnego ===
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

    // === Obsługa lightboxa dla galerii ===
    const galleryImages = document.querySelectorAll('.gallery-item-placeholder img');
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            openLightbox(image.src, image.alt, '', '');
        });
    });

    // === Obsługa lightboxa dla atrakcji ===
    const attractionLinks = document.querySelectorAll('.attraction-link');
    attractionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = link.dataset.img;
            const imgAlt = link.dataset.alt;
            const description = link.dataset.desc;
            const wwwLink = link.dataset.www;
            openLightbox(imgSrc, imgAlt, description, wwwLink);
        });
    });

    // === Obsługa zamykania lightboxa ===
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // === Obsługa modala rezerwacji ===
    const bookingButtons = document.querySelectorAll('.btn[data-url]');
    bookingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.url;
            openBookingModal(url);
        });
    });

    bookingClose.addEventListener('click', closeBookingModal);
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });

    // === Obsługa modala polityki prywatności ===
    const privacyButtons = document.querySelectorAll('.footer-link[data-url]');
    privacyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.url;
            openPrivacyModal(url);
        });
    });

    privacyClose.addEventListener('click', closePrivacyModal);
    privacyModal.addEventListener('click', (e) => {
        if (e.target === privacyModal) {
            closePrivacyModal();
        }
    });

    // === Obsługa modala regulaminu ===
    const regulaminButtons = document.querySelectorAll('.footer-link[data-url="regulamin.html"]');
    regulaminButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.url;
            openRegulaminModal(url);
        });
    });

    regulaminClose.addEventListener('click', closeRegulaminModal);
    regulaminModal.addEventListener('click', (e) => {
        if (e.target === regulaminModal) {
            closeRegulaminModal();
        }
    });

    // === Obsługa banera cookies ===
    const cookieBanner = document.querySelector('#cookie-banner');
    const cookieAccept = document.querySelector('.cookie-accept');
    const cookieReject = document.querySelector('.cookie-reject');

    // Sprawdzenie, czy użytkownik już dokonał wyboru
    if (!localStorage.getItem('cookieConsent')) {
        cookieBanner.classList.add('active');
    }

    // Funkcja ładowania Google Analytics
    function loadGoogleAnalytics() {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17526194295';
        document.head.appendChild(script);
        gtag('js', new Date());
        gtag('config', 'AW-17526194295');
        gtag('event', 'conversion', {'send_to': 'AW-17526194295/QJRyCJ_o1ZMbEPeAkqVB'});
    }

    // Akceptacja cookies
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('active');
        loadGoogleAnalytics();
    });

    // Odrzucenie cookies analitycznych
    cookieReject.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.classList.remove('active');
    });

    // Ładowanie Google Analytics, jeśli użytkownik wcześniej zaakceptował
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        loadGoogleAnalytics();
    }

    // === Obsługa klawisza Escape dla wszystkich modali ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('active')) {
                closeLightbox();
            }
            if (bookingModal.classList.contains('active')) {
                closeBookingModal();
            }
            if (privacyModal.classList.contains('active')) {
                closePrivacyModal();
            }
            if (regulaminModal.classList.contains('active')) {
                closeRegulaminModal();
            }
            if (eventModal.classList.contains('active')) {
                closeEventModal();
            }
        }
    });
    // === Floating Language Switcher ===
const languageToggle = document.getElementById('language-toggle');
const languageDropdown = document.getElementById('language-dropdown');

if (languageToggle && languageDropdown) {
    languageToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });

    // Zamknij dropdown po kliknięciu poza nim
    document.addEventListener('click', (e) => {
        if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });

    // Opcjonalnie – zamknij po Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && languageDropdown.classList.contains('active')) {
            languageDropdown.classList.remove('active');
        }
    });
}
});
