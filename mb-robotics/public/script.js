// ==========================================
// MB ROBOTICS - MAIN SCRIPT
// ==========================================

// --- Smooth scrolling for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- Scroll-triggered fade-in animations (IntersectionObserver) ---
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// --- Back to Top Button ---
const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- Toast Notification System ---
function showToast(message, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast-notification ' + type + ' show';

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// --- Contact Form (AJAX submission) ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                showToast(data.success || 'Message sent!', 'success');
                contactForm.reset();
            } else {
                showToast(data.error || 'Something went wrong.', 'error');
            }
        } catch (err) {
            showToast('Network error. Please try again.', 'error');
        }

        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    });
}

// --- Feature Card Navigation ---
const featureRoutes = {
    '.features-game': 'game.html',
    '.features-meet-the-team': 'meet-the-team.html',
    '.features-ylab': 'ylab.html'
};

Object.entries(featureRoutes).forEach(([selector, url]) => {
    const el = document.querySelector(selector);
    if (el) {
        el.addEventListener('click', () => window.location.href = url);
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = url;
            }
        });
    }
});
