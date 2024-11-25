const BadRequest = require('./bad_request')
const CustomAPIError = require('./custom-api')
const Forbidden = require('./forbidden')
const NotFound = require('./not-found')
const UnAuthenticated = require('./unauthenticated')

module.exports = {
    BadRequest,
    CustomAPIError,
    Forbidden,
    NotFound,
    UnAuthenticated
}