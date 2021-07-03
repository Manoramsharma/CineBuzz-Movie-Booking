const { pool } = require("../dbConfig");

module.exports.giveRating = (req, res) => {
  var rating_number = req.body.rating_number;
  var user_id = req.user_id;
  var movie_id = req.body.movie_id;

  pool
    .query(
        `UPDATE bookings SET rating_number='${rating_number}' where movie_id='${movie_id}' AND user_id='${user_id}';`
    )
    .then((data) => {
      BookingDone = data.rowCount;
      console.log(BookingDone);
      console.log(data);
      res.status(200).json({
        success: "Success",
      });
    });
};
