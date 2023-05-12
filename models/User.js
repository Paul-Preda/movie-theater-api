//import our db, Model, DataTypes
let { db, DataTypes } = require('../db/connection')

//Creating a User child class from the Model parent class
let User = db.define("users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
});

//exports
module.exports = User;