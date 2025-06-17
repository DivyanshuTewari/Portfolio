// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
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

// Throttle function implementation
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

// Enhanced Parallax System for Fixed Background
function initEnhancedParallax() {
    const geometricLayers = document.querySelectorAll('.geometric-layer');
    const animatedGrid = document.querySelector('.animated-grid');

    if (geometricLayers.length > 0 || animatedGrid) {
        const handleParallax = throttle(function () {
            // Disable parallax on mobile for performance
            if (window.innerWidth < 768) return;

            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollProgress = scrolled / (documentHeight - windowHeight);

            // Different parallax speeds for different layers
            geometricLayers.forEach((layer, index) => {
                let speed = 0.1 + (index * 0.1);
                let direction = index % 2 === 0 ? 1 : -1;

                const translateY = scrolled * speed * direction;
                const translateX = scrolled * speed * 0.5 * direction;
                const rotation = scrollProgress * 360 * 0.1;

                layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotation}deg)`;
            });

            // Animate grid with different speed
            if (animatedGrid) {
                const gridTranslateY = scrolled * 0.05;
                const gridOpacity = 0.1 + (Math.sin(scrollProgress * Math.PI * 2) * 0.05);
                animatedGrid.style.transform = `translate3d(0, ${gridTranslateY}px, 0)`;
                animatedGrid.style.opacity = Math.max(0.05, gridOpacity);
            }

            // Individual element parallax within layers
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

// Initialize geometric animations
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

        // Close menu when clicking outside or pressing Escape
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

        // Close menu when a link is clicked (for mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768 && navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // Track scroll direction for header effects
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;
        scrollDirection = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
        lastScrollPosition = currentScrollPosition;
    });

    // Improved smooth scrolling with offset calculation
    function scrollToSection(targetId, behavior = 'smooth') {
        const target = document.querySelector(targetId);
        if (!target) return;

        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        // Use native smooth scrolling when possible
        window.scrollTo({
            top: targetPosition,
            behavior: behavior
        });
    }

    // Navigation link click handler
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Use instant scroll if we're far from the target
            const currentPosition = window.scrollY;
            const targetElement = document.querySelector(targetId);
            const targetPosition = targetElement?.offsetTop || 0;
            const distance = Math.abs(targetPosition - currentPosition);
            
            // For large distances (>2 viewports), do instant scroll then smooth
            if (distance > window.innerHeight * 2) {
                window.scrollTo({ top: targetPosition, behavior: 'auto' });
                setTimeout(() => {
                    scrollToSection(targetId);
                }, 50);
            } else {
                scrollToSection(targetId);
            }

            updateActiveNavLink(targetId);
        });
    });

    // Intersection Observer for active link updates
    const updateActiveNavLink = (targetId) => {
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.toggle('active', linkHref === targetId);
        });
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                updateActiveNavLink(`#${entry.target.id}`);
            }
        });
    }, {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-50px 0px -50px 0px'
    });

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', throttle(() => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                header.classList.toggle('scrolled-down', scrollDirection === 'down');
                header.classList.toggle('scrolled-up', scrollDirection === 'up');
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled', 'scrolled-down', 'scrolled-up');
            }
        }, 100));
    }
}
// Improved active link update function
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.toggle('active', linkHref === targetId);
        
        // For hash links that might point to the same section
        if (linkHref && targetId && linkHref.replace(/\/$/, '') === targetId.replace(/\/$/, '')) {
            link.classList.add('active');
        }
    });
}

// Header scroll effect with throttling
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

// Enhanced skill hover effects with ripple animation
function initSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-icon-item');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.classList.add('skill-hovered');

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'skill-ripple';
            this.appendChild(ripple);

            // Create floating particles effect
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

        // Color change to cyan on hover
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

// Create floating particles effect for skills
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

// Scroll-triggered animations using Intersection Observer
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

                // Special handling for staggered animations
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

    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Observe specific elements
    const animateElements = document.querySelectorAll('.education-grid, .skills-grid, .projects-grid, .about-content, .contact-container, .courses-grid');
    animateElements.forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
}

