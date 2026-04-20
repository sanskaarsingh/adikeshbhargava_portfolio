document.addEventListener("DOMContentLoaded", () => {
    // 1. Custom Cinematic Cursor
    const cursor = document.querySelector('.cursor');
    const hoverTargets = document.querySelectorAll('a, .project, .scroll-indicator');

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Add cinematic expansion effect on interactive elements
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });

    // 2. Cinematic Scroll Reveals (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add the 'active' class to trigger CSS transition
                entry.target.classList.add('active');
                // Stop observing once revealed to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Trigger initial hero animations instantly
    setTimeout(() => {
        document.querySelectorAll('#hero .reveal, nav.reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);
});