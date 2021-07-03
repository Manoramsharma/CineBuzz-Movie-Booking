const { pool } = require("../dbConfig");

module.exports.createBooking = async (req, res) => {
  var user_id = req.user_id;
  var movie_id = req.body.movie_id;
  var seat_numbers = req.body.seat_numbers;

  var price = 1;
  var booking_id;
  console.log(movie_id + "***");

  const date = new Date().toLocaleDateString();
  console.log(date + " $$$ ");

  const movies = await pool.query(
    `SELECT price FROM movies where movie_id='${movie_id}';`
  );
  price = movies.rows[0].price;

  const seats_occupied = await pool.query(
    `SELECT * FROM seats_occupancy WHERE movie_id = ${movie_id} AND seat_number IN (${seat_numbers.join(
      ","
    )});`
  );

  if (seats_occupied.rows.length !== 0) {
    res.status(400).json({
      error:
        "One or more seats have already been booked. Please try again with different seats",
    });
  } else {
    const booking_query_data= await pool.query(`INSERT INTO bookings (user_id,movie_id,price,date) VALUES ('${user_id}' , ${movie_id} , ${price} , '${date}') RETURNING *;`)
   const booking_data= booking_query_data.rows[0];
   //console.log({booking_data});
   const {booking_id} = booking_data;

   const seats_insert_string= seat_numbers.map(seat_number=>`(${movie_id},${seat_number},${booking_id})`).join(",");

   const seats_created_query= await pool.query(`INSERT INTO seats_occupancy (movie_id,seat_number,booking_id) VALUES ${seats_insert_string};`)


    return res.status(200).json({
      message: `Booking done for ${user_id}`,
    });
  }
};

module.exports.getBooking = async (req, res) => {
  let bookingData = [];
  let client = null;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM bookings where user_id='${req.params.user_id}'`
    );
    bookingData = result.rows;
  } finally {
    client.release();
  }

  return res.status(200).json({
    message: "Success",
    bookingData: bookingData,
  });
};
