 // Alumni Expanded Data (with achievement added)
    const alumniData = [
        {
            id: 0,
            name: "Thabele Phangalele",
            classYear: "Class of 1999",
            role: "Founder, Developer & Community Digital Strategist | AbaNtu Intelligence",
            image: "images/TEPP.jpeg",
            badges: ["System Development", "Mentor", "Tech Innovator"],
            story: "After graduating from John Pama Primary, Thabele pursued Computer Science at the University of Cape Town. His passion for technology and community led him to found AbaNtu Intelligence, a tech startup focused on bridging the digital divide in underserved communities. Over the past 8 years, he has mentored over 200 young developers from Nyanga and surrounding townships, many of whom now work at leading tech companies. Thabele returns to John Pama every term to run coding workshops for Grade 6 and 7 learners, inspiring the next generation of digital innovators.",
            quote: "John Pama taught me that no dream is too big, regardless of where you come from. The foundation I received here was the launchpad for everything I've achieved. Now it's my turn to give back.",
            linkedin: "https://linkedin.com/in/thabele-phangalele",
            achievement: "Featured in Forbes Africa '30 Under 30' for Tech Innovation (2024)"
        },
        {
            id: 1,
            name: "Nomasonto Skweyiya",
            classYear: "Class of 2010",
            role: "Head of Department, WCED | Literacy Advocate",
            image: "images/jpp7.jpg",
            badges: ["Education Leadership", "Policy Making", "Literacy Advocate"],
            story: "Nomasonto's journey from John Pama to becoming a Head of Department at the Western Cape Education Department is a testament to the power of quality education. After completing her Bachelor of Education at Stellenbosch University, she spent 7 years teaching in rural Eastern Cape before returning to the Western Cape to drive policy change. Today, she leads a district-wide literacy initiative that has improved reading outcomes for over 15,000 learners across 45 schools. Nomasonto credits her foundation at John Pama for instilling in her the belief that every child deserves access to quality education.",
            quote: "I stand on the shoulders of teachers who believed in me at John Pama. Now I fight to ensure every learner has that same opportunity. Literacy is freedom, and freedom starts in the classroom.",
            linkedin: "https://linkedin.com/in/nomasonto-skweyiya",
            achievement: "WCED Excellence in Leadership Award (2025)"
        },
        {
            id: 2,
            name: "Vukile Mavula",
            classYear: "Class of 2015",
            role: "Professional Footballer, Cape Town City FC",
            image: "images/mavula.jfif",
            badges: ["Professional Sports", "Philanthropy", "Youth Mentor"],
            story: "Vukile's talent was first spotted on the dusty fields of Nyanga during inter-school tournaments. His dedication and skill earned him a spot in the Cape Town City FC academy at just 14. Today, he's a starting midfielder for the first team with over 100 appearances. Off the pitch, Vukile runs the 'Mavula Foundation,' which provides sports equipment and coaching clinics to underprivileged schools in the Cape Flats. Every off-season, he returns to John Pama to host a week-long football camp for current learners, with over 300 children participating annually.",
            quote: "The discipline and teamwork I learned at John Pama are still with me every time I step onto the pitch. I'm living proof that with hard work and the right support, you can make it from Nyanga to the big leagues.",
            linkedin: "https://linkedin.com/in/vukile-mavula",
            achievement: "PSL Young Player of the Year Nominee (2025)"
        }
    ];
    
    let currentAlumniIndex = 0;
    let alumniModalActive = false;
    const alumniModal = document.getElementById('alumniModal');
    
    function openAlumniModal(index) {
        currentAlumniIndex = index;
        const alumni = alumniData[currentAlumniIndex];
        
        // Populate modal content
        const modalImg = document.getElementById('alumniModalImage');
        if (modalImg) modalImg.src = alumni.image;
        
        const modalName = document.getElementById('alumniModalName');
        if (modalName) modalName.textContent = alumni.name;
        
        const modalClass = document.getElementById('alumniModalClass');
        if (modalClass) modalClass.textContent = alumni.classYear;
        
        const modalRole = document.getElementById('alumniModalRole');
        if (modalRole) modalRole.textContent = alumni.role;
        
        const modalStory = document.getElementById('alumniModalStory');
        if (modalStory) modalStory.textContent = alumni.story;
        
        const modalQuote = document.getElementById('alumniModalQuote');
        if (modalQuote) modalQuote.textContent = `"${alumni.quote}"`;
        
        const modalAchievement = document.getElementById('alumniModalAchievement');
        if (modalAchievement) modalAchievement.textContent = alumni.achievement;
        
        const modalLink = document.getElementById('alumniModalLink');
        if (modalLink) modalLink.href = alumni.linkedin;
        
        const modalCounter = document.getElementById('alumniModalCounter');
        if (modalCounter) modalCounter.textContent = `${currentAlumniIndex + 1} / ${alumniData.length}`;
        
        // Set badges
        const badge1 = document.getElementById('alumniModalBadge1');
        const badge2 = document.getElementById('alumniModalBadge2');
        const badge3 = document.getElementById('alumniModalBadge3');
        
        if (badge1) badge1.textContent = alumni.badges[0] || '';
        if (badge2) badge2.textContent = alumni.badges[1] || '';
        if (badge3) badge3.textContent = alumni.badges[2] || '';
        
        // Show modal
        if (alumniModal) {
            alumniModal.style.display = 'flex';
            setTimeout(() => alumniModal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
            alumniModalActive = true;
        }
    }
    
    function closeAlumniModal() {
        if (alumniModal) {
            alumniModal.classList.remove('active');
            setTimeout(() => {
                alumniModal.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
            alumniModalActive = false;
        }
    }
    
    function nextAlumniModal() {
        let nextIndex = currentAlumniIndex + 1;
        if (nextIndex >= alumniData.length) nextIndex = 0;
        openAlumniModal(nextIndex);
    }
    
    function prevAlumniModal() {
        let prevIndex = currentAlumniIndex - 1;
        if (prevIndex < 0) prevIndex = alumniData.length - 1;
        openAlumniModal(prevIndex);
    }
    
    // Attach event listeners after DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Alumni card click handlers
        const alumniCards = document.querySelectorAll('.alumni-card');
        alumniCards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.alumni-view-btn')) {
                    e.stopPropagation();
                    openAlumniModal(idx);
                }
            });
            
            const viewBtn = card.querySelector('.alumni-view-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openAlumniModal(idx);
                });
            }
        });
        
        // Modal close button
        const closeBtn = document.querySelector('.alumni-modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeAlumniModal);
        
        // Modal close button (inside content)
        const closeModalBtn = document.querySelector('.alumni-modal-close-btn');
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeAlumniModal);
        
        // Navigation arrows
        const prevBtn = document.querySelector('.alumni-modal-prev');
        const nextBtn = document.querySelector('.alumni-modal-next');
        if (prevBtn) prevBtn.addEventListener('click', prevAlumniModal);
        if (nextBtn) nextBtn.addEventListener('click', nextAlumniModal);
        
        // Close when clicking outside modal content
        if (alumniModal) {
            alumniModal.addEventListener('click', (e) => {
                if (e.target === alumniModal) closeAlumniModal();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (alumniModalActive && alumniModal.style.display === 'flex') {
                if (e.key === 'Escape') closeAlumniModal();
                if (e.key === 'ArrowRight') nextAlumniModal();
                if (e.key === 'ArrowLeft') prevAlumniModal();
            }
        });
    });