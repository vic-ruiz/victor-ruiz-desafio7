import 'dotenv/config'

export const options = {
    client: 'mysql',
    connection: {
        host: "localhost",
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'ecommerce'
    },
    pool: { min: 0, max: 10 }
};