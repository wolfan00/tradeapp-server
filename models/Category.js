export default (sequelize, DataTypes) => {

    const Category = sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(255),
            },
        },
        {
            tableName: "categories",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    );
    
    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: "category_id",
            as: "products",
        });
    }
    
    return Category;
}