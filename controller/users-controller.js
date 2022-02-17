const users = require("../db/data/test-data/users")
const {fetchUsers} = require("../model/users-model")
exports.getUsers = (request, response, next) => {
      fetchUsers()
      .then((users) => {
          response.status(200).send({users})
      })
      .catch(next)
}