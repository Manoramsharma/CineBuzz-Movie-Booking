const body = document.querySelector("body");

const login_button=document.querySelector(".forgot");

window.addEventListener("load", () => {
    body.classList.add("visible");
});

const signUpForm=document.querySelector(".form1");

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.querySelector(".un").value
    const name=document.querySelector(".name").value;
    const password = document.querySelector(".pass").value;
    const retypedPassword = document.querySelector(".confirmPass").value;

    
    if (password !== retypedPassword) {
    alert("Passwords don't match");
    return;
    };

    fetch(`/signup`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ name,email, password }),
    })
    .then((res) => res.json())
    .then((data) => {
        const { token } = data;
        console.log(data);

        if (token) {
        localStorage.setItem("jwt", token);
        const submit = document.querySelector(".submit");
        location.href = "/movies";
        } else {
        alert("SignUp Again");
        }
    })
    .catch((err) => {
        alert("Re-try signing up!!");
        console.log(err);
    });
});

login_button.addEventListener("click",()=>{
    location.href = "/login"
})