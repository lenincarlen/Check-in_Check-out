const { Sequelize, DataTypes } = require ('sequelize')

//Establishing the database conection...
const db = new Sequelize({
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'mellolenin',
	port: 5432,
	database: 'test2',
	logging: false,
});

//exporting const db...
module.exports = { db, DataTypes }