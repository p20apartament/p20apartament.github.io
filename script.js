document.addEventListener('DOMContentLoaded', () => {
    // === Elementy Lightboxa, modala rezerwacji i modala polityki prywatności (bez zmian) ===
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

    // Obsługa lightboxa dla Galerii
    const galleryImages = document.querySelectorAll('.gallery-item-placeholder img');
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            openLightbox(image.src, image.alt, '', '');
        });
    });

    // Obsługa lightboxa dla Atrakcji
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

    // Obsługa zamykania lightboxa
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Obsługa modala rezerwacji
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

    // Obsługa modala polityki prywatności
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

    // Obsługa banera cookies
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

    // Obsługa klawisza Esc dla zamykania modala i lightboxa
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
        }
    });
});
