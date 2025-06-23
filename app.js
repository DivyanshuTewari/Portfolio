document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initEnhancedParallax();
    initHeaderScroll();
    initSkillHoverEffects();
    initLoadingAnimations();
    initGeometricAnimations();
});

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Particle System Initialization
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: window.innerWidth < 768 ? 60 : window.innerWidth < 1200 ? 80 : 120,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: ['#00ffff', '#0066cc', '#ffffff'] },
                shape: {
                    type: ['circle', 'triangle'],
                    stroke: { width: 0, color: '#000000' }
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: window.innerWidth < 768 ? 2 : 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: window.innerWidth < 768 ? 120 : 150,
                    color: '#00ffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: window.innerWidth < 768 ? 1.5 : 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: false }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: window.innerWidth > 768, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    repulse: { distance: window.innerWidth < 768 ? 80 : 120, duration: 0.4 },
                    push: { particles_nb: window.innerWidth < 768 ? 2 : 4 }
                }
            },
            retina_detect: true
        });
    }
}

// Enhanced Parallax System
function initEnhancedParallax() {
    const geometricLayers = document.querySelectorAll('.geometric-layer');
    const animatedGrid = document.querySelector('.animated-grid');

    if (geometricLayers.length > 0 || animatedGrid) {
        const handleParallax = throttle(function () {
            if (window.innerWidth < 768) return;

            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollProgress = scrolled / (documentHeight - windowHeight);

            geometricLayers.forEach((layer, index) => {
                let speed = 0.1 + (index * 0.1);
                let direction = index % 2 === 0 ? 1 : -1;
                const translateY = scrolled * speed * direction;
                const translateX = scrolled * speed * 0.5 * direction;
                const rotation = scrollProgress * 360 * 0.1;
                layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotation}deg)`;
            });

            if (animatedGrid) {
                const gridTranslateY = scrolled * 0.05;
                const gridOpacity = 0.1 + (Math.sin(scrollProgress * Math.PI * 2) * 0.05);
                animatedGrid.style.transform = `translate3d(0, ${gridTranslateY}px, 0)`;
                animatedGrid.style.opacity = Math.max(0.05, gridOpacity);
            }

            const circles = document.querySelectorAll('.circle');
            const triangles = document.querySelectorAll('.triangle');
            const hexagons = document.querySelectorAll('.hexagon');
            const orbs = document.querySelectorAll('.gradient-orb');

            circles.forEach((circle, index) => {
                const speed = 0.2 + (index * 0.1);
                const translateY = scrolled * speed;
                const scale = 1 + (scrollProgress * 0.1);
                circle.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            });

            triangles.forEach((triangle, index) => {
                const speed = 0.15 + (index * 0.05);
                const rotation = scrollProgress * 180 + (index * 90);
                const translateY = scrolled * speed;
                triangle.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotation}deg)`;
            });

            hexagons.forEach((hexagon, index) => {
                const speed = 0.25 + (index * 0.1);
                const translateY = scrolled * speed;
                const rotation = scrollProgress * 90;
                hexagon.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotation}deg)`;
            });

            orbs.forEach((orb, index) => {
                const speed = 0.1 + (index * 0.05);
                const translateY = scrolled * speed;
                const translateX = Math.sin(scrollProgress * Math.PI + index) * 20;
                const scale = 1 + (Math.sin(scrollProgress * Math.PI * 2 + index) * 0.1);
                orb.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
            });
        }, 16);

        window.addEventListener('scroll', handleParallax, { passive: true });
        handleParallax();
    }
}

// Geometric Animations
function initGeometricAnimations() {
    const lines = document.querySelectorAll('.line');
    lines.forEach((line, index) => {
        const animationDelay = index * 2000;
        setTimeout(() => {
            line.style.animationPlayState = 'running';
        }, animationDelay);
    });
}

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollPosition = window.scrollY;
    let scrollDirection = 'down';
    let currentlyActiveId = null;

    // Mobile menu toggle
    if (navToggle && navMenu) {
        const toggleMenu = () => {
            const isActive = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
            document.documentElement.style.scrollBehavior = isActive ? 'auto' : 'smooth';
        };

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                toggleMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Update active navigation link
    const updateActiveNavLink = (targetId) => {
        if (currentlyActiveId === targetId) return;
        currentlyActiveId = targetId;
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.toggle('active', linkHref === targetId);
        });
    };

    // Smooth scroll to section
    const scrollToSection = (targetId) => {
        const target = document.querySelector(targetId);
        if (!target) return;

        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        updateActiveNavLink(targetId);
    };

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            scrollToSection(targetId);
            if (window.innerWidth < 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Intersection Observer for section highlighting
    const sectionObserver = new IntersectionObserver((entries) => {
        let mostVisible = null;
        let highestRatio = 0;

        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
                highestRatio = entry.intersectionRatio;
                mostVisible = entry;
            }
        });

        if (mostVisible) {
            updateActiveNavLink(`#${mostVisible.target.id}`);
        }
    }, {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: '-15% 0px -15% 0px'
    });

    // Fallback scroll handler for rapid scrolling
    const handleScrollHighlight = throttle(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + window.innerHeight / 2; // Center of viewport
        let closestSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const distance = Math.abs(scrollY - sectionTop);
            if (distance < minDistance) {
                minDistance = distance;
                closestSection = section;
            }
        });

        if (closestSection) {
            updateActiveNavLink(`#${closestSection.id}`);
        }
    }, 100);

    // Observe sections and add scroll listener
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
    window.addEventListener('scroll', handleScrollHighlight, { passive: true });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', throttle(() => {
            const scrollY = window.scrollY;
            scrollDirection = scrollY > lastScrollPosition ? 'down' : 'up';
            lastScrollPosition = scrollY;
            if (scrollY > 100) {
                header.classList.toggle('scrolled-down', scrollDirection === 'down');
                header.classList.toggle('scrolled-up', scrollDirection === 'up');
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled', 'scrolled-down', 'scrolled-up');
            }
        }, 100), { passive: true });
    }

    // Resize handler
    window.addEventListener('resize', throttle(() => {
        if (window.innerWidth >= 768 && navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250));
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        const handleScroll = throttle(() => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, 16);
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

// Skill Hover Effects
function initSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-icon-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.classList.add('skill-hovered');
            const ripple = document.createElement('div');
            ripple.className = 'skill-ripple';
            this.appendChild(ripple);
            if (window.innerWidth > 768) {
                createFloatingParticles(this);
            }
            setTimeout(() => ripple.parentNode?.removeChild(ripple), 600);
        });

        item.addEventListener('mouseleave', () => this.classList.remove('skill-hovered'));

        item.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.skill-icon i');
            const name = this.querySelector('.skill-name');
            if (icon) icon.style.color = '#00ffff';
            if (name) name.style.color = '#00ffff';
        });

        item.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.skill-icon i');
            const name = this.querySelector('.skill-name');
            if (icon) icon.style.color = '#c0c0c0';
            if (name) name.style.color = '#ffffff';
        });
    });
}

