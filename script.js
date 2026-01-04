// MVGRCE MUN Website - JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    navLinksItems.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    const offsetTop = target.offsetTop - 100; // Account for sticky navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // Update URL without reloading
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 120; // Offset for sticky navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Handle home section (at top of page)
        if (window.scrollY < 100) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Update active link on page load based on hash
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                updateActiveNavLink();
            }, 100);
        }
    } else {
        updateActiveNavLink();
    }

    // Form submission handler
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value,
                rollNumber: document.getElementById('rollNumber').value,
                email: document.getElementById('email').value,
                department: document.getElementById('department').value
            };

            // Basic validation
            if (!formData.fullName || !formData.rollNumber || !formData.email || !formData.department) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission (replace with actual API call)
            alert('Registration submitted successfully! We will contact you soon.');
            registrationForm.reset();
        });
    }
});
