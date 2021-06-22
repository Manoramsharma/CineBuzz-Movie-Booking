const { pool } = require("../dbConfig");

module.exports.getAllMovies = async function(req,res)
{
    let movies=[];
    let client = null ;
    try
    {
        client = await pool.connect()
        const result = await client.query('SELECT * FROM movies')
        movies=result.rows;
    } 
    finally
    {
        client.release()
    }



    return res.json({
        status: 200,
        movies: movies,
    });
}