// Animate education cards with stagger
function animateEducationCards() {
    const cards = document.querySelectorAll('.education-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Animate skill icons with stagger
function animateSkillIcons(container) {
    const icons = container.querySelectorAll('.skill-icon-item');
    icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Animate project cards
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Animate courses grid
function animateCoursesGrid() {
    const courses = document.querySelectorAll('.course-item');
    courses.forEach((course, index) => {
        setTimeout(() => {
            course.style.opacity = '1';
            course.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Contact form functionality
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

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
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

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
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

    // Auto remove after 5 seconds
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

    // Close button functionality
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

// Enhanced smooth scrolling function
// Update the smoothScrollTo function in app.js
function smoothScrollTo(target, duration = 800) { // Reduced duration from 1000 to 800
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - (window.innerWidth < 768 ? 60 : 80);
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Cancel any existing animations
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

    let scrollAnimationFrame = requestAnimationFrame(animation);
}

// Smooth scroll for CTA buttons and links
document.addEventListener('click', function (e) {
    if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            smoothScrollTo(targetElement, 1000);
        }
    }
});

// Resize handler for responsive adjustments
const handleResize = throttle(function () {
    // Reinitialize particles on resize
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        try {
            const newParticleCount = window.innerWidth < 768 ? 60 : window.innerWidth < 1200 ? 80 : 120;
            pJSDom[0].pJS.particles.number.value = newParticleCount;
            pJSDom[0].pJS.fn.particlesRefresh();
        } catch (error) {
            console.log('Particles refresh error:', error);
        }
    }

    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Adjust particle settings based on screen size
    setTimeout(() => {
        if (typeof particlesJS !== 'undefined') {
            initParticles();
        }
    }, 100);
}, 250);

window.addEventListener('resize', handleResize);

// Loading animations initialization
function initLoadingAnimations() {
    // Initialize element opacity for animations
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

// Add loading animation for initial page load
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Start hero animations after page load
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

// Enhanced scroll effects for better user experience
let scrollTicking = false;

const updateScrollEffects = throttle(function () {
    const scrolled = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollHeight > 0 ? scrolled / scrollHeight : 0;

    // Update CSS custom property for potential scroll-based animations
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);

    scrollTicking = false;
}, 16);

window.addEventListener('scroll', function () {
    if (!scrollTicking) {
        requestAnimationFrame(updateScrollEffects);
        scrollTicking = true;
    }
}, { passive: true });

// Intersection Observer for fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Add dynamic styles for animations and effects
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0px);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-50px);
        }
    }
`;

document.head.appendChild(dynamicStyles);

// Initialize fade-in elements
document.addEventListener('DOMContentLoaded', function () {
    const fadeElements = document.querySelectorAll('.course-item, .contact-item');
    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        fadeObserver.observe(el);
    });
});

// Performance monitoring and optimization
function optimizePerformance() {
    // Reduce animations on low-performance devices
    if (window.navigator && window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4) {
        const geometricLayers = document.querySelectorAll('.geometric-layer');
        geometricLayers.forEach(layer => {
            layer.style.animationDuration = '60s';
        });
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function () {
        const animations = document.querySelectorAll('.geometric-layer, .circle, .triangle, .hexagon, .gradient-orb, .line');
        if (document.hidden) {
            animations.forEach(el => el.style.animationPlayState = 'paused');
        } else {
            animations.forEach(el => el.style.animationPlayState = 'running');
        }
    });

    // Disable parallax on mobile for better performance
    if (window.innerWidth < 768) {
        const geometricLayers = document.querySelectorAll('.geometric-layer');
        geometricLayers.forEach(layer => {
            layer.style.transform = 'none';
        });
    }
}

// Initialize performance optimizations
optimizePerformance();

// Safe element selection with error handling
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

// Responsive utilities
function isMobile() {
    return window.innerWidth < 768;
}

function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

function isDesktop() {
    return window.innerWidth >= 1024;
}

// Touch device detection and optimization
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Optimize for touch devices
if (isTouchDevice()) {
    document.body.classList.add('touch-device');

    // Disable hover effects on touch devices
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

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    // Allow navigation with Tab key
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
});

// Error handling wrapper
function safeExecute(func, errorMessage = 'Function execution failed') {
    try {
        return func();
    } catch (error) {
        console.warn(errorMessage, error);
        return null;
    }
}

// Initialize all animations with error handling
function initAllAnimations() {
    safeExecute(() => initScrollAnimations(), 'Scroll animations failed');
    safeExecute(() => initLoadingAnimations(), 'Loading animations failed');
    safeExecute(() => initSkillHoverEffects(), 'Skill hover effects failed');
    safeExecute(() => initGeometricAnimations(), 'Geometric animations failed');
}

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        handleResize();
        optimizePerformance();
    }, 150);
});

// Export functions for potential external use
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

// Hide scroll-down indicator when scrolling
const scrollDownIndicator = document.getElementById('scrollDownIndicator');
let lastScrollPosition = 0;

window.addEventListener('scroll', function() {
  const currentScrollPosition = window.scrollY;

  // Only hide if scrolling down (not up)
  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 350) {
    scrollDownIndicator.classList.add('hidden');
    
  } else if (currentScrollPosition < lastScrollPosition && currentScrollPosition < 450) {
    // Optional: Show again if scrolling up
    scrollDownIndicator.classList.remove('hidden');
  }

  lastScrollPosition = currentScrollPosition;
});
