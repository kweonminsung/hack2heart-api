export default () => ({
  app: {
    env: process.env.APP_ENV,
    port: process.env.APP_PORT,
  },
  kafka: {
    broker_url: process.env.KAFKA_BROKER_URL,
    client_id: process.env.KAFKA_CLIENT_ID,
    group_id: process.env.KAFKA_GROUP_ID,
  },
});
