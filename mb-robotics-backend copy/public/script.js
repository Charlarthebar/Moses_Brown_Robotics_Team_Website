// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky navbar
let navbar = document.querySelector('.custom-navbar');
let sticky = navbar.offsetTop;

function stickyNavbar() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}

// Scrolling animations (fade-in elements when they appear in viewport)
function scrollFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    const scrollY = window.pageYOffset;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top + scrollY;
        const elementVisible = 150;

        if (scrollY + window.innerHeight >= elementTop + elementVisible) {
            el.classList.add('visible');
        }
    });
}

// Back to Top Button

let backToTopBtn = document.getElementById("backToTopBtn");

function displayBackToTop() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.classList.add('show'); 
    } else {
        backToTopBtn.classList.remove('show');
    }
}


// Combine scroll behaviors into one function
window.onscroll = function() {
    stickyNavbar();
    scrollFadeIn();
    displayBackToTop();
};

// Back to Top Button click event
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        e.preventDefault();
    }
});

document.querySelector('.features-game').addEventListener('click', function() {
    window.location.href = 'game.html';
});

document.querySelector('.features-meet-the-team').addEventListener('click', function() {
    window.location.href = 'meet-the-team.html';
});

document.querySelector('.features-ylab').addEventListener('click', function() {
    window.location.href = 'ylab.html';
});
