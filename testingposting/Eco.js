module.exports = (sequelize, DataTypes) => {
    const Eco = sequelize.define("Eco", {
        prodName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        leaves: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sku: {
            type: DataTypes.STRING(50), // Changed to STRING to match ProductDetail
            allowNull: false
        }
    }, {
        tableName: 'ecos'
    });
    return Eco;
};
