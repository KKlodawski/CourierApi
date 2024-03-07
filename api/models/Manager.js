module.exports = (sequelize, DataTypes) => {
    const Menager = sequelize.define(
        'menager', {
            IdMenager: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            IdUser: DataTypes.INTEGER,
            Name: DataTypes.STRING,
            Surname: DataTypes.STRING,
            EmploymentDate: DataTypes.DATE
        },
        {
            tableName: "menadzer",
            timestamps: false
        }
    );

    return Menager;
}
