module.exports = (sequelize, DataTypes) => {
    const Courier = sequelize.define(
        'courier', {
            IdCourier: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            IdUser: DataTypes.INTEGER,
            Name: DataTypes.STRING,
            Surname: DataTypes.STRING,
            EmploymentDate: DataTypes.DATE,
            CourierStatus: DataTypes.STRING,
            IsActive: DataTypes.BOOLEAN
        },
        {
            tableName: "courier",
            timestamps: false
        }
    );
    return Courier;
}
