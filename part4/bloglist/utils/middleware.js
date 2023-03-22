const logger = require("../utils/logger")
function errorHandler(error, request, response, next) {
  logger.error(error)
  let errorMessage
  switch (error.name) {
    case "CastError":
      errorMessage = "Malformatted ID"
      break
    case "ValidationError":
    case "JsonWebTokenError":
      errorMessage = error.message
      break
  }
  if (errorMessage)
    return response.status(400).json({ error: errorMessage })

  next(error)
}

module.exports = {
  errorHandler
}
