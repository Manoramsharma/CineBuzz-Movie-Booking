const { pool } = require("../configs/db");



module.exports.getMovieDetail = async function(req,res)
{
    let movie=[];
    let client=null;
    try
    {
        /*const sql=`SELECT * FROM movies where movie_id='${req.params.movie_id}'`;
        console.log(sql);*/

        client = await pool.connect()
        const result = await client.query(`SELECT * FROM movies where movie_id='${req.params.movie_id}'`);
        movie=result.rows;
    } 
    finally
    {
        client.release()
    }





    return res.json
    ({
        status: 200,
        movie: movie,
    });

}

