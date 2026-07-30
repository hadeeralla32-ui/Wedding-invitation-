// Open Invitation button

const openButton = document.getElementById("openInvitation");
const invitation = document.getElementById("invitation");

openButton.addEventListener("click", function () {

    invitation.scrollIntoView({
        behavior: "smooth"
    });

});
