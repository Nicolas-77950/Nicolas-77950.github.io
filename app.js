// app.js

// Sélection des éléments
const sections = document.querySelectorAll('section');
const linksNav = document.querySelectorAll('nav a');
const header = document.querySelector('header');
const btnHome = document.querySelector('.btn-home');
const menuIcon = document.querySelector('#menu-burger');
const nav = document.querySelector('.navigation');

// Fonction pour le menu burger
const burgerActive = () => {
    menuIcon.classList.toggle('bx-x');
    nav.classList.toggle('active');
};

// Fonction pour gérer le scroll et les liens actifs
const scrollActive = () => {
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            linksNav.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`nav a[href*=${id}]`).classList.add('active');
            });
        }
    });
    header.classList.toggle('sticky', window.scrollY > 100);
    btnHome.classList.toggle('btnDisplay', window.scrollY > 150);
    menuIcon.classList.remove('bx-x');
    nav.classList.remove('active');
};

// Configuration de ScrollReveal
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .section-title', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-content, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Configuration de Typed.js
const typed = new Typed('.multiple', {
    strings: ['Développeur Web', 'en formation pour devenir développeur full stack'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true
});


(function(){
    emailjs.init("TA_PUBLIC_KEY"); // clé public a mettre ici
})();

// Gestion du formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_email: "nicolascheel77950@gmail.com" 
    };

    // Envoyer l'email via EmailJS
    emailjs.send('service_zengisk', 'TON_TEMPLATE_ID', templateParams)
        .then(function(response) {
            const formMessage = document.getElementById('form-message');
            formMessage.innerHTML = 'Message envoyé avec succès !';
            formMessage.classList.remove('error');
            document.getElementById('contact-form').reset(); 
        }, function(error) {
            const formMessage = document.getElementById('form-message');
            formMessage.innerHTML = 'Erreur lors de l\'envoi du message.';
            formMessage.classList.add('error');
            console.log('Erreur:', error);
        });
});


menuIcon.addEventListener('click', burgerActive);
window.addEventListener('scroll', scrollActive);