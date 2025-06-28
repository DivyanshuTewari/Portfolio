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

let scrollAnimationFrame = null;

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

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: window.innerWidth < 768 ? 60 : window.innerWidth < 1200 ? 80 : 120,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00ffff', '#0066cc', '#ffffff']
                },
                shape: {
                    type: ['circle', 'triangle'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: window.innerWidth < 768 ? 2 : 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
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
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: window.innerWidth > 768,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: window.innerWidth < 768 ? 80 : 120,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: window.innerWidth < 768 ? 2 : 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

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

function initGeometricAnimations() {
    const lines = document.querySelectorAll('.line');
    lines.forEach((line, index) => {
        const animationDelay = index * 2000;
        setTimeout(() => {
            line.style.animationPlayState = 'running';
        }, animationDelay);
    });
}

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

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
            if (navMenu.classList.contains('active') && 
                !navToggle.contains(e.target) && 
                !navMenu.contains(e.target)) {
                toggleMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768 && navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }
}

function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (header) {
        const handleScroll = throttle(function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 16);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

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
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });

        item.addEventListener('mouseleave', function () {
            this.classList.remove('skill-hovered');
        });

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
            z-index: 100;
        `;
        container.appendChild(particle);
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000 + (i * 100));
    }
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                if (entry.target.classList.contains('education-grid')) {
                    animateEducationCards();
                }
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillIcons(entry.target);
                }
                if (entry.target.classList.contains('projects-grid')) {
                    animateProjectCards();
                }
                if (entry.target.classList.contains('courses-grid')) {
                    animateCoursesGrid();
                }
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    const animateElements = document.querySelectorAll('.education-grid, .skills-grid, .projects-grid, .about-content, .contact-container, .courses-grid');
    animateElements.forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
}

function animateEducationCards() {
    const cards = document.querySelectorAll('.education-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateSkillIcons(container) {
    const icons = container.querySelectorAll('.skill-icon-item');
    icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

function animateCoursesGrid() {
    const courses = document.querySelectorAll('.course-item');
    courses.forEach((course, index) => {
        setTimeout(() => {
            course.style.opacity = '1';
            course.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            if (!nameField || !emailField || !messageField) {
                showNotification('Form fields not found. Please try again.', 'error');
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
                    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" type="button">&times;</button>
        </div>
    `;
    document.body.appendChild(notification);
    const autoRemove = setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }
}

function smoothScrollTo(target, duration = 800) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - (window.innerWidth < 768 ? 60 : 80);
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    cancelAnimationFrame(scrollAnimationFrame);

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            scrollAnimationFrame = requestAnimationFrame(animation);
        }
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    scrollAnimationFrame = requestAnimationFrame(animation);
}

document.addEventListener('click', function (e) {
    if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            smoothScrollTo(targetElement, 800);
        }
    }
});

const handleResize = throttle(function () {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        try {
            const newParticleCount = window.innerWidth < 768 ? 60 : window.innerWidth < 1200 ? 80 : 120;
            pJSDom[0].pJS.particles.number.value = newParticleCount;
            pJSDom[0].pJS.fn.particlesRefresh();
        } catch (error) {
            console.log('Particles refresh error:', error);
        }
    }
    if (window.innerWidth >= 768) {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    setTimeout(() => {
        if (typeof particlesJS !== 'undefined') {
            initParticles();
        }
    }, 100);
}, 250);

window.addEventListener('resize', handleResize);

function initLoadingAnimations() {
    const educationCards = document.querySelectorAll('.education-card');
    const skillIcons = document.querySelectorAll('.skill-icon-item');
    const projectCards = document.querySelectorAll('.project-card');
    const courseItems = document.querySelectorAll('.course-item');
    const contactItems = document.querySelectorAll('.contact-item');
    educationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    skillIcons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(30px) scale(0.8)';
        icon.style.transition = 'all 0.6s ease';
    });
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    courseItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
    });
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
    });
}

window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content h1, .hero-content h2');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });
    }, 300);
});

let scrollTicking = false;

const updateScrollEffects = throttle(function () {
    const scrolled = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    scrollTicking = false;
}, 16);

window.addEventListener('scroll', function () {
    if (!scrollTicking) {
        requestAnimationFrame(updateScrollEffects);
        scrollTicking = true;
    }
}, { passive: true });

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function () {
    const fadeElements = document.querySelectorAll('.course-item, .contact-item');
    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        fadeObserver.observe(el);
    });
});

function optimizePerformance() {
    if (window.navigator && window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4) {
        const geometricLayers = document.querySelectorAll('.geometric-layer');
        geometricLayers.forEach(layer => {
            layer.style.animationDuration = '60s';
        });
    }
    document.addEventListener('visibilitychange', function () {
        const animations = document.querySelectorAll('.geometric-layer, .circle, .triangle, .hexagon, .gradient-orb, .line');
        if (document.hidden) {
            animations.forEach(el => el.style.animationPlayState = 'paused');
        } else {
            animations.forEach(el => el.style.animationPlayState = 'running');
        }
    });
    if (window.innerWidth < 768) {
        const geometricLayers = document.querySelectorAll('.geometric-layer');
        geometricLayers.forEach(layer => {
            layer.style.transform = 'none';
        });
    }
}

optimizePerformance();

function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

function isMobile() {
    return window.innerWidth < 768;
}

function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

function isDesktop() {
    return window.innerWidth >= 1024;
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) {
            .skill-icon-item:hover {
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
});

function safeExecute(func, errorMessage = 'Function execution failed') {
    try {
        return func();
    } catch (error) {
        console.warn(errorMessage, error);
        return null;
    }
}

function initAllAnimations() {
    safeExecute(() => initScrollAnimations(), 'Scroll animations failed');
    safeExecute(() => initLoadingAnimations(), 'Loading animations failed');
    safeExecute(() => initSkillHoverEffects(), 'Skill hover effects failed');
    safeExecute(() => initGeometricAnimations(), 'Geometric animations failed');
}

let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        handleResize();
        optimizePerformance();
    }, 150);
});

window.portfolioUtils = {
    throttle,
    showNotification,
    smoothScrollTo,
    isValidEmail,
    initParticles,
    initEnhancedParallax,
    isMobile,
    isTablet,
    isDesktop,
    safeQuerySelector,
    safeQuerySelectorAll
};

const scrollDownIndicator = document.getElementById('scrollDownIndicator');
let lastScrollPosition = 0;

window.addEventListener('scroll', function() {
  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 350) {
    scrollDownIndicator.classList.add('hidden');
  } else if (currentScrollPosition < lastScrollPosition && currentScrollPosition < 450) {
    scrollDownIndicator.classList.remove('hidden');
  }
  lastScrollPosition = currentScrollPosition;
});