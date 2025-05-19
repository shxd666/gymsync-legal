document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scroll for navigation links and coming soon popups
    document.querySelectorAll('header nav a, .pricing-card a[href^="#"], .hero-cta a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                const actualId = targetId.substring(1);
                const targetElement = document.getElementById(actualId);

                if (targetElement) {
                    e.preventDefault();
                    if (actualId.startsWith('coming-soon')) {
                        targetElement.style.display = 'block';
                        targetElement.style.opacity = '1'; // For fade-in if using CSS transitions
                        setTimeout(() => {
                            targetElement.style.opacity = '0';
                            setTimeout(() => { targetElement.style.display = 'none';}, 300); // Match CSS transition
                        }, 3000);
                    } else {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                } else if (actualId.startsWith('coming-soon')) { // Fallback for hrefs not matching p tag ids
                     e.preventDefault();
                     alert(this.textContent.replace(/\s*\(Coming Soon!\)$/i, '').replace(/\s*\(Coming Soon!\s*-\s*Click to be notified\)$/i, '') + " is coming soon!");
                }
            }
        });
    });

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function () {
            const isExpanded = mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', isExpanded);
            this.classList.toggle('active');
        });
    }
});