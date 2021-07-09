/*require('dotenv').config();*/

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movie_id");
const confirm_button = document.querySelector("#confirm_booking");

let seats_selected = [];

let seats_occupied = [];

const logout = document.querySelector(".logout");

const token = localStorage.getItem("jwt");

let movieData = null;

logout.addEventListener("click", () => {
  localStorage.removeItem("jwt");
  location.href = "/";
});

console.log(movieId);

const body = document.querySelector("body");
var movieName = document.querySelector("#movie");
const userLoggedIn = Boolean(localStorage.getItem("jwt"));

/*const current_moviePrice=movieData.movie[0].price;*/
console.log(userLoggedIn);
if (!userLoggedIn) {
  window.location = "/login?redirect=/book";
}

async function setMovieName() {
  movieData = await fetch(`/movieList/${movieId}`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  }).then((res) => res.json());
  console.log(movieData);

  document.querySelector(
    "#movie_with_price"
  ).innerText = `${movieData.movie[0].movie_name} (Rs. ${movieData.movie[0].price})`;
}

//for price and seats

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

async function updateSelectedCount() {
  const selectedSeatsCount = seats_selected.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * `${movieData.movie[0].price}`;
}

async function sync_occupied_seats() {
  const Data = await fetch(`/showSeats/${movieId}`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  }).then((res) => res.json());
  console.log({ Data });

  seats_occupied = Data.seatsData.map((d) => d.seat_number);

  for (let index = 0; index < seats_occupied.length; index++) {
    const seat_number = seats_occupied[index];
    const seat_button = document.getElementById(seat_number);

    seat_button.classList.add("occupied");
  }
}

// Seat click event
container.addEventListener("click", (e) => {
  const is_seat_element = e.target.classList.contains("seat");

  if (!is_seat_element) return;

  if (e.target.classList.contains("occupied")) return;

  const seat_id = parseInt(e.target.id);
  //console.log({ seat_id });

  const seat_index = seats_selected.indexOf(seat_id);

  if (seat_index == -1) {
    seats_selected.push(seat_id);
  } else {
    seats_selected.splice(seat_index, 1);
  }
  console.log(seats_selected);

  e.target.classList.toggle("selected");

  updateSelectedCount();
});

// initial count and total
window.addEventListener("load", () => {
  setMovieName();
  sync_occupied_seats();
});

confirm_button.addEventListener("click", async () => {
  console.log("it is working");

  fetch(`/createBooking`, {
    method: "POST",
    headers: {
      authorization: token,

      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movie_id: movieId, seat_numbers: seats_selected }),
  }).then((res) => {
    if (res.ok) {
      

      alert("Booking completed successfully");
      window.location = "/home";
    } else {
      alert("Retry booking by signing in again!");
    }
  });
});
