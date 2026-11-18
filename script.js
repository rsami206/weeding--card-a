
/* =====================================
   WEDDING WEBSITE PREMIUM JAVASCRIPT
===================================== */

const envelope = document.getElementById("envelope");
const intro = document.getElementById("intro");
const lightFlash = document.getElementById("lightFlash");

document.body.style.overflow = "hidden";

let isOpened = false;

/* =====================================
   CINEMATIC ENVELOPE OPENING
===================================== */

envelope.addEventListener("click", () => {

    if (isOpened) return;

    isOpened = true;

    envelope.classList.add("open");

    // Golden light after envelope opens
    setTimeout(() => {
        lightFlash.classList.add("active");
    }, 1250);

    // Show website
    setTimeout(() => {

        intro.classList.add("hide");

        document.body.classList.add("website-open");

        document.body.style.overflow = "auto";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 2200);

});

/* =====================================
   SCROLL REVEAL ANIMATION
===================================== */

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
    }
);

document.querySelectorAll(".reveal").forEach(section => {
    observer.observe(section);
});

/* =====================================
   HEART SCRATCH SYSTEM
===================================== */

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

const scratchContainer = document.querySelector(".scratch-container");
const celebration = document.getElementById("celebration");

let drawing = false;
let scratched = false;

function setupCanvas() {

    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Premium pink scratch surface

    const gradient = ctx.createLinearGradient(
        0, 0, rect.width, rect.height
    );

    gradient.addColorStop(0, "#dcaeb7");
    gradient.addColorStop(0.5, "#c88e9b");
    gradient.addColorStop(1, "#a96f80");

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Scratch instructions

    ctx.fillStyle = "#fff8f5";
    ctx.textAlign = "center";

    ctx.font = "28px Georgia";
    ctx.fillText("♡", rect.width / 2, rect.height / 2 - 8);

    ctx.font = "11px Arial";

    ctx.letterSpacing = "2px";

    ctx.fillText(
        "SCRATCH HERE",
        rect.width / 2,
        rect.height / 2 + 22
    );

    ctx.globalCompositeOperation = "destination-out";
}

setupCanvas();

/* Get pointer position */

function getPosition(event) {

    const rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };

}

/* Scratch drawing */

function scratch(event) {

    if (!drawing || scratched) return;

    const pos = getPosition(event);

    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 21, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    checkScratch();

}

/* Touch and mouse support */

canvas.addEventListener("pointerdown", event => {

    if (scratched) return;

    drawing = true;

    canvas.setPointerCapture(event.pointerId);

    const pos = getPosition(event);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    scratch(event);

});

canvas.addEventListener("pointermove", scratch);

canvas.addEventListener("pointerup", () => {
    drawing = false;
});

canvas.addEventListener("pointercancel", () => {
    drawing = false;
});

/* =====================================
   CHECK SCRATCH COMPLETION
===================================== */

function checkScratch() {

    if (scratched) return;

    const pixels = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    ).data;

    let transparent = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += 16) {

        total++;

        if (pixels[i] < 100) {
            transparent++;
        }

    }

    const percentage = transparent / total;

    if (percentage > 0.35) {

        scratched = true;

        completeScratch();

    }

}

/* =====================================
   EXPLOSIVE SAVE THE DATE CELEBRATION
===================================== */

function completeScratch() {

    scratchContainer.classList.add("completed");

    // Canvas disappears smoothly

    canvas.style.transition = "opacity 1s ease";
    canvas.style.opacity = "0";

    setTimeout(() => {
        canvas.style.display = "none";
    }, 1000);

    // Celebration particles

    createCelebration();

    // Extra flower petals

    for (let i = 0; i < 35; i++) {

        setTimeout(() => {
            createPetal();
        }, i * 35);

    }

}

/* =====================================
   GOLDEN FIREWORKS AND RIBBONS
===================================== */

function createCelebration() {

    // Golden sparkling particles

    for (let i = 0; i < 65; i++) {

        const spark = document.createElement("span");

        spark.className = "spark";

        const angle = Math.random() * Math.PI * 2;
        const distance = 70 + Math.random() * 170;

        spark.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        spark.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        celebration.appendChild(spark);

        setTimeout(() => spark.remove(), 1800);

    }

    // Golden ribbons

    for (let i = 0; i < 35; i++) {

        const ribbon = document.createElement("span");

        ribbon.className = "ribbon";

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 180;

        ribbon.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        ribbon.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        celebration.appendChild(ribbon);

        setTimeout(() => ribbon.remove(), 2200);

    }

}

/* =====================================
   FLOATING FLOWER PETALS
===================================== */

const petalsContainer = document.getElementById("petals");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function createPetal() {

    if (!petalsContainer || reducedMotion) return;

    const petal = document.createElement("span");

    petal.className = "petal";

    petal.style.left = Math.random() * 100 + "%";

    petal.style.animationDuration =
        (7 + Math.random() * 7) + "s";

    petal.style.animationDelay =
        Math.random() + "s";

    petal.style.opacity =
        0.3 + Math.random() * 0.6;

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 16000);

}

// Petals start after opening

if (!reducedMotion) {

    setInterval(() => {

        if (intro.classList.contains("hide")) {
            createPetal();
        }

    }, 550);

}

/* =====================================
   WEDDING COUNTDOWN
===================================== */

const weddingDate = new Date(
    "December 17, 2026 19:00:00"
).getTime();

function updateCountdown() {

    const now = Date.now();

    const distance = weddingDate - now;

    if (distance <= 0) {

        ["days", "hours", "minutes", "seconds"].forEach(id => {

            document.getElementById(id).textContent = "00";

        });

        return;

    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);

/* =====================================
   RSVP FORM
===================================== */

document.getElementById("rsvpForm").addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            document.getElementById("guestName").value;

        const attendance =
            document.getElementById("attendance").value;

        const guests =
            document.getElementById("guestCount").value || 1;

        document.getElementById("response").textContent =
            `Thank you ${name}! ${attendance}. Guests: ${guests}.`;

        event.target.reset();

    }
);

/* =====================================
   WINDOW RESIZE
===================================== */

window.addEventListener("resize", () => {

    if (!scratched && canvas.style.display !== "none") {
        setupCanvas();
    }

});



// function setupCanvas() {
//     const rect = canvas.getBoundingClientRect();
//     const ratio = window.devicePixelRatio || 1;

//     canvas.width = Math.round(rect.width * ratio);
//     canvas.height = Math.round(rect.height * ratio);

//     ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

//     const gradient = ctx.createLinearGradient(
//         0, 0, rect.width, rect.height
//     );

//     gradient.addColorStop(0, "#d6a4ad");
//     gradient.addColorStop(1, "#ae7785");

//     ctx.globalCompositeOperation = "source-over";
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, rect.width, rect.height);

//     ctx.fillStyle = "#fff4f2";
//     ctx.font = "24px Georgia";
//     ctx.textAlign = "center";
//     ctx.fillText("♡", rect.width / 2, rect.height / 2 - 5);

//     ctx.font = "11px Arial";
//     ctx.fillText(
//         "SCRATCH HERE",
//         rect.width / 2,
//         rect.height / 2 + 25
//     );

//     ctx.globalCompositeOperation = "destination-out";
// }

// // Mobile screen resize
// window.addEventListener("resize", () => {
//     if (!scratched) {
//         setupCanvas();
//     }
// });
