const jwt = require("jsonwebtoken");
const { pool }  = require("../configs/db");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(500).json({ error: "Server error occured" });
    }
    const userEmail = decoded.email;

    pool
      .query(`SELECT * FROM users WHERE email = '${userEmail}';`)
      .then((data) => {
        if (data.rows.length === 0) {
          res.status(400).json({
            message: "Invalid token",
          });
        } else {
          req.email = userEmail;
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Database error occured",
        });
      });
  });
};