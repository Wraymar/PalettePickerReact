//this is gonna be used to create an instance of Knex so that we can use it
//in our models to execute SQL commands

//this way we can import this knex file to execute the queries

const env = process.env.NODE_ENV; //development shhh
const config = require("../knexfile")[env];
module.exports = require("knex")(config);

/* Instead of writing to code above 20 different times in different files
that we need to use knex, we can just create this logic in a seaparate file
and then just import when you need to use knex. It centralizes the functionality
once. */
