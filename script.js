// ===============================
// ELEMENTS
// ===============================

const welcome = document.getElementById("welcome");
const details = document.getElementById("details");
const rsvp = document.getElementById("rsvp");
const thankyou = document.getElementById("thankyou");

const weddingMusic = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");


// ===============================
// VARIABLES
// ===============================

let autoScrolling = false;
let autoScrollStopped = false;
let musicStarted = false;
let touchStartY = 0;


// ===============================
// SHOW INVITATION
// ===============================

window.addEventListener("load", () => {

    // Show all invitation sections
    welcome.classList.remove("hidden");
    details.classList.remove("hidden");
    rsvp.classList.remove("hidden");

    // Try music
    startWeddingMusic();

    // Start automatic scrolling
    setTimeout(() => {

        if (!autoScrollStopped) {
            startAutoScroll();
        }

    }, 1800);

});


// ===============================
// AUTO SCROLL
// ===============================

function startAutoScroll() {

    if (autoScrollStopped) return;

    autoScrolling = true;

    const startPosition = window.scrollY;

    const targetPosition = rsvp.offsetTop;

    const distance = targetPosition - startPosition;

    const duration = 18000;

    const startTime = performance.now();


    function animate(currentTime) {

        if (autoScrollStopped) {

            autoScrolling = false;
            return;

        }


        const elapsed = currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        // Smooth easing
        const eased =
            progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;


        window.scrollTo(
            0,
            startPosition + distance * eased
        );


        if (progress < 1) {

            requestAnimationFrame(animate);

        } else {

            // Stop exactly at RSVP
            window.scrollTo(0, targetPosition);

            autoScrolling = false;

        }

    }


    requestAnimationFrame(animate);

}


// ===============================
// MANUAL MOBILE SCROLL
// ===============================

window.addEventListener("touchstart", (event) => {

    if (!autoScrolling) return;

    touchStartY = event.touches[0].clientY;

}, { passive: true });


window.addEventListener("touchmove", (event) => {

    if (!autoScrolling) return;

    const currentY =
        event.touches[0].clientY;

    const movement =
        Math.abs(currentY - touchStartY);


    if (movement > 8) {

        autoScrollStopped = true;
        autoScrolling = false;

    }

}, { passive: true });


// ===============================
// DESKTOP SCROLL
// ===============================

window.addEventListener("wheel", () => {

    if (!autoScrolling) return;

    autoScrollStopped = true;
    autoScrolling = false;

}, { passive: true });


// ===============================
// GUEST NAME
// ===============================

const params =
    new URLSearchParams(window.location.search);

const guest =
    params.get("guest");

if (guest) {

    const guestMessage =
        document.getElementById("guestMessage");

    if (guestMessage) {

        guestMessage.textContent =
            `Dear ${guest},`;

    }

}


// ===============================
// MUSIC
// ===============================

function startWeddingMusic() {

    if (musicStarted) return;

    weddingMusic.play()
        .then(() => {

            musicStarted = true;

            musicBtn.textContent = "🔊";

        })
        .catch(() => {

            // Browser blocked autoplay.
            // Interaction will try again.

        });

}


// Try music on first interaction

document.addEventListener(
    "touchstart",
    startWeddingMusic,
    {
        once: true,
        passive: true
    }
);


document.addEventListener(
    "touchmove",
    startWeddingMusic,
    {
        once: true,
        passive: true
    }
);


document.addEventListener(
    "scroll",
    startWeddingMusic,
    {
        once: true,
        passive: true
    }
);


document.addEventListener(
    "click",
    startWeddingMusic,
    {
        once: true
    }
);


// ===============================
// MUSIC BUTTON
// ===============================

musicBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    if (weddingMusic.paused) {

        weddingMusic.play()
            .then(() => {

                musicStarted = true;
                musicBtn.textContent = "🔊";

            });

    } else {

        weddingMusic.pause();

        musicBtn.textContent = "🔇";

    }

});


// ===============================
// COUNTDOWN
// ===============================

const weddingDate =
    new Date("2026-09-15T19:00:00+03:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days").textContent =
        days;

    document.getElementById("hours").textContent =
        hours;

    document.getElementById("minutes").textContent =
        minutes;

    document.getElementById("seconds").textContent =
        seconds;

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// ===============================
// RSVP
// ===============================

const submitBtn =
    document.getElementById("submitRSVP");


submitBtn.addEventListener("click", function (e) {

    e.preventDefault();


    const fullName =
        document
            .getElementById("fullName")
            .value
            .trim();


    const attend =
        document.querySelector(
            'input[name="attend"]:checked'
        );


    const wish =
        document
            .getElementById("wish")
            .value
            .trim();


    if (!fullName) {

        alert("Please enter your name.");

        return;

    }


    if (!attend) {

        alert("Please choose Yes or No.");

        return;

    }


    submitBtn.disabled = true;

    submitBtn.textContent =
        "Sending...";


    fetch(
        "https://script.google.com/macros/s/AKfycbxgbos5vqFnMuqHUOtrSFbFArca3dHQwjJVIRswLaBsiwtxwXGckQsxaTzYvpvGToew/exec",
        {

            method: "POST",

            mode: "no-cors",

            body: JSON.stringify({

                fullName: fullName,

                attendance: attend.value,

                wish: wish

            })

        }
    )

    .then(() => {

        rsvp.style.display = "none";

        thankyou.style.display = "flex";


        for (
            let i = 0;
            i < 30;
            i++
        ) {

            setTimeout(
                createPetal,
                i * 250
            );

        }


        thankyou.scrollIntoView({
            behavior: "smooth"
        });

    })


    .catch(() => {

        alert("Something went wrong.");

    })


    .finally(() => {

        submitBtn.disabled = false;

        submitBtn.textContent =
            "Submit";

    });

});


// ===============================
// FLOATING PETALS
// ===============================

const petals = [
    "Single-rose-petal.png",
    "single-white-petal.png"
];


function createPetal() {

    const container =
        document.querySelector(
            ".petals-container"
        );


    if (!container) return;


    const petal =
        document.createElement("img");


    petal.src =
        petals[
            Math.floor(
                Math.random() *
                petals.length
            )
        ];


    petal.className =
        "petal";


    petal.style.left =
        Math.random() * 100 + "%";


    petal.style.width =
        (20 + Math.random() * 18) +
        "px";


    petal.style.animationDuration =
        (6 + Math.random() * 3) +
        "s";


    container.appendChild(petal);


    setTimeout(() => {

        petal.remove();

    }, 9000);

}
