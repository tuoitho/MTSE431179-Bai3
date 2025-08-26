import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    gender: boolean;
    image: string;
    roleId: string;
    positionId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public address!: string;
    public phoneNumber!: string;
    public gender!: boolean;
    public image!: string;
    public roleId!: string;
    public positionId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        // define association here
    }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    User.init({
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        address: {
            type: dataTypes.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: dataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },
        image: {
            type: dataTypes.STRING,
            allowNull: true
        },
        roleId: {
            type: dataTypes.STRING,
            allowNull: true
        },
        positionId: {
            type: dataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'User'
    });
    return User;
};
