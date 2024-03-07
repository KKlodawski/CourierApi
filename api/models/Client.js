module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define(
        'client', {
            IdClient: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            IdUser: DataTypes.INTEGER,
            Name: DataTypes.STRING,
            Surname: DataTypes.STRING,
            Email: DataTypes.STRING,
            Phone: DataTypes.STRING
        },
        {
            tableName: "client",
            timestamps: false
        }
    );

    return Client;
}
