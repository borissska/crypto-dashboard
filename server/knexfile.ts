module.exports = {
  development: {
    client: "pg", // Используем PostgreSQL
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "root",
      database: "crypto_dashboard",
      port: 5432,
    },
    migrations: {
      directory: "./migrations", // Папка с миграциями
    },
    seeds: {
      directory: './seeds',
    },
  },
};
