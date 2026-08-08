

// ===============================
// GUEST NAME
// ===============================

const params = new URLSearchParams(window.location.search);

const guest = params.get("guest");

if (guest) {

    document.getElementById("guestMessage").innerHTML =
    `Dear ${guest},`;

}


// ===============================
// COUNTDOWN
// ===============================

const weddingDate = new Date("September 15, 2026 19:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

},1000);
// ===============================
// RSVP
// ===============================

const submitBtn = document.getElementById("submitRSVP");

submitBtn.addEventListener("click", function (e) {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();

    const attend = document.querySelector('input[name="attend"]:checked');

    const guests = document.getElementById("guests").value;

    const wish = document.getElementById("wish").value.trim();

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

    fetch("https://script.google.com/macros/s/AKfycbxgbos5vqFnMuqHUOtrSFbFArca3dHQwjJVIRswLaBsiwtxwXGckQsxaTzYvpvGToew/exec", {

        method: "POST",
mode: "no-cors",
        body: JSON.stringify({

            fullName: fullName,

            attendance: attend.value,

            guests: guests,

            wish: wish

        })

    })

.then(() => {

    rsvp.style.display = "none";

    thankyou.style.display = "flex";

    for(let i = 0; i < 30; i++){

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

    const container = document.querySelector(".petals-container");

    if (!container) return;

    const petal = document.createElement("img");

    petal.src = petals[Math.floor(Math.random() * petals.length)];

    petal.className = "petal";

    petal.style.left = Math.random() * 100 + "%";

    petal.style.width = (20 + Math.random() * 18) + "px";

    petal.style.animationDuration = (6 + Math.random() * 3) + "s";

    container.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 9000);

}
const weddingMusic = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");

let musicStarted = false;

function startMusic() {
    if (musicStarted) return;

    weddingMusic.play()
        .then(() => {
            musicStarted = true;
            musicBtn.innerHTML = "🔊";
        })
        .catch(() => {
            musicStarted = false;
        });
}

document.addEventListener("touchstart", function (event) {
    if (event.target === musicBtn) return;
    startMusic();
}, { once: true });

document.addEventListener("pointerdown", function (event) {
    if (event.target === musicBtn) return;
    startMusic();
}, { once: true });

musicBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    if (weddingMusic.paused) {
        weddingMusic.play()
            .then(() => {
                musicStarted = true;
                musicBtn.innerHTML = "🔊";
            });
    } else {
        weddingMusic.pause();
        musicBtn.innerHTML = "🔇";
    }
});