// Floating Particles Effect
function createFloatingParticles(container) {
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00ffff;
            border-radius: 50%;
            pointer-events: none;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: floatUp 1s ease-out forwards;
            animation-delay: ${i * 0.1}s;
            z-index: 1;
        `;
        container.appendChild(particle);
        setTimeout(() => particle.parentNode?.removeChild(particle), 1000 + (i * 100));
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                if (entry.target.classList.contains('education-grid')) animateEducationCards();
                if (entry.target.classList.contains('skills-grid')) animateSkillIcons(entry.target);
                if (entry.target.classList.contains('projects-grid')) animateProjectCards();
                if (entry.target.classList.contains('courses-grid')) animateCourses();
            }
        });
    }, { rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.section, .education-grid, .skills-grid, .projects-grid, .about-content, .contact-container, .courses-grid')
        .forEach(el => el && observer.observe(el));
}

function animateEducationCards() {
    document.querySelectorAll('.education-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateSkillIcons(container) {
    container.querySelectorAll('.skill-icon-item').forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

function animateProjectCards() {
    document.querySelectorAll('.project-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

function animateCourses() {
    document.querySelectorAll('.course-item').forEach((course, index) => {
        setTimeout(() => {
            course.style.opacity = '1';
            course.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');

            if (!nameField || !emailField || !messageField) {
                showNotification('Form fields not found.', 'error');
                return;
            }

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const message = messageField.value.trim();

            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                setTimeout(() => {
                    showNotification('Message sent! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" type="button">×</button>
        </div>
    `;
    document.body.appendChild(notification);

    const autoRemove = setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.parentNode?.removeChild(notification), 300);
    }, 5000);

    notification.querySelector('.notification-close')?.addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.parentNode?.removeChild(notification), 300);
    });
}

