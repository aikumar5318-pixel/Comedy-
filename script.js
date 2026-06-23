/* ============================================
   GLOBAL VARIABLES
   ============================================ */

let allVideos = [];
let currentFilter = 'all';
const welcomePopupShown = localStorage.getItem('welcomePopupShown');

/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Atrangi Comedy Website Loaded!');
    
    // Show welcome popup
    showWelcomePopup();
    
    // Initialize videos
    initializeVideos();
    
    // Add scroll animations
    observeElements();
    
    // Show notification after 3 seconds
    setTimeout(() => {
        showNotification();
    }, 3000);
    
    // Handle form submission
    handleFormSubmission();
});

/* ============================================
   WELCOME POPUP FUNCTIONS
   ============================================ */

function showWelcomePopup() {
    const popup = document.getElementById('welcomePopup');
    
    // Show popup only once per session (unless cleared)
    if (!welcomePopupShown) {
        popup.classList.remove('hidden');
        popup.style.display = 'flex';
        localStorage.setItem('welcomePopupShown', 'true');
    }
}

function closeWelcomePopup() {
    const popup = document.getElementById('welcomePopup');
    popup.style.display = 'none';
    popup.classList.add('hidden');
}

/* ============================================
   NOTIFICATION FUNCTIONS
   ============================================ */

function showNotification() {
    const notification = document.getElementById('notificationPopup');
    notification.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeNotification();
    }, 5000);
}

function closeNotification() {
    const notification = document.getElementById('notificationPopup');
    notification.classList.remove('show');
}

/* ============================================
   VIDEO FUNCTIONS
   ============================================ */

// Sample video data
const videoDatabase = [
    {
        id: 1,
        title: 'Sharma Aunty vs Smartphone',
        emoji: '📱',
        category: 'sharma',
        link: 'zeJj2nW7g2E'
    },
    {
        id: 2,
        title: 'CCTV Aunty Caught Me',
        emoji: '📹',
        category: 'cctv',
        link: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 3,
        title: 'Trending Desi Meme #1',
        emoji: '😂',
        category: 'trending',
        link: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 4,
        title: 'Sharma Aunty At Wedding',
        emoji: '💒',
        category: 'sharma',
        link: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 5,
        title: 'CCTV Found Everything',
        emoji: '🔍',
        category: 'cctv',
        link: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 6,
        title: 'Viral Comedy Gold',
        emoji: '⭐',
        category: 'trending',
        link: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
];

function initializeVideos() {
    allVideos = videoDatabase;
    displayVideos('all');
}

function displayVideos(filter) {
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = '';
    
    let filteredVideos = allVideos;
    
    if (filter !== 'all') {
        filteredVideos = allVideos.filter(video => video.category === filter);
    }
    
    filteredVideos.forEach((video, index) => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        videoCard.innerHTML = `
            <div class="video-thumbnail">${video.emoji}</div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>Amazing Comedy Short</p>
                <span class="video-tag">${video.category.toUpperCase()}</span>
            </div>
        `;
        
        videoCard.addEventListener('click', () => openVideoModal(video.link));
        videosGrid.appendChild(videoCard);
    });
}

function filterVideos(category) {
    currentFilter = category;
    
    // Update active button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    displayVideos(category);
}

function openVideoModal(videoLink) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = videoLink;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    modal.style.display = 'none';
    videoFrame.src = '';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeModal();
    }
});

/* ============================================
   NAVIGATION FUNCTIONS
   ============================================ */

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
}

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

/* ============================================
   LINK FUNCTIONS
   ============================================ */

function openLink(url) {
    if (url.startsWith('mailto:')) {
        window.location.href = url;
    } else {
        window.open(url, '_blank');
    }
}

/* ============================================
   FORM SUBMISSION
   ============================================ */

function handleFormSubmission() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Create pop-up notification
            createCustomPopup('Message Sent! 🎉', 'Thank you for contacting us. We will get back to you soon!');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            // Submit to formspree (async)
            setTimeout(() => {
                form.submit();
            }, 1000);
        });
    }
}

/* ============================================
   CUSTOM POPUP FUNCTION
   ============================================ */

function createCustomPopup(title, message) {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
        <div class="popup-content" style="animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div class="popup-close" onclick="this.parentElement.parentElement.remove()">&times;</div>
            <h2 style="color: #e94560; margin-bottom: 1rem;">${title}</h2>
            <p style="color: #ccc; margin-bottom: 1.5rem; font-size: 1.1rem;">${message}</p>
            <button class="btn btn-primary" onclick="this.closest('.popup-overlay').remove();">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Auto-close after 4 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 4000);
}

/* ============================================
   MOUSE FOLLOW EFFECT (Optional Enhancement)
   ============================================ */

document.addEventListener('mousemove', function(e) {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    });
});

/* ============================================
   PARALLAX EFFECT
   ============================================ */

window.addEventListener('scroll', function() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrollPosition = window.scrollY;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

/* ============================================
   KEYBOARD SHORTCUTS
   ============================================ */

document.addEventListener('keydown', function(e) {
    // Escape key closes modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        if (modal.style.display === 'block') {
            closeModal();
        }
    }
    
    // S key scrolls to subscribe
    if (e.key === 's' || e.key === 'S') {
        scrollToSection('home');
    }
    
    // C key scrolls to contact
    if (e.key === 'c' || e.key === 'C') {
        scrollToSection('contact');
    }
});

/* ============================================
   DYNAMIC TEXT ANIMATION
   ============================================ */

function typewriterEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ============================================
   PAGE VISIBILITY DETECTION
   ============================================ */

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        console.log('👋 Come back soon!');
    } else {
        // Page is visible
        console.log('🎬 Welcome back to Atrangi Comedy!');
        // Could show notification here
    }
});

/* ============================================
   AUDIO FEEDBACK (Optional)
   ============================================ */

function playSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

/* ============================================
   INTERSECTION OBSERVER FOR LAZY LOADING
   ============================================ */

function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}

// Generate random color
function getRandomColor() {
    const colors = ['#e94560', '#00ff66', '#0f3460', '#16213e'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ============================================
   CONSOLE MESSAGES (Fun Easter Eggs)
   ============================================ */

console.log('%c🎬 Welcome to Atrangi Comedy!', 'color: #e94560; font-size: 20px; font-weight: bold;');
console.log('%cSubscribe for daily comedy uploads!', 'color: #00ff66; font-size: 14px;');
console.log('%cKeyboard Shortcuts: Press S for Home, C for Contact', 'color: #0f3460; font-size: 12px;');

/* ============================================
   ERROR HANDLING
   ============================================ */

window.addEventListener('error', function(e) {
    console.error('Error:', e.message);
    // Could send to error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});
// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when page loads
window.addEventListener('load', () => {
    animateCounter(document.getElementById('subCount'), 150); // Your actual count
    animateCounter(document.getElementById('videoCount'), 12);
    animateCounter(document.getElementById('viewCount'), 5000);
});
// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when page loads
window.addEventListener('load', () => {
    animateCounter(document.getElementById('subCount'), 150); // Your actual count
    animateCounter(document.getElementById('videoCount'), 12);
    animateCounter(document.getElementById('viewCount'), 5000);
});
// Add this in script.js
function initCardTilt() {
    const cards = document.querySelectorAll('.character-card, .video-card, .about-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.05)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Call in DOMContentLoaded
