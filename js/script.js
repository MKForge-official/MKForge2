// ==========================================
// 1. CUSTOM CURSOR
// ==========================================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    const links = document.querySelectorAll('a, .card, button, input, textarea');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.background = 'rgba(15, 23, 42, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.background = 'transparent';
        });
    });
}

// ==========================================
// 2. MOBILE MENU TOGGLE
// ==========================================
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
}

// ==========================================
// 3. SCROLL REVEAL ANIMATION
// ==========================================
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
document.addEventListener("DOMContentLoaded", reveal);

// ==========================================
// 4. DYNAMIC QUOTES TYPING EFFECT
// ==========================================
const quotes = [
    "Idea: The power of thought.",
    "Imagination meets execution.",
    "From a spark to a solution.",
    "Building the future, one idea at a time."
];

const quoteElement = document.getElementById("dynamic-quote");
let quoteIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeQuote() {
    if (!quoteElement) return; 
    
    const currentQuote = quotes[quoteIndex];
    
    if (isDeleting) {
        quoteElement.textContent = currentQuote.substring(0, charIndex - 1);
        charIndex--;
    } else {
        quoteElement.textContent = currentQuote.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentQuote.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        quoteIndex = (quoteIndex + 1) % quotes.length;
        typeSpeed = 500; 
    }

    setTimeout(typeQuote, typeSpeed);
}

document.addEventListener("DOMContentLoaded", function() {
    if(quoteElement) {
        setTimeout(typeQuote, 1000);
    }
});

// ==========================================
// 5. 3D TILT EFFECT FOR CARDS
// ==========================================
const cards = document.querySelectorAll('.tilt');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; 
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
    });
});

// ==========================================
// 6. CONTACT FORM SUBMISSION (Google Apps Script)
// ==========================================
// Yeh woh URL hai jo aapne Google Script se copy kiya tha
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzeTzc5az0jZx4cLnnHVCBzZPcgABCzmyHQ2QLOc0EH6y5ZaO9hGMqj5SDHoR212IpK5g/exec";

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            userType: document.getElementById('userType').value,
            message: document.getElementById('message').value
        };

        try {
            // Data Google Script par bhejna
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain', // Google Script ke liye text/plain zaroori hai
                },
                body: JSON.stringify(formData)
            });

            // Success Message
            formStatus.style.display = 'block';
            formStatus.style.color = 'var(--accent-green)';
            formStatus.textContent = "Thank you! Your message has been sent. We will contact you soon.";
            
            // Form Reset
            contactForm.reset();
            
        } catch (error) {
            // Error Message
            formStatus.style.display = 'block';
            formStatus.style.color = 'red';
            formStatus.textContent = "Something went wrong. Please try again.";
            
        } finally {
            // Button Reset
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}
