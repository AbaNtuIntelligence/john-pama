
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
        
        window.addEventListener('load', () => {
            initVideoSlider();
        });
        
        console.log(`✅ Loaded ${videoSources.length} videos for hero slider`);