module.exports = (sequelize, DataTypes) => {
    const ProductDetail = sequelize.define("ProductDetail", {
        prodimg: {
            type: DataTypes.STRING(255), // Assuming image URL or path
            allowNull: false
        },
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
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'product_details'
    });
    return ProductDetail;
};
