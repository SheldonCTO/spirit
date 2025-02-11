import 'dotenv/config';

const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_DEV_HOST,
      port: process.env.DB_DEV_PORT,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASSWORD,
      database: process.env.DB_DEV_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_STAGING_HOST,
      port: process.env.DB_STAGING_PORT,
      user: process.env.DB_STAGING_USER,
      password: process.env.DB_STAGING_PASSWORD,
      database: process.env.DB_STAGING_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_PRO_HOST,
      port: process.env.DB_PRO_PORT,
      user: process.env.DB_PRO_USER,
      password: process.env.DB_PRO_PASSWORD,
      database: process.env.DB_PRO_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }
};

export default config;