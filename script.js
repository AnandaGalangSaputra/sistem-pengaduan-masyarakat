// Form Validation
function validateForm(e) {
    e.preventDefault();
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('[required]');
    const errorMessages = [];
    
    // Hapus semua toast yang ada sebelumnya
    const existingContainer = document.querySelector('.toast-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    inputs.forEach(input => {
        if (!input.value) {
            const label = input.previousElementSibling.textContent;
            errorMessages.push(`Mohon isi ${label}`);
        }
    });
    
    if (errorMessages.length > 0) {
        // Tampilkan semua pesan error sekaligus
        showToast(errorMessages);
    } else {
        form.submit();
    }
}

// Toast Notification
function showToast(messages) {
    // Buat container
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    
    // Buat semua toast sekaligus
    messages.forEach(message => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);
    });
    
    // Tambahkan animasi masuk untuk semua toast
    setTimeout(() => {
        container.querySelectorAll('.toast').forEach(toast => {
            toast.style.animation = 'slideIn 0.3s ease-out forwards';
        });
    }, 10);
    
    // Hapus semua toast setelah 3 detik
    setTimeout(() => {
        container.querySelectorAll('.toast').forEach(toast => {
            toast.style.animation = 'slideOut 0.3s ease-in forwards';
        });
        setTimeout(() => container.remove(), 300);
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
            navbar.style.top = '-80px';
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

// // Handle Identitas Radio Button
// function initIdentitasHandler() {
//     const namaInput = document.getElementById('nama');
//     const namaLbl = document.getElementById('lblNama');
//     const anonimRadio = document.getElementById('anonim');
//     const terbukaRadio = document.getElementById('terbuka');

//     function toggleNamaInput() {
//         if (anonimRadio.checked) {
//             namaInput.style.display = 'none';
//             namaLbl.style.display = 'none';
//             namaInput.required = false;
//         } else {
//             namaInput.style.display = 'block';
//             namaLbl.style.display = 'block';
//             namaInput.required = true;
//         }
//     }

//     anonimRadio.addEventListener('change', toggleNamaInput);
//     terbukaRadio.addEventListener('change', toggleNamaInput);

//     // Set initial state
//     toggleNamaInput();
// }

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initStatsCounter();
    // initIdentitasHandler();
});