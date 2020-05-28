module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
           filename: "./data/users.db3"
        },
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds"
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds"
        }
    }
}