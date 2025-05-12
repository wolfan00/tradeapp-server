export default (sequelize, DataTypes) => {

const User = sequelize.define(
  `User`,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('Admin', 'User'),
      defaultValue: 'User',
    },
  },
  { tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 }
);

User.associations = models => {
  User.hasMany(models.Product, {
    foreignKey: 'owner_id',
    as: 'products',
  });
  User.hasMany(models.TradeOffer, {
    foreignKey: 'offerer_id',
    as: 'trade_offers',
  });
  User.hasMany(models.TradeMessage, {
    foreignKey: 'sender_id',
    as: 'trade_messages',
  });
};

return User;
}