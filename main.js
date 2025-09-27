
    // Set last updated date
    document.getElementById('last-updated').textContent = new Date().toLocaleDateString();
    
    // Status text typing animation
    const statusTexts = [
        "Building intelligent systems",
        "Optimizing inference for hardware",
        "Training multimodal models",
        "Designing model architectures",
        "Singing Hindustani Classical Music",
        "Available for collaborations"
    ];
    
    let currentStatusIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    let cursorVisible = true;
    let cursorBlinkTimer = null;
    
    function setCursorBlink(shouldBlink) {
        // Clear any existing timer
        if (cursorBlinkTimer) {
            clearInterval(cursorBlinkTimer);
            cursorBlinkTimer = null;
        }
        
        if (shouldBlink) {
            // Start blinking
            cursorVisible = true; // Start visible
            cursorBlinkTimer = setInterval(() => {
                cursorVisible = !cursorVisible;
                updateDisplay();
            }, 530);
        } else {
            // Keep cursor solid
            cursorVisible = true;
        }
    }
    
    function updateDisplay() {
        const statusElement = document.getElementById('status-text');
        const currentText = statusTexts[currentStatusIndex];
        const displayText = currentText.substring(0, currentCharIndex);
        const cursor = cursorVisible ? '<span class="typing-cursor">|</span>' : '<span class="typing-cursor" style="opacity:0;">|</span>';
        
        statusElement.innerHTML = displayText + cursor;
    }
    
    function typeStatus() {
        const currentText = statusTexts[currentStatusIndex];
        
        if (!isDeleting && currentCharIndex <= currentText.length) {
            // Typing phase - solid cursor
            setCursorBlink(false);
            updateDisplay();
            currentCharIndex++;
            typeSpeed = Math.random() * 120 + 60; // 60-180ms for realistic typing
            
            if (currentCharIndex > currentText.length) {
                // Done typing, pause with blinking cursor
                isDeleting = true;
                setCursorBlink(true);
                typeSpeed = 2000; // 2 second pause
            }
            
        } else if (isDeleting && currentCharIndex >= 0) {
            // Deleting phase - solid cursor
            setCursorBlink(false);
            updateDisplay();
            currentCharIndex--;
            typeSpeed = 35; // Fast deletion
            
            if (currentCharIndex < 0) {
                // Done deleting, move to next text
                isDeleting = false;
                currentStatusIndex = (currentStatusIndex + 1) % statusTexts.length;
                currentCharIndex = 0;
                setCursorBlink(true);
                typeSpeed = 1000; // 1 second pause before next text
            }
        }
        
        setTimeout(typeStatus, typeSpeed);
    }
    
    // Start the typing animation
    typeStatus();

    // Tab switching
    function switchTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab content
        document.getElementById(tabName).classList.add('active');
        
        // Add active class to clicked tab
        event.target.classList.add('active');
    }

    // Add some interactive elements
    document.querySelectorAll('.project-item, .experience-card, .education-card').forEach((item, index) => {
        item.style.animationDelay = `${0.1 * index}s`;
    });

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
