const express = require("express");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const app = express();

const MovieController= require("./controllers/MovieController");

const MovieDetailController=require("./controllers/MovieDetailController");

const BookingController=require("./controllers/BookingController");

const PORT = process.env.PORT || 3000;

const initializePassport = require("./passportConfig");

var homeFile= "./pages/home/home.html";
var loginFile= "./pages/login/login.html";
var registerFile= "./pages/register/register.html";
var movieFile= "./pages/movies/movie.html";

initializePassport(passport);

("./pages/home")


app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

exports.signUp = (req,res) => {
    
}



app.get("/", (req, res) => 
{
    res.sendFile(__dirname + "./pages/home/home.html");
    //res.sendFile(homeFile)

    //res.render("index");
});

app.get("/users/register", checkAuthenticated, (req, res) => {
    res.sendFile(registerFile);
    //res.render("register.ejs");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
    console.log(req.session.flash.error);
    res.sendFile(loginFile);
    //res.render("login.ejs");
});

app.get("/users/movies", checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    res.sendFile(movieFile);
   // res.render("dashboard", { user: req.user.name });
});

app.get("/users/logout", (req, res) => {
    req.logout();
    res.sendFile(homeFile);
    //res.render("index", { message: "You have logged out successfully" });
});

app.post("/users/register", async (req, res) => {
    let { name, email, password, password2 } = req.body;

    let errors = [];

    console.log({
    name,
    email,
    password,
    password2
    });

    if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
    }

    if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
    }

    if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        res.sendFile(registerFile, {errors,name,email,password, password2})
    //res.render("register", { errors, name, email, password, password2 });
    } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    pool.query
    (
      `SELECT * FROM users
        WHERE email = $1`,
        [email],
        (err, results) => 
        {
        if (err) {
            console.log("ERROR")
            console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0)
        {
            return res.sendFile(registerFile,{message: "Email already registered"});
            /*return res.render("register", {
            message: "Email already registered"*/
        
        } else {
            pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
                if (err) {
                throw err;
            }
            console.log(results.rows);
            req.flash("success_msg", "You are now registered. Please log in");
            res.redirect("/users/login");
            }
        );
        }
        }
    );
    }
});

app.post(
    "/users/login",
    passport.authenticate("local", {
    successRedirect: "/users/movies",
    failureRedirect: "/users/login",
    failureFlash: true
    })
);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated())
    {
    return res.redirect("/users/movies");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) 
    {
    return next();
    }
    res.redirect("/users/login");
}

app.route('/movieList')
        .get(MovieController.getAllMovies);

app.route('/movieList/:movie_id')
        .get(MovieDetailController.getMovieDetail);

app.route('/createBooking')
        .post(BookingController.createBooking);

app.route('/userBookings/:user_id')
        .get(BookingController.getBooking);       

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






