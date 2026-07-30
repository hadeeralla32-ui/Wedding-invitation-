// Open Invitation button

const openButton = document.getElementById("openInvitation");
const invitation = document.getElementById("invitation");

openButton.addEventListener("click", function () {
    invitation.scrollIntoView({
        behavior: "smooth"
    });
});


// Guest name from URL

const guestMessage = document.getElementById("guestMessage");

const params = new URLSearchParams(window.location.search);
const guestName = params.get("guest");

if (guestName) {
    guestMessage.textContent = `Dear ${guestName},`;
}


// Countdown

const weddingDate = new Date("2026-09-15T19:00:00+03:00").getTime();

function updateCountdown() {

    const now = Date.now();
    const distance = weddingDate - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = 0;
        document.getElementById("hours").textContent = 0;
        document.getElementById("minutes").textContent = 0;
        document.getElementById("seconds").textContent = 0;

        clearInterval(countdown);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();

const countdown = setInterval(updateCountdown, 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = now.getHours() + " / " + hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);
