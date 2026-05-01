// ----- VIDEO SLIDER LOGIC FOR 6 VIDEOS -----
        // ========== VIDEO SLIDER LOGIC - 6 VIDEOS ==========
const videoElement = document.getElementById('bg-video');
const videosData = document.getElementById('video-source-data');
let videos = [];

// Parse video paths from data attribute
try {
    videos = JSON.parse(videosData.getAttribute('data-videos'));
    // Ensure we have valid video paths
    if (!Array.isArray(videos) || videos.length === 0) {
        throw new Error('Invalid video data');
    }
} catch(e) {
    console.error("Error parsing video data:", e);
    // Fallback videos - ensure exactly 6
    videos = [
        "https://videos.pexels.com/video-files/3195393/3195393-uhd_2560_1440_24fps.mp4",
        "https://videos.pexels.com/video-files/8739370/8739370-uhd_2560_1440_25fps.mp4",
        "https://videos.pexels.com/video-files/5483162/5483162-uhd_2560_1440_25fps.mp4",
        "https://videos.pexels.com/video-files/4231086/4231086-uhd_2560_1440_30fps.mp4",
        "https://videos.pexels.com/video-files/3195396/3195396-uhd_2560_1440_24fps.mp4",
        "https://videos.pexels.com/video-files/854975/854975-uhd_2560_1440_25fps.mp4"
    ];
}

const videoCount = videos.length;
let currentVideoIndex = 0;
let autoRotateInterval = null;
let isUserInteracting = false;

console.log(`🎬 Loaded ${videoCount} videos for background slider`);

// Generate dots based on video count
const dotsContainer = document.getElementById('videoDotsContainer');

function generateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < videoCount; i++) {
        const dot = document.createElement('div');
        dot.className = `video-dot w-3 h-3 rounded-full bg-white/50 transition-all duration-200`;
        if (i === currentVideoIndex) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => {
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            changeVideo(i);
            startAutoRotate();
        });
        dotsContainer.appendChild(dot);
    }
}

function updateActiveDot(index) {
    const allDots = document.querySelectorAll('.video-dot');
    allDots.forEach((dot, i) => {
        if (i === index) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function changeVideo(index) {
    if (index === currentVideoIndex) return;
    if (index < 0 || index >= videoCount) return;
    
    currentVideoIndex = index;
    const newVideoPath = videos[currentVideoIndex];
    
    // Fade out video
    videoElement.style.opacity = '0';
    
    setTimeout(() => {
        videoElement.src = newVideoPath;
        videoElement.load();
        
        // Attempt to play with error handling
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log(`Video ${index} autoplay prevented:`, error);
                // Handle autoplay restriction - will play on user interaction
            });
        }
        
        // Fade back in
        videoElement.style.opacity = '1';
        updateActiveDot(currentVideoIndex);
    }, 200);
}

function nextVideo() {
    let next = (currentVideoIndex + 1) % videoCount;
    changeVideo(next);
}

function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
        if (!isUserInteracting) {
            nextVideo();
        }
    }, 7000); // Change every 7 seconds
}

function pauseAutoRotate() {
    isUserInteracting = true;
    if (autoRotateInterval) clearInterval(autoRotateInterval);
}

function resumeAutoRotate() {
    isUserInteracting = false;
    startAutoRotate();
}

// Initialize video slider
function initVideoSlider() {
    generateDots();
    
    // Set initial video
    if (videos.length > 0) {
        videoElement.src = videos[0];
        videoElement.load();
        videoElement.play().catch(e => console.log("Autoplay blocked. User interaction will start video."));
    }
    
    startAutoRotate();
    
    // Pause auto-rotate on dot hover
    if (dotsContainer) {
        dotsContainer.addEventListener('mouseenter', pauseAutoRotate);
        dotsContainer.addEventListener('mouseleave', resumeAutoRotate);
    }
}

// Handle mobile autoplay restrictions
let hasUserInteracted = false;
function handleFirstInteraction() {
    if (!hasUserInteracted) {
        hasUserInteracted = true;
        if (videoElement.paused) {
            videoElement.play().catch(e => console.log("Still blocked by browser"));
        }
    }
}

// Set up event listeners for first interaction
document.body.addEventListener('touchstart', handleFirstInteraction);
document.body.addEventListener('click', handleFirstInteraction);

// Start everything when page loads
window.addEventListener('load', () => {
    initVideoSlider();
});
        
        // ---------- HAMBURGER MENU LOGIC ----------
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const fullscreenMenu = document.getElementById('fullscreenMenu');
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        
        function openMenu() {
            fullscreenMenu.classList.remove('translate-x-full');
            fullscreenMenu.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden';
            pauseAutoRotate(); // pause videos while menu is open
        }
        
        function closeMenu() {
            fullscreenMenu.classList.remove('translate-x-0');
            fullscreenMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
            resumeAutoRotate();
        }
        
        hamburgerBtn.addEventListener('click', openMenu);
        closeMenuBtn.addEventListener('click', closeMenu);
        
        // Close menu when clicking on any nav link
        document.querySelectorAll('#fullscreenMenu a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Handle mobile autoplay restrictions – start video on first user interaction
        let hasUserInteracted = false;
        function handleFirstInteraction() {
            if (!hasUserInteracted) {
                hasUserInteracted = true;
                if (videoElement.paused) {
                    videoElement.play().catch(e => console.log("Still blocked"));
                }
            }
        }
        
        document.body.addEventListener('touchstart', handleFirstInteraction);
        document.body.addEventListener('click', handleFirstInteraction);
        
        // Start everything when page loads
        window.addEventListener('load', () => {
            initVideoSlider();
        });
        
        // Optional: Log video paths for debugging
        console.log("🎬 Loaded", videoCount, "videos:", videos);