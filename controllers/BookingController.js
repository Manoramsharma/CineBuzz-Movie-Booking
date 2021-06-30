const { pool } = require("../dbConfig");

module.exports.createBooking=(req,res)=>
{

    var user_id = req.user_id ;
    var movie_id=req.body.movie_id;
    var seat_number = req.body.seat_number;
    var price=1;
    var booking_id ;
    console.log(movie_id+"***")
    
    
    const date =new Date().toLocaleDateString();
    console.log(date + " $$$ ")



    pool
    .query(`SELECT price FROM movies where movie_id='${movie_id}';`)
    .then((data)=>{
        price= data.rows[0].price;
        console.log(price+ "***");
        //console.log(data)

    })



    pool
    .query(`SELECT * FROM seats_occupancy WHERE movie_id = ${movie_id} AND seat_number=${seat_number};`)
    .then((data)=>{
        existingBooking= data.rows;

        if (existingBooking.length !== 0) 
        {
            res.status(400).json({
                error: "One or more seats have already been booked. Please try again with different seats",
            });
        } 
        else
        {
        pool
        .query(`INSERT INTO bookings (user_id,movie_id,price,date) VALUES ('${user_id}' , ${movie_id} , ${price} , '${date}') ;`)

        pool
        .query(`SELECT booking_id FROM bookings where movie_id=${movie_id} AND user_id='${user_id}' AND date='${date}';`)
        .then((data)=>{
            console.log(data.rows[0]+"&");
            booking_id= data.rows[0].booking_id;
            console.log(booking_id+ "***");
    
        })
    
        pool
        .query(`INSERT INTO seats_occupancy (movie_id,seat_number,booking_id) VALUES ('${movie_id}','${seat_number}','${booking_id} );`)


        return res.status(200).json({
            message: `Booking done for ${user_id}`,
        });
    
        }
    })
};
module.exports.getBooking= async(req,res)=>
{
    
    let bookingData=[];
    let client=null;
    try
    {
        client = await pool.connect()
        const result = await client.query(`SELECT * FROM bookings where user_id='${req.params.user_id}'`);
        bookingData=result.rows;
    } 
    finally
    {
        client.release()
    }

    return res.status(200).json
    ({
        message : "Success",
        bookingData: bookingData,
    });
}


