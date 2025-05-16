// src/server.ts
import config from "./config";
import { initDatabase } from "./db";
import app from "./app";

// Initialize database and start server
const startServer = async (): Promise<void> => {
  try {
    console.log('Starting server...');
    
    // Connect to the database
    await initDatabase();
    
    // Start the server
    const PORT = config.server.port;
    const HOST = config.server.host;
    
    app.listen(PORT, () => {
      console.log(`Server started on ${HOST}:${PORT} in ${config.server.env} mode`);
      console.log(`API available at ${config.server.apiPrefix}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start server if this file is run directly
if (require.main === module) {
  startServer();
}

// Export for testing purposes
export { app, startServer };