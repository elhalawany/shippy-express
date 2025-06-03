import "dotenv/config";
import app from "./app.js";
import sequelize from "./config/sequelize.js";
import redisClient from "./config/redis.js";

const PORT = process.env.PORT || 3000;

// Start the server
(async () => {
  try {
    // Sync Sequelize models with the database
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Uncomment these lines if you want to sync models with the database schema don't use this in production as it will drop existing tables
    // await sequelize.sync({force: true});
    // console.log("Database synced successfully.");

    // Start the Redis client
    await redisClient.connect();
    console.log("Connected to Redis successfully.");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);

    process.exit(1); // Exit the process with failure
  }
})();
