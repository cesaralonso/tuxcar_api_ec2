
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();


// connect to the db
connectionInfo = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 5, //mysql connection pool length
    debug    :  false,
    wait_timeout : 28800,
    connect_timeout :10,
    waitForConnections : true,
    queueLimit :0,
    dateStrings: true 
};

//create mysql connection pool
var dbconnection = mysql.createPool(
  connectionInfo
);

// Attempt to catch disconnects 
dbconnection.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});


module.exports = dbconnection;

