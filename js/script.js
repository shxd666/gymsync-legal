document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scroll for navigation links and coming soon popups
    document.querySelectorAll('.main-nav a, .pricing-card a[href^="#"], .hero-cta a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                const actualId = targetId.substring(1);
                const targetElement = document.getElementById(actualId);

                if (targetElement) {
                    e.preventDefault();
                    // Close mobile nav if open and link is clicked
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        mobileNavToggle.classList.remove('active');
                        mobileNavToggle.setAttribute('aria-expanded', 'false');
                    }

                    if (actualId.startsWith('coming-soon')) {
                        targetElement.style.display = 'block';
                        // Trigger reflow to enable transition
                        //offsetHeight is a common trick
                        targetElement.offsetHeight; 
                        targetElement.style.opacity = '1';
                        
                        setTimeout(() => {
                            targetElement.style.opacity = '0';
                            setTimeout(() => { targetElement.style.display = 'none';}, 300); 
                        }, 3000);
                    } else {
                        // Calculate offset for fixed header
                        const headerOffset = document.querySelector('.site-header').offsetHeight || 70;
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset - 10; // 10px extra padding

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                } else if (actualId.startsWith('coming-soon')) { 
                     e.preventDefault();
                     alert(this.textContent.replace(/\s*\(Coming Soon!\)$/i, '').replace(/\s*\(Coming Soon!\s*-\s*Click to be notified\)$/i, '') + " is coming soon!");
                }
            }
        });
    });

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const siteHeader = document.querySelector('.site-header');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function () {
            const isExpanded = mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', isExpanded.toString());
            this.classList.toggle('active');
            // Optional: Prevent body scroll when mobile menu is open
            // document.body.classList.toggle('no-scroll', isExpanded);
        });
    }

    // Optional: Add class to header on scroll
    // window.addEventListener('scroll', function() {
    //     if (window.scrollY > 50) {
    //         siteHeader.classList.add('scrolled');
    //     } else {
    //         siteHeader.classList.remove('scrolled');
    //     }
    // });
});