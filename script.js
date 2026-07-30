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
    `Dear ${guestName},<br><br>
    You are warmly invited to celebrate the beginning of our forever.`;
}
