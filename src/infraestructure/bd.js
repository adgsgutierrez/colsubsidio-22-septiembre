const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

class DbService {

    static instance;

    constructor(){}

    static get(){
        if(!DbService.instance){
            DbService.instance = new DbService();
        }
        return DbService.instance;
    }

    async connect() {
      const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_NAME}\`;`);
      await connection.end();

      console.log("Conectado a la base de datos");
      const sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD,
        {
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT,
          dialect: "mysql",
          sync: { force: false },
          define: {
          freezeTableName: true,
          timestamps: false,
          },
          pool: {
          acquire: 30000,
          idle: 10000,
          max: 3,
          min: 0,
          },
          logging: false,
        }
      );
      return sequelize;
    }
}

module.exports = DbService.get();