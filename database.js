const mysql = require("mysql2/promise");

let connection;

async function connectDB() {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        user: "root",
        password: "Mystery12345",
        host: "localhost",
        database: "secondProject",
      });
      console.log("Connected to the database successfully.");
    } catch (error) {
      console.error(
        "Something went wrong with connecting to the database:",
        error
      );
      throw error;
    }
  }
  return connection;
}

async function closeDB() {
  if (connection) {
    try {
      await connection.end();
      console.log("Database connection closed.");
      connection = null;
    } catch (error) {
      console.error(
        "Something went wrong while closing the database connection:",
        error
      );
      throw error;
    }
  }
}

module.exports = {
  connectDB,
  closeDB,
};
