const book_tickets= document.querySelector(".book_tickets");
const about_us= document.querySelector(".about_us");
const contact_us= document.querySelector(".contact_us");
const login_button= document.querySelector(".button");

book_tickets.addEventListener("click",()=>{
    location.href="/movies";
});

about_us.addEventListener("click",()=>{
  location.href="/about";
});

contact_us.addEventListener("click",()=>{
  location.href="/contact";
})

login_button.addEventListener("click",()=>{
  location.href="/login";
})