const tokenExtractor = (request, response, next) => {
    let authToken = null
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      authToken = authorization.substring(7)
    }
    request.token = authToken
    next()
}

module.exports = {
    tokenExtractor
}