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
        // FORM STATUS MESSAGE HELPER
        // ========================================
        function showFormMessage(form, message, isError = false) {
            // Remove existing message if any
            const existingMessage = form.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create message element
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message ${isError ? 'form-message-error' : 'form-message-success'}`;
            messageDiv.textContent = message;
            messageDiv.style.cssText = `
                padding: 16px;
                margin-top: 16px;
                border-radius: 8px;
                text-align: center;
                font-weight: 600;
                grid-column: 1 / -1;
                ${isError 
                    ? 'background: #fee2e2; color: #dc2626; border: 1px solid #fecaca;' 
                    : 'background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0;'}
            `;
            
            form.appendChild(messageDiv);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }

        // ========================================
        // SET BUTTON LOADING STATE
        // ========================================
        function setButtonLoading(button, isLoading) {
            if (isLoading) {
                button.disabled = true;
                button.dataset.originalText = button.innerHTML;
                button.innerHTML = '<span>Sending...</span>';
                button.style.opacity = '0.7';
            } else {
                button.disabled = false;
                button.innerHTML = button.dataset.originalText || '<span>Submit</span>';
                button.style.opacity = '1';
            }
        }

        // ========================================
        // EMAIL CAPTURE (Hero Section)
        // ========================================
        async function captureEmail(inputId) {
            const emailInput = document.getElementById(inputId);
            const button = emailInput.parentElement.querySelector('button');
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
            
            // Set loading state
            setButtonLoading(button, true);
            
            try {
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert(data.message);
                    emailInput.value = '';
                } else {
                    alert(data.error || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Unable to connect to server. Please try again later or email us directly.');
            } finally {
                setButtonLoading(button, false);
            }
        }

        // ========================================
        // CONTACT FORM SUBMISSION (index.html)
        // ========================================
        const contactForm = document.getElementById('main-contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    company: document.getElementById('company').value.trim(),
                    position: document.getElementById('position').value.trim(),
                    message: document.getElementById('message').value.trim()
                };
                
                // Client-side validation
                if (!formData.name || !formData.email || !formData.company || !formData.position || !formData.message) {
                    showFormMessage(contactForm, 'Please fill in all required fields.', true);
                    return;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    showFormMessage(contactForm, 'Please enter a valid email address.', true);
                    return;
                }
                
                // Set loading state
                setButtonLoading(submitButton, true);
                
                try {
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        showFormMessage(contactForm, data.message, false);
                        contactForm.reset();
                    } else {
                        showFormMessage(contactForm, data.error || 'Something went wrong. Please try again.', true);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    showFormMessage(contactForm, 'Unable to connect to server. Please try again later or email us directly at info@linearmarketingsolutions.com', true);
                } finally {
                    setButtonLoading(submitButton, false);
                }
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

        // Smooth cursor animation (optional - uncomment to enable)
        // function animateCursor() {
        //     cursorX += (mouseX - cursorX) * 0.1;
        //     cursorY += (mouseY - cursorY) * 0.1;
        //     requestAnimationFrame(animateCursor);
        // }
        // animateCursor();

        // ========================================
        // CLOSE MOBILE MENU ON LINK CLICK
        // ========================================
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                if (navLinks && mobileMenuToggle) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
