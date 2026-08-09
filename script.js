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

let musicStarted = false;
let autoScrolling = false;
let autoScrollFrame = null;


// ===============================
// SHOW INVITATION
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    welcome.classList.remove("hidden");
    details.classList.remove("hidden");
    rsvp.classList.remove("hidden");

    thankyou.classList.add("hidden");


    // ===============================
    // GUEST NAME
    // ===============================

    const params =
        new URLSearchParams(window.location.search);

    const guest =
        params.get("guest");

    const guestMessage =
        document.getElementById("guestMessage");

    if (guest && guestMessage) {

        guestMessage.textContent =
            "Dear " + guest + ",";

    }


    // ===============================
    // MUSIC
    // ===============================

    startWeddingMusic();


    // ===============================
    // COUNTDOWN
    // ===============================

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    // ===============================
    // START AUTO SCROLL
    // ===============================

    setTimeout(function () {

        startAutoScroll();

    }, 2000);


    // ===============================
    // RSVP
    // ===============================

    setupRSVP();

});


// ===============================
// MUSIC
// ===============================

function startWeddingMusic() {

    if (!weddingMusic) return;

    if (musicStarted) return;


    weddingMusic.play()
        .then(function () {

            musicStarted = true;

            if (musicBtn) {
                musicBtn.textContent = "🔊";
            }

        })
        .catch(function () {

            // Some mobile browsers
            // block autoplay.
            // First user interaction
            // will try again.

        });

}


// Try music after first interaction

document.addEventListener(
    "pointerdown",
    function () {

        startWeddingMusic();

    },
    {
        once: true
    }
);


// ===============================
// MUSIC BUTTON
// ===============================

if (musicBtn) {

    musicBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            if (weddingMusic.paused) {

                weddingMusic.play()
                    .then(function () {

                        musicStarted = true;

                        musicBtn.textContent =
                            "🔊";

                    });

            } else {

                weddingMusic.pause();

                musicBtn.textContent =
                    "🔇";

            }

        }
    );

}


// ===============================
// COUNTDOWN
// ===============================

const weddingDate =
    new Date(
        "2026-09-15T19:00:00+03:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent =
            "0";

        document.getElementById("hours").textContent =
            "0";

        document.getElementById("minutes").textContent =
            "0";

        document.getElementById("seconds").textContent =
            "0";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
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


// ===============================
// AUTO SCROLL
// ===============================

function startAutoScroll() {

    if (autoScrolling) return;

    if (!rsvp) return;


    const startPosition =
        window.scrollY;


    const targetPosition =
        rsvp.offsetTop;


    const distance =
        targetPosition -
        startPosition;


    if (distance <= 0) {
        return;
    }


    autoScrolling = true;


    // Around 23 seconds
    // for the whole invitation.
    const duration = 32000;


    const startTime =
        performance.now();


    function animate(currentTime) {

        if (!autoScrolling) {
            return;
        }


        const elapsed =
            currentTime -
            startTime;


        const rawProgress =
            Math.min(
                elapsed / duration,
                1
            );


        // Smooth cinematic easing
        // instead of a sudden movement.
        const progress =
            easeInOut(rawProgress);


        const currentPosition =
            startPosition +
            (
                distance *
                progress
            );


        window.scrollTo(
            0,
            currentPosition
        );


        if (rawProgress < 1) {

            autoScrollFrame =
                requestAnimationFrame(
                    animate
                );

        } else {

            window.scrollTo(
                0,
                targetPosition
            );

            autoScrolling = false;

            autoScrollFrame = null;

        }

    }


    autoScrollFrame =
        requestAnimationFrame(
            animate
        );

}


// ===============================
// SMOOTH EASING
// ===============================

function easeInOut(t) {

    return (
        t < 0.5
            ? 2 * t * t
            : 1 -
              Math.pow(
                  -2 * t + 2,
                  2
              ) / 2
    );

}


// ===============================
// STOP AUTO SCROLL
// ===============================

function stopAutoScroll() {

    if (!autoScrolling) {
        return;
    }


    autoScrolling = false;


    if (autoScrollFrame !== null) {

        cancelAnimationFrame(
            autoScrollFrame
        );

        autoScrollFrame = null;

    }

}


// ===============================
// RSVP
// ===============================

function setupRSVP() {

    const submitBtn =
        document.getElementById(
            "submitRSVP"
        );


    if (!submitBtn) {
        return;
    }


    submitBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


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

                alert(
                    "Please enter your name."
                );

                return;

            }


            if (!attend) {

                alert(
                    "Please choose Yes or No."
                );

                return;

            }


            // Auto scroll is permanently stopped
            stopAutoScroll();


            submitBtn.disabled = true;

            submitBtn.textContent =
                "Sending...";


            fetch(
                "https://script.google.com/macros/s/AKfycbxgbos5vqFnMuqHUOtrSFbFArca3dHQwjJVIRswLaBsiwtxwXGckQsxaTzYvpvGToew/exec",
                {
                    method: "POST",

                    mode: "no-cors",

                    body: JSON.stringify({

                        fullName:
                            fullName,

                        attendance:
                            attend.value,

                        wish:
                            wish

                    })
                }
            )


            .then(function () {

                // Make sure auto scroll
                // never starts again.
                stopAutoScroll();


                // Hide RSVP
                rsvp.style.display =
                    "none";


                // Show Thank You
                thankyou.classList.remove(
                    "hidden"
                );

                thankyou.style.display =
                    "flex";


                // Petals
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


            .catch(function () {

                alert(
                    "Something went wrong."
                );

            })


            .finally(function () {

                submitBtn.disabled =
                    false;

                submitBtn.textContent =
                    "Submit";

            });

        }
    );

}


// ===============================
// PETALS
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


    if (!container) {
        return;
    }


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
        Math.random() *
        100 +
        "%";


    petal.style.width =
        (
            20 +
            Math.random() *
            18
        ) +
        "px";


    petal.style.animationDuration =
        (
            6 +
            Math.random() *
            3
        ) +
        "s";


    container.appendChild(
        petal
    );


    setTimeout(
        function () {

            petal.remove();

        },
        9000
    );

}
