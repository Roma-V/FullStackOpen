/**
 * @file configures variables to use in the backend.
 * @author Roman Vasilyev
 */

require('dotenv').config()

const PORT = process.env.PORT || 4000
let MONGODB_URI = process.env.MONGODB_URI
const LOGIN_TOKENIZER = process.env.LOGIN_TOKENIZER

module.exports = {
  MONGODB_URI,
  PORT,
  LOGIN_TOKENIZER
}