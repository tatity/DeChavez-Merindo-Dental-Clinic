// ==================== HAMBURGER MENU ==================== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== APPOINTMENT FORM ==================== 
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = appointmentForm.querySelector('input[type="text"]').value;
    const email = appointmentForm.querySelector('input[type="email"]').value;
    const phone = appointmentForm.querySelector('input[type="tel"]').value;
    const selects = appointmentForm.querySelectorAll('select');
    const service = selects[0].value;
    const timeSlot = selects[1].value;
    const date = appointmentForm.querySelector('input[type="date"]').value;
    const message = appointmentForm.querySelector('textarea').value;
    
    // Validate form
    if (!name || !email || !phone || !service || !timeSlot || !date) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Success message
    showNotification('Appointment request submitted successfully! We will contact you soon.', 'success');
    
    // Log the appointment (in a real app, this would be sent to a server)
    console.log({
        name,
        email,
        phone,
        service,
        timeSlot,
        date,
        message,
        submittedAt: new Date().toLocaleString()
    });
    
    // Reset form
    appointmentForm.reset();
    
    // Optional: Send data to a backend (uncomment and modify as needed)
    // sendAppointmentRequest({name, email, phone, service, timeSlot, date, message});
});

// ==================== NOTIFICATION SYSTEM ==================== 
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #10b981;
    }
    
    .notification-success i {
        color: #10b981;
    }
    
    .notification-error {
        border-left: 4px solid #ef4444;
    }
    
    .notification-error i {
        color: #ef4444;
    }
    
    .notification-info {
        border-left: 4px solid #3b82f6;
    }
    
    .notification-info i {
        color: #3b82f6;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            transform: translateY(-400px);
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== SMOOTH SCROLL & HIGHLIGHT NAV ==================== 
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--accent-color);
    }
`;
document.head.appendChild(activeStyle);

// ==================== SCROLL ANIMATIONS ==================== 
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

// Observe service cards and team members
document.querySelectorAll('.service-card, .team-member, .info-item, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== FORM FIELD ANIMATIONS ==================== 
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ==================== COUNTER ANIMATION (Optional - for stats) ==================== 
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== UTILITY FUNCTIONS ==================== 

// Scroll to section smoothly
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Format phone number (US format)
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== PAGE LOAD EFFECTS ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to hero content on load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.animation = 'slideInLeft 0.8s ease forwards';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'slideInLeft 0.8s ease 0.2s forwards';
    }
    
    console.log('SmileCare Dental Clinic website loaded successfully!');
});

// ==================== KEYBOARD SHORTCUTS ==================== 
document.addEventListener('keydown', (e) => {
    // Alt + 1: Go to home
    if (e.altKey && e.key === '1') {
        scrollToSection('home');
    }
    // Alt + 2: Go to services
    if (e.altKey && e.key === '2') {
        scrollToSection('services');
    }
    // Alt + 3: Go to about
    if (e.altKey && e.key === '3') {
        scrollToSection('about');
    }
    // Alt + 4: Go to contact
    if (e.altKey && e.key === '4') {
        scrollToSection('contact');
    }
});

// ==================== BACK TO TOP BUTTON ==================== 
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 168, 255, 0.3);
    }
    
    .back-to-top.show {
        display: flex;
    }
    
    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 168, 255, 0.4);
    }
`;
document.head.appendChild(backToTopStyle);

// Create back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// ==================== EXPORT FOR FUTURE USE ==================== 
// These can be used in other scripts or modules
window.dentalClinic = {
    scrollToSection,
    formatPhoneNumber,
    isValidEmail,
    showNotification,
    animateCounter
};
