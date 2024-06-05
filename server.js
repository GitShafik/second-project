const app = require("./app");

const PORT = process.env.PORT || 3600;

const server = app.listen(PORT, () => {
  console.log(`Server started listening on localhost:${PORT}`);
});

// Gracefully shutdown the server
process.on("SIGINT", async () => {
  console.log("Stopping server...");
  try {
    if (connection) {
      await connection.end(); // Close the database connection
    }
    server.close(() => {
      console.log("Server stopped.");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error occurred during shutdown:", error);
    process.exit(1);
  }
});
