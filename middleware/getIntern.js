const jwt = require('jsonwebtoken')
require("dotenv").config();

const getIntern = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    return res.status(401).send({error: 'Please use a valid token'})
  }

  const data = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(data)
  req.intern = data.intern;
  next();
}

module.exports = getIntern;
