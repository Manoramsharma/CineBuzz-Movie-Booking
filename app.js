const express = require("express");
const { pool } = require("./dbConfig");

require("dotenv").config();
const app = express();

app.use(express.json());  

const MovieController= require("./controllers/MovieController");
const MovieDetailController=require("./controllers/MovieDetailController");
const AuthController=require("./controllers/AuthController");
const BookingController=require("./controllers/BookingController");

const PORT = process.env.PORT || 3000;
const { verifyToken } = require("./middlewares/authMiddleware");

app.use(express.urlencoded({ extended: false }));

app.route('/movieList')
        .get(MovieController.getAllMovies);

app.route('/movieList/:movie_id')
        .get(MovieDetailController.getMovieDetail);

app.route('/createBooking')
        .post(verifyToken, BookingController.createBooking);

app.route('/userBookings/:user_id')
        .get(BookingController.getBooking);  

app.route('/signup').post(AuthController.signUp); 

app.route('/signin').post(AuthController.signIn); 
        
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
});









