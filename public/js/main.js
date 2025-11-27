// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#contact') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active state in navbar
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });

                // Find and activate the corresponding nav link
                document.querySelectorAll(`.nav-link[href="${href}"]`).forEach(navLink => {
                    navLink.classList.add('active');
                });
            }
        }
    });
});

// Navbar effects on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.scrollY;

    // Add shadow and reduce padding on scroll
    if (scrollTop > 50) {
        navbar.classList.add('shadow-sm');
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('shadow-sm');
        navbar.classList.remove('navbar-scrolled');
    }

    // Highlight active section in navbar based on scroll position
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('href') === `#${sectionId}`) {
                    navLink.classList.add('active');
                }
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for animation
    const elements = document.querySelectorAll('.service-card, .feature-box, .pricing-card, .section-title, .hero-content, .location-card, .cta-info-item');
    elements.forEach(el => {
        observer.observe(el);
    });

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

    // Add active class to current page nav link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(navLink => {
        const navHref = navLink.getAttribute('href');
        if (navHref === currentPath || 
            (currentPath === '/' && navHref === '/') || 
            (navHref !== '/' && currentPath.startsWith(navHref))) {
            navLink.classList.add('active');
        }
    });
});

const forms = document.querySelectorAll('.needs-validation');
forms.forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
});

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});
