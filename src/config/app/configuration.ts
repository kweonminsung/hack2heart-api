export default () => ({
  app: {
    env: process.env.APP_ENV,
    port: process.env.APP_PORT,
  },
  kafka: {
    topic: process.env.KAFKA_TOPIC,
    broker_url: process.env.KAFKA_BROKER_URL,
    client_id: process.env.KAFKA_CLIENT_ID,
  },
  model: {
    server_url: process.env.MODEL_SERVER_URL,
  },
  gemini: {
    api_key: process.env.GEMINI_API_KEY,
  },
});
