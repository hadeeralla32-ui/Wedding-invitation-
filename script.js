
// ===============================
// OPEN INVITATION
// ===============================

const openBtn = document.getElementById("openInvitation");
const cover = document.getElementById("cover");

if (openBtn) {

    openBtn.addEventListener("click", () => {

        cover.style.transition = "1s";

        cover.style.transform = "translateY(-100%)";

        cover.style.opacity = "0";

        setTimeout(() => {

            cover.style.display = "none";

            window.scrollTo({
                top: document.getElementById("welcome").offsetTop,
                behavior: "smooth"
            });

        }, 900);

    });

}



// ===============================
// GUEST NAME
// ===============================

const params = new URLSearchParams(window.location.search);

const guest = params.get("guest");

const guestMessage = document.getElementById("guestMessage");

if (guestMessage) {

    if (guest) {

        guestMessage.innerHTML = `Dear ${guest},`;

    } else {

        guestMessage.innerHTML = "Dear Guest,";

    }

}



// ===============================
// COUNTDOWN
// ===============================

const weddingDate = new Date("September 15, 2026 19:00:00").getTime();

const timer = setInterval(() => {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent = hours;

    document.getElementById("minutes").textContent = minutes;

    document.getElementById("seconds").textContent = seconds;

    if (distance < 0) {

        clearInterval(timer);

    }

}, 1000);
// ===============================
// RSVP
// ===============================

const submitBtn = document.getElementById("submitRSVP");

if (submitBtn) {

    submitBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();

        const attend = document.querySelector('input[name="attend"]:checked');

        const guests = document.getElementById("guests").value;

        const wish = document.getElementById("wish").value.trim();

        if (fullName === "") {

            alert("Please enter your name.");

            return;

        }

        if (!attend) {

            alert("Please choose if you will attend.");

            return;

        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        emailjs.send(
            "service_en4wlao",
            "template_p6x3mhr",
            {
                fullName: fullName,
                attendance: attend.value,
                guests: guests,
                wish: wish
            }
        ).then(function () {

            document.getElementById("thankyou").style.display = "flex";

            document.getElementById("thankyou").scrollIntoView({
                behavior: "smooth"
            });

        }).catch(function (error) {

            console.log(error);

            alert("Sorry, something went wrong. Please try again.");

        }).finally(function () {

            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";

        });

    });

}
// ===============================
// SHOW FIRST PAGE
// ===============================

window.addEventListener("load", () => {

    document.getElementById("cover").classList.add("show");

});
