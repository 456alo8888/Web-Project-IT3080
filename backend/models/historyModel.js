import { DataTypes } from 'sequelize';
import sequelize from 'backend/config/mySQL.js';
import Fee from 'backend/models/feeModel.js';

const historySchema = sequelize.define('historySchema', {
    feeID: {
        type: DataTypes.INTEGER,
        allowNull : false,
        unique: true,
        references: {
            model: fee,
            key: 'id',
        }
    },
    feeName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    feeCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roomPayed: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    updateAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.now,
    },
}),
    export default historySchema;
    
