// Form Validation
function validateForm(e) {
    e.preventDefault();
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;
    
    document.querySelectorAll('.toast').forEach(toast => toast.remove());
    
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            showToast(`Mohon isi ${input.previousElementSibling.textContent}`);
            return; 
        }
    });
    
    if (isValid) {
        form.submit();
    }
}

// Toast Notification
function showToast(message) {
    // Hapus toast yang ada sebelumnya
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Stats Counter Animation
function initStatsCounter() {
    const counters = document.querySelectorAll('.stats-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        
        function updateCount() {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 16);
            } else {
                counter.innerText = target;
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
            }
        });
        
        observer.observe(counter);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            navbar.style.transition = 'top 0.3s ease-in-out';
            navbar.style.top = '-100px';
        } else {
            navbar.style.transition = 'top 0.3s ease-in-out';
            navbar.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close ketika klik di luar
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initStatsCounter();
});