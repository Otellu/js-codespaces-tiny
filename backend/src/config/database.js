const { Sequelize } = require('sequelize');

// Postgres connection via Sequelize
let sequelize;

const buildSequelize = () => {
  // Support DATABASE_URL (e.g., for Heroku) or discrete POSTGRES_* vars
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    return new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: false
    });
  }

  const dbName = process.env.POSTGRES_DB || 'mern_mini';
  const dbUser = process.env.POSTGRES_USER || 'postgres';
  const dbPass = process.env.POSTGRES_PASSWORD || 'postgres';
  const dbHost = process.env.POSTGRES_HOST || 'localhost';
  const dbPort = Number(process.env.POSTGRES_PORT || 5432);

  return new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: false
  });
};

// Build the sequelize instance immediately so models can import it safely
sequelize = buildSequelize();

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Postgres Connected Successfully');
    // Ensure tables exist; keep it conservative
    await sequelize.sync();
    return { type: 'postgres', connection: sequelize };
  } catch (error) {
    console.error('Postgres Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  getSequelize: () => sequelize,
  sequelize
};