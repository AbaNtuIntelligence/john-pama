 // Particle generation on menu open
    function generateParticles() {
        const container = document.getElementById('particleContainer');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = '-' + Math.random() * 20 + '%';
            particle.style.width = particle.style.height = Math.random() * 6 + 2 + 'px';
            particle.style.background = `rgba(0, 255, 102, ${Math.random() * 0.5 + 0.2})`;
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = Math.random() * 3 + 2 + 's';
            container.appendChild(particle);
        }
    }


        // ============================================
        // VIDEO SLIDER WITH 6 VIDEOS
        // ============================================
        
        const videoSources = [
            "images/johnPama.mp4",
            "images/jp9.mp4",
            "images/jp10.mp4",
            "images/jp11.mp4",
            "images/jp3.mp4",
            "images/jp8.mp4"
        ];
        
        const videoElement = document.getElementById('heroVideo');
        const dotsContainer = document.getElementById('videoDots');
        let currentIndex = 0;
        let slideInterval;
        
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < videoSources.length; i++) {
                const dot = document.createElement('div');
                dot.className = 'video-dot';
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    goToVideo(i);
                    startAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateActiveDot(index) {
            const dots = document.querySelectorAll('.video-dot');
            dots.forEach((dot, i) => {
                if (i === index) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }
        
        function goToVideo(index) {
            if (index === currentIndex) return;
            if (index < 0 || index >= videoSources.length) return;
            
            currentIndex = index;
            const newVideoPath = videoSources[currentIndex];
            
            videoElement.style.opacity = '0';
            
            setTimeout(() => {
                videoElement.src = newVideoPath;
                videoElement.load();
                videoElement.play().catch(e => console.log('Autoplay prevented:', e));
                videoElement.style.opacity = '1';
                updateActiveDot(currentIndex);
            }, 200);
        }
        
        function nextVideo() {
            let next = (currentIndex + 1) % videoSources.length;
            goToVideo(next);
        }
        
        function startAutoSlide() {
            slideInterval = setInterval(() => {
                nextVideo();
            }, 7000);
        }
        
        function initVideoSlider() {
            createDots();
            videoElement.src = videoSources[0];
            videoElement.load();
            videoElement.play().catch(e => console.log('Autoplay prevented. Click anywhere to start.'));
            startAutoSlide();
            
            if (dotsContainer) {
                dotsContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
                dotsContainer.addEventListener('mouseleave', startAutoSlide);
            }
        }
        
        let userInteracted = false;
        function handleUserInteraction() {
            if (!userInteracted) {
                userInteracted = true;
                if (videoElement.paused) {
                    videoElement.play().catch(e => console.log('Still blocked'));
                }
            }
        }
        
        document.body.addEventListener('click', handleUserInteraction);
        document.body.addEventListener('touchstart', handleUserInteraction);
        
        // ============================================
        // FULLSCREEN MENU FUNCTIONS
        // ============================================
        
        const fullscreenMenu = document.getElementById('fullscreenMenu');
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const closeMenuBtn = document.querySelector('.menu-close');
        const particleContainer = document.getElementById('particleContainer');
        
        function generateParticles() {
            if (!particleContainer) return;
            particleContainer.innerHTML = '';
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.background = '#00ff66';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.bottom = '-' + Math.random() * 30 + '%';
                particle.style.width = particle.style.height = Math.random() * 6 + 2 + 'px';
                particle.style.pointerEvents = 'none';
                particle.style.opacity = '0.6';
                particle.style.animation = `floatParticle ${Math.random() * 2 + 2}s ease-out forwards`;
                particleContainer.appendChild(particle);
            }
            setTimeout(() => {
                if (particleContainer) particleContainer.innerHTML = '';
            }, 4000);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% { transform: translateY(0) scale(0); opacity: 0.6; }
                100% { transform: translateY(-100px) scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        function openMenu() {
            fullscreenMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
            generateParticles();
        }
        
        function closeMenu() {
            fullscreenMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
        
        if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && fullscreenMenu.classList.contains('open')) {
                closeMenu();
            }
        });
        
        if (fullscreenMenu) {
            fullscreenMenu.addEventListener('click', (e) => {
                if (e.target === fullscreenMenu) closeMenu();
            });
        }
        
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        window.addEventListener('load', () => {
            initVideoSlider();
        });
        
        console.log(`✅ Loaded ${videoSources.length} videos for hero slider`);