module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user', {
            IdUser: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Login: DataTypes.STRING,
            Password: DataTypes.STRING,
            Role: DataTypes.STRING
        },
        {
            tableName: "user",
            timestamps: false
        }
    );

    return User;
}
