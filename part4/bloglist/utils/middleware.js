const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")

function errorHandler(error, _, response, next) {
  logger.error(error)
  let errorMessage
  switch (error.name) {
    case "CastError":
      errorMessage = "Malformatted ID"
      break
    case "ValidationError":
      errorMessage = error.message
      break
    case "JsonWebTokenError":
      return response.status(401).json({ error: error.message })
  }
  if (errorMessage)
    return response.status(400).json({ error: errorMessage })

  next(error)
}

function tokenExtractor(request, _, next) {
  const token = /(?<=Bearer ).*/.exec(request.get("authorization"))
  if (token) request.token = token[0]
  next()
}

function userExtractor(request, _, next) {
  const { id } = jwt.verify(request.token, process.env.SECRET)
  if (id) request.user = id
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}
