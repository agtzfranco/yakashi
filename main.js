// main.js para YAKASHI - Funcionalidades completas

document.addEventListener('DOMContentLoaded', function() {
    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    
    // Ocultar preloader después de 2 segundos (o cuando todo cargue)
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = 'visible'; // Habilitar scroll
    }, 2000);

    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Cerrar menú al hacer clic en un enlace (para móviles)
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== EFECTO PARALLAX PARA EL LOGO =====
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            logoContainer.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    }

    // ===== ANIMACIÓN AL HACER SCROLL (AOS) =====
    // Configuración básica para animaciones al aparecer elementos
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.hero, .music-section, .tour-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Estilos iniciales para la animación
    document.querySelectorAll('.music-section, .tour-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-out';
    });

    // Hero aparece inmediatamente
    document.querySelector('.hero').style.opacity = '1';

    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // ===== GALERÍA DE ÁLBUMES (EJEMPLO DINÁMICO) =====
    const albumGrid = document.querySelector('.album-grid');
    if (albumGrid) {
        const albums = [
            { title: 'Last night before destruction!', year: '2025', image: 'lnbd!.png', link:'https://open.spotify.com/intl-es/album/6FAfDfNRIcESFe1FXv2FKy?si=wKYlkybIRsa8KGoYdtRelw' },
            { title: 'AUN ASI, SON MIS SENTIMIENTOS', year: '2024', image: 'SENTIMIENTOS.png', link:'https://open.spotify.com/intl-es/album/4XbVuzhQHg6aUbIMO9YIdF?si=-NXbh5LBR5mTrq2xFMpjEQ' },
            { title: 'How close are you with your thoughts', year: '2024', image: 'THOUGHTS.png', link: 'https://open.spotify.com/intl-es/album/4XbVuzhQHg6aUbIMO9YIdF?si=HQFdenL6RTaYMEF3UrVzew' },
            { title: 'fantasy', year: '2023', image: 'FANTASY.png', link: 'https://open.spotify.com/intl-es/album/3FjUYSjsEyAcED2ih38KLM?si=oytfu8VQSAmm-QmIb7QVIQ'},
        ];

    albums.forEach(album => {
        const albumItem = document.createElement('div');
        albumItem.className = 'album-item';
        albumItem.innerHTML = `
            <a href="${album.link}" target="_blank" class="album-link">
                <img src="${album.image}" alt="${album.title}">
                <div class="album-info">
                    <h3>${album.title}</h3>
                    <p>${album.year}</p>
                </div>
            </a>
        `;
        albumGrid.appendChild(albumItem);
    });
}

    // ===== FECHAS DE TOUR (EJEMPLO DINÁMICO) =====
    const tourDates = document.querySelector('.tour-dates');
    if (tourDates) {
        const dates = [
            { city: 'CDMX', venue: 'VENUE', date: '27 JUL 2025' },
        ];

        dates.forEach(event => {
            const dateItem = document.createElement('div');
            dateItem.className = 'date-item';
            dateItem.innerHTML = `
                <div class="date-city">${event.city}</div>
                <div class="date-venue">${event.venue}</div>
                <div class="date-date">${event.date}</div>
                <a href="#" class="date-button">COMPRAR</a>
            `;
            tourDates.appendChild(dateItem);
        });
    }

    // ===== OBSERVER PARA IMÁGENES LAZY LOADING =====
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== CAMBIO DE COLOR DEL HEADER AL HACER SCROLL =====
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(255, 77, 77, 0.3)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.7)';
                header.style.boxShadow = 'none';
            }
        });
    }
});