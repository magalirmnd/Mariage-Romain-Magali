// =====================================================
// ROMAIN & MAGALI
// VERSION 2.5
// Feux d'artifice - Base
// =====================================================
window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {

    window.scrollTo(0, 0);

});
const button = document.getElementById("openInvitation");
const hero = document.querySelector(".hero");
const fireworksScene = document.getElementById("fireworksScene");
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
const doorsScene = document.getElementById("doorsScene");
const whiteTransition = document.getElementById("whiteTransition");
const welcomeScene = document.getElementById("welcomeScene");
const welcomeQuoteScene = document.getElementById("welcomeQuoteScene");
const storyScene = document.getElementById("storyScene");

// =====================================================
// Apparition des sections au défilement
// =====================================================

function initScrollAnimations() {

    const sections = document.querySelectorAll(".fade-section");

    // La première section apparaît immédiatement
if (sections.length > 0) {

    sections[0].classList.add("visible");

}

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold: 0.01

    });

    sections.forEach(section => {

        observer.observe(section);

    });

    // =====================================================
// COMPTE À REBOURS
// =====================================================

const weddingDate = new Date("November 13, 2027 15:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        document.getElementById("countdown").innerHTML = `
            <h2>Aujourd'hui est le grand jour ! ❤️</h2>
            <p><em>¡Hoy es el gran día! ❤️</em></p>
        `;

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

const ids = ["days","hours","minutes","seconds"];
const values = [days,hours,minutes,seconds];

ids.forEach((id,index)=>{

    const element = document.getElementById(id);

    element.textContent = values[index];

    element.classList.remove("number-update");

    void element.offsetWidth;

    element.classList.add("number-update");

});
}

updateCountdown();

setInterval(updateCountdown, 1000);

}

// --------------------------------
// Taille du canvas
// --------------------------------

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// --------------------------------

let running = false;

const rockets = [];
const particles = [];

// --------------------------------

button.addEventListener("click", startInvitation);

// --------------------------------

function startInvitation() {

    window.scrollTo(0, 0);

    if (running) return;

    running = true;
    hero.style.display = "none";
    fireworksScene.style.display = "flex";

    // Lancer les feux d'artifice
    for (let i = 0; i < 5; i++) {
        setTimeout(() => lancerFusee(), i * 500);
    }

    animate();

    // 1. Fin des feux d'artifice
    setTimeout(() => {

        running = false;
        fireworksScene.style.display = "none";

        // 2. Afficher la citation après l'extinction complète des feux
        welcomeQuoteScene.classList.remove("show", "textVisible");
        welcomeQuoteScene.style.transition = "none";
        welcomeQuoteScene.style.opacity = "1";
        welcomeQuoteScene.style.display = "flex";

        // Seule la phrase apparaît progressivement en fondu
        const quote = document.getElementById("welcomeQuote");
        quote.style.transition = "opacity 1s ease";
        quote.style.opacity = "0";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                quote.style.opacity = "1";
            });
        });

        // Garder la citation visible 4 secondes
        setTimeout(() => {
            welcomeQuoteScene.style.display = "none";
            lancerDiaporama();
        }, 4000);

    }, 4000);
}

// 3. Diaporama, puis photo finale et ouverture des portes
function lancerDiaporama() {

    const photos = [
        "assets/images/photo5.jpg",
        "assets/images/photo6.jpg",
        "assets/images/photo8.jpg",
        "assets/images/photo11.jpg"
    ];

    const photoFinale = "assets/images/accueil-apres-portes.png";
    const welcomeImage = document.getElementById("welcomeImage");
    const welcomeImageNext = document.getElementById("welcomeImageNext");

    function attendre(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function chargerImage(src) {
        return new Promise(resolve => {
            const image = new Image();
            image.onload = () => resolve(true);
            image.onerror = () => {
                console.error("Impossible de charger la photo :", src);
                resolve(false);
            };
            image.src = src;
        });
    }

    async function afficherPhoto(src) {
        const chargee = await chargerImage(src);
        if (!chargee) return false;

        // Affichage direct, sans fondu ni transition
        welcomeImage.src = src;
        welcomeImage.style.transition = "none";
        welcomeImage.style.opacity = "1";
        welcomeImage.style.display = "block";

        welcomeImageNext.style.display = "none";
        welcomeImageNext.style.opacity = "0";
        welcomeImageNext.style.transition = "none";

        welcomeScene.style.transition = "none";
        welcomeScene.style.opacity = "1";
        welcomeScene.style.display = "block";

        return true;
    }

    async function lancerSequence() {

        // 3. Afficher les photos du diaporama, dans l'ordre
        for (const photo of photos) {
            const chargee = await afficherPhoto(photo);
            if (!chargee) continue;
            await attendre(3000);
        }

        // 4. Afficher la photo finale de Magali et Romain
        const finaleChargee = await afficherPhoto(photoFinale);
        if (!finaleChargee) return;

        // Laisser la photo finale seule à l'écran
        await attendre(3500);

        // Préparer le site derrière les portes
        storyScene.style.display = "flex";
        initScrollAnimations();
        storyScene.classList.add("visible");
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";

        // 5. Afficher les portes fermées devant la photo finale
        doorsScene.classList.remove("open");
        doorsScene.style.display = "block";

        // Les portes restent fermées un court instant
        await attendre(800);

        // Masquer la photo derrière les portes fermées
        welcomeScene.style.display = "none";

        // 6. Ouvrir les portes sans animation pour le moment
        doorsScene.querySelectorAll(".door").forEach(door => {
            door.style.transition = "none";
        });

        doorsScene.classList.add("open");

        // Retirer les portes : le site est maintenant visible
        await attendre(50);
        doorsScene.style.display = "none";
        doorsScene.classList.remove("open");
        document.body.style.overflow = "auto";
    }

    lancerSequence();
}

// --------------------------------

function lancerFusee() {

  rockets.push({

    x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,

    y: canvas.height,

    previousY: canvas.height,

    speed: 7 + Math.random() * 2,

    target: canvas.height * (0.20 + Math.random() * 0.30)

});

}

// --------------------------------

function explosion(x, y) {

   const colors = [
    "#8E3B46",
    "#D9A0A7",
    "#C77B5B",
    "#344C68",
    "#4F7C7D",
    "#91A58A",
    "#E8D2A6",
    "#C8A56A",
    "#F4EBDD"
];

    for (let i = 0; i < 100; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 1;

        particles.push({

            x,
            y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            life: 100,
            size: Math.random() * 3 + 1,

            color: colors[Math.floor(Math.random() * colors.length)]

        });

    }

}

// --------------------------------

function animate() {

    // Arrête la boucle d'animation lorsque les feux d'artifice sont terminés.
    if (!running) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

ctx.fillStyle = "rgba(248,247,242,0.18)";
ctx.fillRect(0,0,canvas.width,canvas.height);

    // ------------------------
    // Fusées
    // ------------------------

    for (let i = rockets.length - 1; i >= 0; i--) {

        const rocket = rockets[i];

       rocket.previousY = rocket.y;

rocket.y -= rocket.speed;

// Traînée

ctx.beginPath();

ctx.moveTo(rocket.x, rocket.previousY);

ctx.lineTo(rocket.x, rocket.y);

ctx.strokeStyle = "#E8D8B5";

ctx.lineWidth = 2;

ctx.stroke();

// Tête de la fusée

ctx.beginPath();

ctx.arc(rocket.x, rocket.y, 3.5, 0, Math.PI * 2);

ctx.fillStyle = "#dbd8d4";

ctx.fill();

        if (rocket.y <= rocket.target) {

            explosion(rocket.x, rocket.y);

            rockets.splice(i, 1);

            setTimeout(() => {

    if(running){

        lancerFusee();

    }

}, 300 + Math.random() * 700);

        }

    }

    // ------------------------
    // Particules
    // ------------------------

    for (let i = particles.length - 1; i >= 0; i--) {

        const p = particles[i];

        p.x += p.vx;

        p.y += p.vy;

        p.vy += 0.03;

        p.life--;

        ctx.globalAlpha = p.life / 100;

        ctx.beginPath();

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = p.color;

        ctx.fill();

        ctx.globalAlpha = 1;

        if (p.life <= 0) {

            particles.splice(i, 1);

        }

    }

    requestAnimationFrame(animate);

}
// --------------------------------
// Fin automatique du feu d'artifice
// --------------------------------
// =====================================================
// Apparition des sections au défilement
// =====================================================

// =====================================================
// LIGHTBOX
// =====================================================

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

const prevImage = document.getElementById("prevImage");

const nextImage = document.getElementById("nextImage");

const galleryImages = Array.from(document.querySelectorAll(".galleryGrid img"));

let currentImage = 0;

// Ouvrir la photo

galleryImages.forEach((image,index) => {

    image.addEventListener("click", () => {

        currentImage = index;

lightboxImage.src = galleryImages[currentImage].src;

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});

// Fermer avec la croix

closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

});

// Fermer en cliquant sur le fond

lightbox.addEventListener("click", (event) => {

    if(event.target === lightbox){

        lightbox.classList.remove("show");

        document.body.style.overflow = "auto";

    }

});

// Navigation au clavier

document.addEventListener("keydown", (event) => {

    if(!lightbox.classList.contains("show")) return;

    if(event.key === "ArrowRight"){

        currentImage++;

        if(currentImage >= galleryImages.length){

            currentImage = 0;

        }

        lightboxImage.src = galleryImages[currentImage].src;

    }

    if(event.key === "ArrowLeft"){

        currentImage--;

        if(currentImage < 0){

            currentImage = galleryImages.length - 1;

        }

        lightboxImage.src = galleryImages[currentImage].src;

    }

    if(event.key === "Escape"){

        lightbox.classList.remove("show");

        document.body.style.overflow = "auto";

    }

});

// Photo précédente

prevImage.addEventListener("click", () => {

    currentImage--;

    if(currentImage < 0){

        currentImage = galleryImages.length - 1;

    }

    lightboxImage.src = galleryImages[currentImage].src;

});

// Photo suivante

nextImage.addEventListener("click", () => {

    currentImage++;

    if(currentImage >= galleryImages.length){

        currentImage = 0;

    }

    lightboxImage.src = galleryImages[currentImage].src;

});
