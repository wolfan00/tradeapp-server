export default (sequelize, DataTypes) => {

const TradeOffer = sequelize.define(
  'TradeOffer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    offered_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requested_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
      defaultValue: 'Pending',
    },
    message: {
      type: DataTypes.STRING(500), // İlk mesaj isteğe bağlı
    },
    offerer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: 'trade_offers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 }
);

TradeOffer.associate = models => {
  TradeOffer.belongsTo(models.Product, {
    as: 'offered_product',
    foreignKey: 'offered_product_id'
  });

  TradeOffer.belongsTo(models.Product, {
    as: 'requested_product',
    foreignKey: 'requested_product_id'
  });

  TradeOffer.belongsTo(models.User, {
    as: 'offerer',
    foreignKey: 'offerer_id'
  });
  TradeOffer.hasMany(models.TradeMessage, {
    foreignKey: 'trade_offer_id',
    as: 'messages'
  });
};

return TradeOffer;
}

