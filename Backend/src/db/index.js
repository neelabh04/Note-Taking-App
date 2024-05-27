import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({
    path: '.././././.env'
})

export const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_URI,
    logging: false,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql'
})
   
const connectDB = async() => {
    sequelize.authenticate()
    .then(() => {
        console.log(`Successfully connected to the MySQL database! on port: ${sequelize.config.port}`)
    })
    .catch((error) => console.log('Failed to connect the database:', error))
}


export default connectDB;