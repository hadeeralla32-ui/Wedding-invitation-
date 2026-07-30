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
    guestMessage.innerHTML =
`Dear ${guestName},`;
}
// Countdown

const weddingDate = new Date(2026, 8, 15, 19, 0, 0);

function updateCountdown() {

    const now = new Date();
    const distance = weddingDate - now;

    if (distance <= 0) return;

    const totalSeconds = Math.floor(distance / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);
