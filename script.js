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
const storyScene = document.getElementById("storyScene");

// =====================================================
// Apparition des sections au défilement
// =====================================================

function initScrollAnimations() {

    const sections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold: 0.20

    });

    sections.forEach(section => {

        observer.observe(section);

    });

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

    // Lance plusieurs fusées dès le début
    for(let i = 0; i < 5; i++){

        setTimeout(() => {

            lancerFusee();

        }, i * 500);

    }

    animate();
 // Fin automatique du feu d'artifice
    setTimeout(() => {

        running = false;

        fireworksScene.style.display = "none";

        doorsScene.style.display = "block";

        setTimeout(() => {

            doorsScene.classList.add("open");

            setTimeout(() => {


setTimeout(() => {

   storyScene.style.display = "flex";

initScrollAnimations();

storyScene.classList.add("visible");

window.scrollTo(0, 0);

document.body.style.overflow = "auto";

}, 50);

            },1400);

            setTimeout(() => {

                doorsScene.style.display = "none";

            },1700);

        },300);

    },4000);

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

    for (let i = 0; i < 70; i++) {

        const angle = Math.random() * Math.PI * 2;

        const speed = Math.random() * 4 + 1;

        particles.push({

            x,

            y,

            vx: Math.cos(angle) * speed,

            vy: Math.sin(angle) * speed,

            life: 100,

            size: Math.random() * 3 + 1,

            color: ["#FFFFFF", "#F4E8C1", "#C8A56A"][Math.floor(Math.random() * 3)]

        });

    }

}

// --------------------------------

function animate() {

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

ctx.fillStyle = "#C8A56A";

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

