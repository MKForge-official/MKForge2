// 1. Custom Cursor
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

// 2. Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
}

// 3. Scroll Reveal Animation
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

// 4. Dynamic Quotes Typing Effect
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
// 5. 3D Tilt Effect for Cards
const tiltCards = document.querySelectorAll('.tilt');
tiltCards.forEach(card => {
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
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
// 6. Contact Form Submission (Cloudflare Integration)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Yahan Cloudflare Worker ka URL aayega (Jab aap worker deploy karenge)
        const CLOUDFLARE_WORKER_URL = "https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev";

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            userType: document.getElementById('userType').value,
            message: document.getElementById('message').value
        };

        try {
            // Agar aapne Worker deploy kar diya hai, toh yeh real request karega
            // Filhal ke liye hum fake delay laga rahe hain (taake UI test ho sake)
            await new Promise(resolve => setTimeout(resolve, 1500));

            formStatus.style.display = 'block';
            formStatus.style.color = 'var(--accent-green)';
            formStatus.textContent = "Thank you! We are reviewing your request. We will contact you soon.";
            
            contactForm.reset();
        } catch (error) {
            formStatus.style.display = 'block';
            formStatus.style.color = 'red';
            formStatus.textContent = "Something went wrong. Please try again.";
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}