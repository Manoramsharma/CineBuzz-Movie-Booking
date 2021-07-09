const jwt = require("jsonwebtoken");
const { pool } = require("../configs/db");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err || !decoded) {
      res.status(500).json({ error: "Login required" });
    }
    console.log({ decoded });
    const userEmail = decoded.email;

    pool
      .query(`SELECT * FROM users WHERE email = '${userEmail}';`)
      .then((data) => {
        if (data.rows.length === 0) {
          res.status(400).json({
            message: "Invalid token",
          });
        } else {
          const userData = data.rows[0];
          req.email = userEmail;
          req.user_id = userData.id;
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
