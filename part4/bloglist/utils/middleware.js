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

function tokenExtractor(request, _, next) {
  const token = /(?<=Bearer ).*/.exec(request.get("authorization"))
  if (token) request.token = token[0]
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}
