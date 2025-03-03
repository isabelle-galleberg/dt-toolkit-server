require("dotenv").config(); // Load the .env file

const { WebPubSubServiceClient } = require("@azure/web-pubsub");

// Get the connection string from environment variables
const connectionString = process.env.WEB_PUBSUB_CONNECTION_STRING;

const hub = "Hub";

const server = new WebPubSubServiceClient(connectionString, hub);

server.sendToAll(process.argv[2], { contentType: "text/plain" });
