const { response } = require('express')

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  } else if (err.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(err)
}

module.exports = errorHandler
