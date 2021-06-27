const { pool } = require("../dbConfig");

module.exports.createBooking=(req,res)=>
{
    const{ movie_id, seat_number } = req.body;
    
    pool
    .query(`INSERT INTO bookings (movie_id) VALUES ('${req.params.movie_id}' );`)

    pool
    .query(`INSERT INTO seats_occupancy (seat_number) VALUES ('${req.params.seat_number}' );`)

    //how to insert seat 
            
.then((data)=>{
    res.status(200).json({
        message: "Booking done",
    });
})
.catch((err)=>{
    res.status(400).json({
        message:"DB error",
    });


});

};



//for post
//router.post("/createBooking",verifyToken,createBooking);


module.exports.getBooking=(req,res)=>
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



