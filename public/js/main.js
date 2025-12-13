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

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .feature-box, .pricing-card, .section-title, .hero-content, .location-card, .cta-info-item, .contact-form-card');
    elements.forEach((el, index) => {
        // Stagger animations
        setTimeout(() => {
            observer.observe(el);
        }, index * 100);
    });
    
    // Add counter animation for stats
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Animate counters when they come into view
    const observerCounters = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target || '500');
                animateValue(counter, 0, target, 2000);
                observerCounters.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('[data-target]').forEach(counter => {
        observerCounters.observe(counter);
    });
    
    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

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