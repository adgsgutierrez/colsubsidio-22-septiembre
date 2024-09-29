const { DataTypes } = require('sequelize');
const database = require('./../infraestructure/bd')

async function usersTable(){
    try{
        const dbRef = await database.connect()
        const userTable = dbRef.define('t_users_app', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            photo: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            timestamps: false
        });
        userTable.sync(); // Add this line to create the table if it doesn't exist
        return userTable;
    }catch(e){
        console.error('Error al inicializar la tabla:', e);
        throw e;
    }
}
module.exports = usersTable;
