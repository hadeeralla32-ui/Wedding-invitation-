document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // ELEMENTS
    // ===============================

    const cover = document.getElementById("cover");
    const welcome = document.getElementById("welcome");
    const details = document.getElementById("details");
    const rsvp = document.getElementById("rsvp");
    const thankyou = document.getElementById("thankyou");

    const openInvitation =
        document.getElementById("openInvitation");

    const weddingMusic =
        document.getElementById("weddingMusic");

    const musicBtn =
        document.getElementById("musicBtn");

    const submitBtn =
        document.getElementById("submitRSVP");


    // ===============================
    // STATE
    // ===============================

    let autoScrolling = false;
    let autoScrollFrame = null;


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

    function startWeddingMusic() {

        if (!weddingMusic) {
            return;
        }

        weddingMusic.volume = 1;

        weddingMusic.play()
            .then(function () {

                if (musicBtn) {
                    musicBtn.textContent = "🔊";
                }

            })
            .catch(function () {

                // Music may be blocked by browser

            });

    }


    // ===============================
    // MUSIC BUTTON
    // ===============================

    if (musicBtn) {

        musicBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                if (!weddingMusic) {
                    return;
                }

                if (weddingMusic.paused) {

                    weddingMusic.play()
                        .then(function () {

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
    // SHOW INVITATION
    // ===============================

    function showInvitation() {

        // Start music
        startWeddingMusic();


        // Hide cover
        if (cover) {
            cover.style.display = "none";
        }


        // Show sections
        if (welcome) {
            welcome.classList.remove("hidden");
        }

        if (details) {
            details.classList.remove("hidden");
        }

        if (rsvp) {
            rsvp.classList.remove("hidden");
        }


        // Start from top
        window.scrollTo(0, 0);


        // Start auto scroll
        setTimeout(function () {

            startAutoScroll();

        }, 1800);

    }


    // ===============================
    // OPEN INVITATION
    // ===============================

    if (openInvitation) {

        openInvitation.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showInvitation();

            }
        );

    }


    // ===============================
    // AUTO SCROLL
    // ===============================

    function startAutoScroll() {

        if (autoScrolling || !rsvp) {
            return;
        }

        autoScrolling = true;

        const startPosition =
            window.scrollY;

        const targetPosition = rsvp.offsetTop;

        const distance =
            targetPosition - startPosition;

        if (distance <= 0) {

            autoScrolling = false;
            return;

        }


        const duration = 34000;

        const startTime =
            performance.now();


        function animate(currentTime) {

            if (!autoScrolling) {
                return;
            }

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const easedProgress =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 -
                      Math.pow(
                          -2 * progress + 2,
                          2
                      ) / 2;


            const currentPosition =
                startPosition +
                distance * easedProgress;


            window.scrollTo(
                0,
                currentPosition
            );


            if (progress < 1) {

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
    // STOP AUTO SCROLL
    // ===============================

    function stopAutoScroll() {

        autoScrolling = false;

        if (autoScrollFrame) {

            cancelAnimationFrame(
                autoScrollFrame
            );

            autoScrollFrame = null;

        }

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


        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        if (
            !daysElement ||
            !hoursElement ||
            !minutesElement ||
            !secondsElement
        ) {
            return;
        }


        if (distance <= 0) {

            daysElement.textContent = "0";
            hoursElement.textContent = "0";
            minutesElement.textContent = "0";
            secondsElement.textContent = "0";

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


        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    // ===============================
    // RSVP
    // ===============================

    if (submitBtn) {

        submitBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                stopAutoScroll();


                const nameInput =
                    document.getElementById("fullName");

                const wishInput =
                    document.getElementById("wish");


                const fullName =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const wish =
                    wishInput
                        ? wishInput.value.trim()
                        : "";


                // ===============================
                // NAME REQUIRED
                // ===============================

                if (!fullName) {

                    alert(
                        "Please enter your name."
                    );

                    return;

                }


                // ===============================
                // SENDING
                // ===============================

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

                            wish: wish

                        })

                    }
                )
                .then(function () {

                    showThankYou();

                })
                .catch(function () {

                    alert(
                        "Something went wrong."
                    );

                    submitBtn.disabled = false;

                    submitBtn.textContent =
                        "Submit";

                });

            }
        );

    }


    // ===============================
    // SHOW THANK YOU
    // ===============================

    function showThankYou() {

        if (rsvp) {
            rsvp.style.display = "none";
        }


        if (thankyou) {

            thankyou.classList.remove("hidden");

            thankyou.style.display = "flex";

        }


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


        // Scroll
        if (thankyou) {

            thankyou.scrollIntoView({
                behavior: "smooth"
            });

        }


        submitBtn.disabled = false;

        submitBtn.textContent =
            "Submit";

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
            Math.random() * 100 + "%";


        petal.style.width =
            (
                20 +
                Math.random() * 18
            ) + "px";


        petal.style.animationDuration =
            (
                6 +
                Math.random() * 3
            ) + "s";


        container.appendChild(petal);


        setTimeout(
            function () {

                petal.remove();

            },
            9000
        );

    }

});
