const Sequelize = require('sequelize');

class Good extends Sequelize.Model {
  static initiate(sequelize) {
    Good.init({
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Good',
      tableName: 'goods',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Good.belongsTo(db.User, { as: 'Owner' }); // 사용자가 여러 상품 등록
    db.Good.belongsTo(db.User, { as: 'Sold' }); // 사용자가 여러 상품 낙찰
    db.Good.hasMany(db.Auction);
  }
};

module.exports = Good;