const express = require("express");
const path = require("path");

require("dotenv").config();
const app = express();

app.use(express.json());

app.use("/public", express.static("public"));

const MovieController = require("./controllers/MovieController");
const MovieDetailController = require("./controllers/MovieDetailController");
const AuthController = require("./controllers/AuthController");
const BookingController = require("./controllers/BookingController");
const RatingController = require("./controllers/RatingController");



const PORT = process.env.PORT || 3000;
const { verifyToken } = require("./middlewares/authMiddleware");

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages/home/home.html"));
});

app.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages/home/home.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages/login2/login2.html"));
});

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages/register/Register.html"));
});

app.get("/movies", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages/movies/movie.html"));
});

app.get("/book", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages/bookTicket/Ticket.html"));
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages/explore/AboutUs/aboutUs.html"));
});

app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "./pages/ContactUs/ContactUs.html"));
});


app.route("/movieList").get(MovieController.getAllMovies);

app.route("/movieList/:movie_id").get(MovieDetailController.getMovieDetail);

app.route("/createBooking").post(verifyToken, BookingController.createBooking);

app.route("/userBookings/:user_id").get(BookingController.getBooking);

app.route("/giveRating").post(verifyToken, RatingController.giveRating);

app.route("/signup").post(AuthController.signUp);

app.route("/signin").post(AuthController.signIn);

app.route("/showSeats/:movie_id").get(BookingController.getSeatsOccupancy);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
