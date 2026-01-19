        // ========================================
        // SCROLL-TRIGGERED ANIMATIONS
        // ========================================
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in-up, .fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });

        // ========================================
        // NAVIGATION SCROLL EFFECT
        // ========================================
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // ========================================
        // MOBILE MENU TOGGLE
        // ========================================
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });
        }

        // ========================================
        // EMAIL CAPTURE
        // ========================================
        function captureEmail(inputId) {
            const emailInput = document.getElementById(inputId);
            const email = emailInput.value.trim();
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            console.log('Email captured:', email);
            alert('Thanks! We\'ll be in touch soon.');
            emailInput.value = '';
        }

        // ========================================
        // CONTACT FORM SUBMISSION
        // ========================================
        const contactForm = document.getElementById('main-contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    company: document.getElementById('company').value,
                    position: document.getElementById('position').value,
                    message: document.getElementById('message').value
                };
                
                if (!formData.name || !formData.email || !formData.company || !formData.position || !formData.message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                console.log('Form submitted:', formData);
                alert('Thank you for reaching out! We\'ll respond within 24 hours.');
                contactForm.reset();
            });
        }

        // ========================================
        // SMOOTH SCROLL
        // ========================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });

        // ========================================
        // LOGO INTERACTION
        // ========================================
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            navLogo.addEventListener('mouseenter', () => {
                const slash = navLogo.querySelector('.logo-slash');
                slash.style.transform = 'skewX(-12deg) scale(1.15) rotate(5deg)';
            });
            
            navLogo.addEventListener('mouseleave', () => {
                const slash = navLogo.querySelector('.logo-slash');
                slash.style.transform = 'skewX(-12deg) scale(1)';
            });
        }

        // ========================================
        // FLOATING ELEMENTS PARALLAX
        // ========================================
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const floatingElements = document.querySelectorAll('.floating-element');
            
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.2;
                element.style.transform = `translate(${Math.sin(scrolled * 0.001) * 20}px, ${scrolled * speed}px)`;
            });
        });

        // ========================================
        // VIEWPORT HEIGHT FIX
        // ========================================
        function setVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        setVH();
        window.addEventListener('resize', setVH);

        // ========================================
        // CURSOR TRAIL EFFECT (OPTIONAL)
        // ========================================
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
