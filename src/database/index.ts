import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'netflixProject',
    username: 'postgres',
    password: 'admin',
    define: {
        underscored: true
    }
})