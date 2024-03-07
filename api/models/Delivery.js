module.exports = (sequelize, DataTypes) => {
    const Delivery = sequelize.define(
        'delivery', {
            IdDelivery: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            DeliveryAddress: DataTypes.STRING,
            PostDate: DataTypes.DATE,
            DeliveryStatus: DataTypes.STRING,
            EstimatedTimeArrival: DataTypes.DATE,
            IdCourier: DataTypes.INTEGER,
            IdClient: DataTypes.INTEGER
        },
        {
            tableName: "delivery",
            timestamps: false
        }
    );

    //Delivery.belongsTo(sequelize.models.Client, {foreignKey: "IdClient"});

    return Delivery;
}