// Loading Animations
function initLoadingAnimations() {
    const selectors = [
        { sel: '.education-card', transform: 'translateY(30px)' },
        { sel: '.skill-icon-item', transform: 'translateY(30px) scale(0.8)' },
        { sel: '.project-card', transform: 'translateY(30px)' },
        { sel: '.course-item', transform: 'translateY(20px)' },
        { sel: '.contact-item', transform: 'translateY(20px)' }
    ];

    selectors.forEach(({ sel, transform }) => {
        document.querySelectorAll(sel).forEach(item => {
            item.style.opacity = '0';
            item.style.transform = transform;
            item.style.transition = 'all 0.6s ease';
        });
    });
}

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => {
        document.querySelectorAll('.hero-content h1, .hero-content h2').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });
    }, 300);
});

// Scroll Effects
const updateScrollEffects = throttle(() => {
    const scrolled = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
}, 16);

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateScrollEffects);
}, { passive: true });

// Fade-in Animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.course-item, .contact-item').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        fadeObserver.observe(el);
    });
});

// Dynamic Styles
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes floatUp {
        0% { opacity: 1; transform: translate(-50%, -50%) translateY(0); }
        100% { opacity: 0; transform: translate(-50%, -50%) translateY(-50px); }
    }
`;
document.head.appendChild(dynamicStyles);

// Performance Optimization
function optimizePerformance() {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.querySelectorAll('.geometric-layer').forEach(layer => {
            layer.style.animationDuration = '60s';
        });
    }

    document.addEventListener('visibilitychange', () => {
        const animations = document.querySelectorAll('.geometric-layer, .circle, .triangle, .hexagon, .gradient-orb, .line');
        animations.forEach(el => {
            el.style.animationPlayState = document.hidden ? 'paused' : 'running';
        });
    });

    if (window.innerWidth < 768) {
        document.querySelectorAll('.geometric-layer').forEach(layer => {
            layer.style.transform = 'none';
        });
    }
}

optimizePerformance();

// Safe Selectors
function safeQuerySelector(selector) {
    try { return document.querySelector(selector); } catch (e) { console.warn(`Element not found: ${selector}`); return null; }
}

function safeQuerySelectorAll(selector) {
    try { return document.querySelectorAll(selector); } catch (e) { console.warn(`Elements not found: ${selector}`); return []; }
}

// Responsive Utilities
function isMobile() { return window.innerWidth < 768; }
function isTablet() { return window.innerWidth >= 768 && window.innerWidth < 1024; }
function isDesktop() { return window.innerWidth >= 1024; }

// Touch Device Optimization
if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
    document.body.classList.add('touch-device');
    const style = document.createElement('style');
    style.textContent = `@media (hover: none) { .skill-icon-item:hover { transform: none; } }`;
    document.head.appendChild(style);
}

// Keyboard Navigation
document.addEventListener('keydown', e => { if (e.key === 'Tab') document.body.classList.add('keyboard-navigation'); });
document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-navigation'));

// Safe Execution
function safeExecute(func, errorMessage = 'Function execution failed') {
    try { return func(); } catch (error) { console.warn(errorMessage, error); return null; }
}

// Initialize Animations
function initAllAnimations() {
    safeExecute(() => initScrollAnimations(), 'Scroll animations failed');
    safeExecute(() => initLoadingAnimations(), 'Loading animations failed');
    safeExecute(() => initSkillHoverEffects(), 'Skill hover effects failed');
    safeExecute(() => initGeometricAnimations(), 'Geometric animations failed');
}

// Resize Handler
const handleResize = throttle(() => {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        try {
            const newParticleCount = window.innerWidth < 768 ? 60 : window.innerWidth < 1200 ? 80 : 120;
            pJSDom[0].pJS.particles.number.value = newParticleCount;
            pJSDom[0].pJS.fn.particlesRefresh();
        } catch (error) {
            console.log('Particles refresh error:', error);
        }
    }
    setTimeout(() => { if (typeof particlesJS !== 'undefined') initParticles(); }, 100);
}, 250);

window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        handleResize();
        optimizePerformance();
    }, 150);
});

// Utilities Export
window.portfolioUtils = {
    throttle,
    showNotification,
    isValidEmail,
    initParticles,
    initEnhancedParallax,
    isMobile,
    isTablet,
    isDesktop,
    safeQuerySelector,
    safeQuerySelectorAll
};

// Scroll Indicator
const scrollDownIndicator = safeQuerySelector('#scrollDownIndicator');
if (scrollDownIndicator) {
    let lastScrollPos = 0;
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.scrollY;
        if (currentScrollPos > lastScrollPos && currentScrollPos > 350) {
            scrollDownIndicator.classList.add('hidden');
        } else if (currentScrollPos < lastScrollPos && currentScrollPos < 450) {
            scrollDownIndicator.classList.remove('hidden');
        }
        lastScrollPos = currentScrollPos;
    }, { passive: true });
}