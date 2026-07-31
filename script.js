// ===============================
// OPEN INVITATION
// ===============================

const cover = document.getElementById("cover");
const welcome = document.getElementById("welcome");
const details = document.getElementById("details");
const rsvp = document.getElementById("rsvp");
const thankyou = document.getElementById("thankyou");

document.getElementById("openInvitation").addEventListener("click", () => {

    cover.style.display = "none";

    welcome.classList.remove("hidden");
    details.classList.remove("hidden");
    rsvp.classList.remove("hidden");

    window.scrollTo({
        top: welcome.offsetTop,
        behavior: "smooth"
    });

});


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

        body: JSON.stringify({

            fullName: fullName,

            attendance: attend.value,

            guests: guests,

            wish: wish

        })

    })

    .then(() => {

        rsvp.classList.add("hidden");

        thankyou.classList.remove("hidden");

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
