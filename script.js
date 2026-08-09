// ===============================
// ELEMENTS
// ===============================

const cover = document.getElementById("cover");
const welcome = document.getElementById("welcome");
const details = document.getElementById("details");
const rsvp = document.getElementById("rsvp");
const thankyou = document.getElementById("thankyou");

const weddingMusic = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");


// ===============================
// SHOW INVITATION
// ===============================

window.addEventListener("load", () => {

    welcome.classList.remove("hidden");
    details.classList.remove("hidden");
    rsvp.classList.remove("hidden");

    // Try autoplay
    startWeddingMusic();

});


// ===============================
// GUEST NAME
// ===============================

const params = new URLSearchParams(window.location.search);
const guest = params.get("guest");

if (guest) {

    document.getElementById("guestMessage").textContent =
        `Dear ${guest},`;

}


// ===============================
// MUSIC
// ===============================

let musicStarted = false;

function startWeddingMusic() {

    if (musicStarted) return;

    weddingMusic.play()
        .then(() => {

            musicStarted = true;
            musicBtn.textContent = "🔊";

        })
        .catch(() => {

            // Browser blocked autoplay.
            // The next user interaction will try again.

        });

}


// First touch
document.addEventListener("touchstart", startWeddingMusic, {
    once: true,
    passive: true
});


// First swipe
document.addEventListener("touchmove", startWeddingMusic, {
    once: true,
    passive: true
});


// First scroll
document.addEventListener("scroll", startWeddingMusic, {
    once: true,
    passive: true
});


// First pointer interaction
document.addEventListener("pointerdown", startWeddingMusic, {
    once: true
});


// First click
document.addEventListener("click", startWeddingMusic, {
    once: true
});


// Music button
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

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";

        return;

    }

    const days =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown, 1000);


// ===============================
// RSVP
// ===============================

const submitBtn = document.getElementById("submitRSVP");

submitBtn.addEventListener("click", function (e) {

    e.preventDefault();

    const fullName =
        document.getElementById("fullName").value.trim();

    const attend =
        document.querySelector(
            'input[name="attend"]:checked'
        );

    const wish =
        document.getElementById("wish").value.trim();


    if (!fullName) {

        alert("Please enter your name.");
        return;

    }


    if (!attend) {

        alert("Please choose Yes or No.");
        return;

    }


    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";


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


        for (let i = 0; i < 30; i++) {

            setTimeout(createPetal, i * 250);

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

        submitBtn.textContent = "Submit";

    });

});

// ===============================
// ELEMENTS
// ===============================

const cover = document.getElementById("cover");
const welcome = document.getElementById("welcome");
const details = document.getElementById("details");
const rsvp = document.getElementById("rsvp");
const thankyou = document.getElementById("thankyou");

const weddingMusic = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");


// ===============================
// SHOW INVITATION + AUTO SCROLL
// ===============================

let autoScrolling = false;
let autoScrollStopped = false;

window.addEventListener("load", () => {

    // Show the invitation sections
    welcome.classList.remove("hidden");
    details.classList.remove("hidden");
    rsvp.classList.remove("hidden");

    // Try to start music automatically
    startWeddingMusic();

    // Start automatic scrolling after a short pause
    setTimeout(() => {

        if (!autoScrollStopped) {
            startAutoScroll();
        }

    }, 1800);

});


function startAutoScroll() {

    autoScrolling = true;

    const startPosition = window.scrollY;

    // Stop exactly at the beginning of RSVP
    const targetPosition = rsvp.offsetTop;

    const distance = targetPosition - startPosition;

    // Total scrolling time
    const duration = 18000;

    const startTime = performance.now();


    function animateScroll(currentTime) {

        // Stop immediately if the guest took control
        if (autoScrollStopped) {

            autoScrolling = false;
            return;

        }

        const elapsed = currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        // Smooth movement
        const eased =
            progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;


        window.scrollTo(
            0,
            startPosition + distance * eased
        );


        if (progress < 1) {

            requestAnimationFrame(animateScroll);

        } else {

            // We reached RSVP
            window.scrollTo(0, targetPosition);

            autoScrolling = false;

        }

    }

    requestAnimationFrame(animateScroll);

}


// ===============================
// STOP AUTO SCROLL WHEN GUEST
// MANUALLY SWIPES
// ===============================

let touchStartY = 0;


// Mobile

window.addEventListener("touchstart", (event) => {

    if (!autoScrolling) return;

    touchStartY = event.touches[0].clientY;

}, { passive: true });


window.addEventListener("touchmove", (event) => {

    if (!autoScrolling) return;

    const currentY = event.touches[0].clientY;

    const movement =
        Math.abs(currentY - touchStartY);

    // Stop only after an actual swipe
    if (movement > 8) {

        autoScrollStopped = true;
        autoScrolling = false;

    }

}, { passive: true });


// Desktop mouse wheel

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

const guest = params.get("guest");

if (guest) {

    document.getElementById("guestMessage").textContent =
        `Dear ${guest},`;

}


// ===============================
// MUSIC
// ===============================

let musicStarted = false;

function startWeddingMusic() {

    if (musicStarted) return;

    weddingMusic.play()
        .then(() => {

            musicStarted = true;
            musicBtn.textContent = "🔊";

        })
        .catch(() => {

            // Browser blocked autoplay.
            // User interaction will try again.

        });

}


// Try music on first touch

document.addEventListener("touchstart", startWeddingMusic, {
    once: true,
    passive: true
});


// Try music on first swipe

document.addEventListener("touchmove", startWeddingMusic, {
    once: true,
    passive: true
});


// Try music on first scroll

document.addEventListener("scroll", startWeddingMusic, {
    once: true,
    passive: true
});


// Try music on first click

document.addEventListener("click", startWeddingMusic, {
    once: true
});


// Try music on mouse interaction

document.addEventListener("pointerdown", startWeddingMusic, {
    once: true
});


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
            distance / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
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

setInterval(updateCountdown, 1000);


// ===============================
// RSVP
// ===============================

const submitBtn =
    document.getElementById("submitRSVP");


submitBtn.addEventListener("click", function (e) {

    e.preventDefault();


    const fullName =
        document.getElementById("fullName").value.trim();


    const attend =
        document.querySelector(
            'input[name="attend"]:checked'
        );


    const wish =
        document.getElementById("wish").value.trim();


    if (!fullName) {

        alert("Please enter your name.");

        return;

    }


    if (!attend) {

        alert("Please choose Yes or No.");

        return;

    }


    submitBtn.disabled = true;

    submitBtn.textContent = "Sending...";


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


        for (let i = 0; i < 30; i++) {

            setTimeout(createPetal, i * 250);

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

        submitBtn.textContent = "Submit";

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
        document.querySelector(".petals-container");


    if (!container) return;


    const petal =
        document.createElement("img");


    petal.src =
        petals[
            Math.floor(
                Math.random() * petals.length
            )
        ];


    petal.className = "petal";


    petal.style.left =
        Math.random() * 100 + "%";


    petal.style.width =
        (20 + Math.random() * 18) + "px";


    petal.style.animationDuration =
        (6 + Math.random() * 3) + "s";


    container.appendChild(petal);


    setTimeout(() => {

        petal.remove();

    }, 9000);

    }
