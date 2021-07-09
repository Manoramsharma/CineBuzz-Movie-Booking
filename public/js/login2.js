const body = document.querySelector("body");

window.addEventListener("load", () => {
    body.classList.add("visible");
});

const signInform = document.querySelector(".form1");

signInform.addEventListener("submit", (event) => {
    event.preventDefault();

const signInEmail = document.querySelector(".un");
const signInPassword = document.querySelector(".pass");

const email=signInEmail.value;
const password=signInPassword.value;

fetch(`/signin`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    })
    .then((res) => res.json())
    .then((data) => {
        const { token } = data;

        if (token) {
        localStorage.setItem("jwt", token);
        location.href = "/movies";
        } else {
        alert("SignIn Again");
        }
    })
    .catch((err) => {
        alert("Re-try signing in!!");
        console.log(err);
    });

});

const register_redirect=document.querySelector(".forgot");


register_redirect.addEventListener("click", () => {
    location.href = "/register";
});




