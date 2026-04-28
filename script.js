document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // 1. CUSTOM CURSOR — dual ring system
    // ============================================================
    const cursor = document.querySelector('.cursor');
    const trail = document.querySelector('.cursor-trail');

    let mouseX = -100, mouseY = -100;
    let trailX = -100, trailY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top  = `${mouseY}px`;
    });

    // Smooth trailing cursor using rAF
    const animateTrail = () => {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        trail.style.left = `${trailX}px`;
        trail.style.top  = `${trailY}px`;
        requestAnimationFrame(animateTrail);
    };
    animateTrail();

    const addHover    = () => { cursor.classList.add('hovered'); trail.classList.add('hovered'); };
    const removeHover = () => { cursor.classList.remove('hovered'); trail.classList.remove('hovered'); };

    const bindHoverTargets = () => {
        document.querySelectorAll('a, button, input, textarea, .hover-target, .video-item').forEach(el => {
            el.removeEventListener('mouseenter', addHover);
            el.removeEventListener('mouseleave', removeHover);
            el.addEventListener('mouseenter', addHover);
            el.addEventListener('mouseleave', removeHover);
        });
    };

    // ============================================================
    // 2. SCROLL REVEAL — Intersection Observer
    // ============================================================
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    const observeAll = () => {
        document.querySelectorAll('.reveal:not(.active)').forEach(el => revealObserver.observe(el));
    };

    observeAll();

    // Immediately reveal hero + nav
    setTimeout(() => {
        document.querySelectorAll('#hero .reveal, nav.reveal, .reel-ticker.reveal').forEach(el => el.classList.add('active'));
    }, 80);

    // ============================================================
    // 3. REEL COUNTER — counts up with scroll progress
    // ============================================================
    const reelNum = document.getElementById('reel-counter');
    let currentFrame = 0;

    const updateReel = () => {
        const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const target = Math.round(scrollPct * 99);
        if (target !== currentFrame) {
            currentFrame = target;
            if(reelNum) reelNum.textContent = String(currentFrame).padStart(2, '0');
        }
    };

    window.addEventListener('scroll', updateReel, { passive: true });

    // ============================================================
    // 4. VIDEO DATABASE
    // ============================================================
    const videoDatabase = [
        { title: "Taskaree: The Smuggler's Web", url: "https://www.youtube.com/embed/gKhfbEpM45E" },
        { title: "The Ba***ds Of Bollywood", url: "https://www.youtube.com/embed/J-0f7teDD2I" },
        { title: "Drone Official Trailer #1", url: "https://www.youtube.com/embed/9UqxCUrT5-Y" },
        { title: "Freedom At Midnight", url: "https://www.youtube.com/embed/Pc3Qhwoi8-Y" },
        { title: "Pyar Paisa Profit", url: "https://www.youtube.com/embed/oFA0Zx3pQaU" },
        { title: "Indian Police Force Season 1", url: "https://www.youtube.com/embed/6Jr4lNiK6XE" },
        { title: "DC Jewellers", url: "https://www.youtube.com/embed/KpHx6Pa3PJ8" },
        { title: "JadeBlue Spring Summer '24", url: "https://www.youtube.com/embed/4jur0HUFbeg" },
        { title: "BGAUSS RUV", url: "https://www.youtube.com/embed/vVsIVMn3wK8" },
        { title: "#RatingsAndReviews", url: "https://www.youtube.com/embed/05BxOH5-CT4" },
        { title: "Nazaara Sufiverse", url: "https://www.youtube.com/embed/LjKvJNWRExs" },
        { title: "Rajnigandha Pearls", url: "https://www.youtube.com/embed/JeukQPGqLEM" },
        { title: "#PriceTrends", url: "https://www.youtube.com/embed/RU2-v1g6qvk" },
        { title: "ARGHAAN Luxury Incense Sticks", url: "https://www.youtube.com/embed/TwRFHZxCAXM" },
        { title: "Navratna Thanda Powder", url: "https://www.youtube.com/embed/xXhxb1GiNlo" },
        { title: "Dhoom Dhadaka", url: "https://www.youtube.com/embed/wgMTg9ntnZg" },
        { title: "Waada Sanam - JNU", url: "https://www.youtube.com/embed/ndwYaqYtpZU" },
        { title: "Cottonking", url: "https://www.youtube.com/embed/8Z0i8ag3Ldg" },
        { title: "IGNIS | THE TOUGH URBAN", url: "https://www.youtube.com/embed/df9hlqFcw8Y" },
        { title: "Sannata - JNU", url: "https://www.youtube.com/embed/RucNBT9Maa8" },
        { title: "Har Pal Har Dil Borosil", url: "https://www.youtube.com/embed/FpBwBQd-uNQ" },
        { title: "ARTHAAT", url: "https://www.youtube.com/embed/zODPFm2FmXs" },
        { title: "Raahie - Intezaar", url: "https://www.youtube.com/embed/v8DvVqbWLrs" },
        { title: "Main Nahi Manta - JNU", url: "https://www.youtube.com/embed/uFCFmn3d0Tw" },
        { title: "Kashi Vishwanath Temple", url: "https://www.youtube.com/embed/X0q1bERPzwY" },
        { title: "काय होणार नकुशीच्या आयुष्यात?", url: "https://www.youtube.com/embed/moLtsUnM6UQ" },
        { title: "Jai Shiv Shambhu", url: "https://www.youtube.com/embed/YSGHhwZS0_Y" },
        { title: "Borosil - Har pal, Har Dil", url: "https://www.youtube.com/embed/Rj-NHGqWcFs" },
        { title: "Captain's approval - Pintola", url: "https://www.youtube.com/embed/3-VszjwXETQ" },
        { title: "CottonKing | #DisconnectToReconnect", url: "https://www.youtube.com/embed/O6lcc1_03ls" },
        { title: "Borosil Stainless Steel", url: "https://www.youtube.com/embed/AqaO0WyGpJE" },
        { title: "#ItsOurNature World Environment Day 2022", url: "https://www.youtube.com/embed/KDThdBT7TMo" },
        { title: "Sonic Happiness Ki Class", url: "https://www.youtube.com/embed/Cexsv3neMOA" },
        { title: "Sonic | Happy Go Lucky Contest", url: "https://www.youtube.com/embed/bN8SoJOy-Tk" },
        { title: "Kashi Vishwanath", url: "https://www.youtube.com/embed/L_p6sgDrwic" },
        { title: "Bank of Maharashtra", url: "https://www.youtube.com/embed/ZHYE9DjMb0A" },
        { title: "Swad Candy", url: "https://www.youtube.com/embed/W7OOKYjgIMY" },
        { title: "Fem | Women's Day", url: "https://www.youtube.com/embed/I8QRq2BZIOM" },
        { title: "Zing Game On", url: "https://www.youtube.com/embed/5goYTWOoBmc" },
        { title: "Vote Desh Ke Liye", url: "https://www.youtube.com/embed/tv_EdMEkaao" },
        { title: "Kantilal Coma Se Bahar", url: "https://www.youtube.com/embed/aktbbSiwXmA" },
        { title: "MP VS MLA", url: "https://www.youtube.com/embed/Ai5jmJdaPZ8" },
        { title: "JNU Official Trailer", url: "https://www.youtube.com/embed/OVQRon2MJJU" },
        { title: "ANTHE 2024", url: "https://www.youtube.com/embed/6AKtGRZoTFY" },
        { title: "Star Pravah Promo", url: "https://www.youtube.com/embed/1wAZD2FkPRc" },
        { title: "INFECTION Trailer", url: "https://www.youtube.com/embed/d2fIW9RY3d8" },
        { title: "HeRosh!", url: "https://www.youtube.com/embed/9vFAPqILVsU" },
        { title: "Kahaan Main Dhoondhta", url: "https://www.youtube.com/embed/asvTe3E6vtY" },
        // Vimeo
        { title: "DC Jewellers | The Gold Diamond Ad", url: "https://player.vimeo.com/video/1176953293" },
        { title: "#ItsOurNature | Tata Tiscon", url: "https://player.vimeo.com/video/1176951012" },
        { title: "Shemaroo Bhakti Shrimad Bhagavad Gita", url: "https://player.vimeo.com/video/1176945925" },
        { title: "Har Pal Har Dil Borosil", url: "https://player.vimeo.com/video/1176945652" },
        { title: "Trip to temples Ad Film", url: "https://player.vimeo.com/video/1176944985" },
        { title: "JadeBlue Spring Summer '24", url: "https://player.vimeo.com/video/1176944596" },
        { title: "Fan Milk - Joy Will Find You", url: "https://player.vimeo.com/video/1176944114" },
        { title: "ANTHE 2024", url: "https://player.vimeo.com/video/1176943346" },
        { title: "#RatingsAndReviews", url: "https://player.vimeo.com/video/1176942932" },
        { title: "#PriceTrends", url: "https://player.vimeo.com/video/1176942522" },
        { title: "Zing Game On", url: "https://player.vimeo.com/video/455074008" },
        { title: "Nissan India", url: "https://player.vimeo.com/video/455073835" },
        { title: "Shemaroo Bhakti (Vertical)", url: "https://player.vimeo.com/video/455071645" },
        { title: "Before the vows Trailer", url: "https://player.vimeo.com/video/455071430" },
        { title: "Lokmat's #MeBappaBoltoy", url: "https://player.vimeo.com/video/455071134" },
        { title: "Mahabharat Re-Launch", url: "https://player.vimeo.com/video/455070982" },
        { title: "Fan Milk (Ghana)", url: "https://player.vimeo.com/video/455070541" },
        { title: "Children's Hope India", url: "https://player.vimeo.com/video/455070309" },
        { title: "Alia Short Film Trailer", url: "https://player.vimeo.com/video/455069551" },
        { title: "#MTVNishedh World TB Day", url: "https://player.vimeo.com/video/455068854" },
        { title: "Seventh the film", url: "https://player.vimeo.com/video/422090738" }
    ];

    const videosPerPage = 6;
    let currentCount = 0;

    const videoGrid  = document.getElementById('video-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const shownEl    = document.getElementById('archive-shown');
    const totalEl    = document.getElementById('archive-total');

    if (totalEl) totalEl.textContent = videoDatabase.length;

    const updateCount = () => {
        if (shownEl) shownEl.textContent = Math.min(currentCount, videoDatabase.length);
    };

    const renderVideos = () => {
        const batch = videoDatabase.slice(currentCount, currentCount + videosPerPage);

        batch.forEach((video, i) => {
            const item = document.createElement('div');
            item.classList.add('video-item');
            item.style.animationDelay = `${i * 0.08}s`;

            // Build correct embed URL with autoplay params disabled by default
            const safeUrl = video.url.includes('?')
                ? video.url + '&rel=0&modestbranding=1'
                : video.url + '?rel=0&modestbranding=1';

            item.innerHTML = `
                <div class="video-wrapper">
                    <iframe
                        src="${safeUrl}"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen
                        loading="lazy"
                        title="${video.title}"
                    ></iframe>
                </div>
                <div class="play-icon"></div>
                <div class="video-info">
                    <h4>${video.title}</h4>
                </div>
            `;

            // Click to enable interaction with iframe
            item.addEventListener('click', () => {
                // Remove active from all others
                document.querySelectorAll('.video-item.active-play').forEach(el => {
                    if (el !== item) el.classList.remove('active-play');
                });
                item.classList.toggle('active-play');
            });

            videoGrid.appendChild(item);
        });

        currentCount += batch.length;
        updateCount();

        // Re-run observers and hover bindings
        observeAll();
        bindHoverTargets();

        if (currentCount >= videoDatabase.length) {
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        }
    };

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderVideos);
    }

    // Initial render
    renderVideos();
    bindHoverTargets();

    // ============================================================
    // 5. CONTACT FORM — Active AJAX Submission via Web3Forms
    // ============================================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page reload
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            // UI Feedback: Show sending state
            btnText.textContent = "Sending...";
            submitBtn.style.pointerEvents = "none";
            submitBtn.style.opacity = "0.7";

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Success state
                    btnText.textContent = "Message Sent!";
                    contactForm.reset(); // Clear the form
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        btnText.textContent = originalText;
                        submitBtn.style.pointerEvents = "auto";
                        submitBtn.style.opacity = "1";
                    }, 3000);
                } else {
                    // Error state from API
                    console.log(data);
                    btnText.textContent = "Error. Try Again.";
                    submitBtn.style.pointerEvents = "auto";
                    submitBtn.style.opacity = "1";
                }
            } catch (error) {
                // Network error state
                console.error(error);
                btnText.textContent = "Error. Try Again.";
                submitBtn.style.pointerEvents = "auto";
                submitBtn.style.opacity = "1";
            }
        });
    }

});