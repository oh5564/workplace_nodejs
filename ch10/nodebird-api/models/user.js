const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // followerId가 followingId를 팔로우하는 관계를 정의
  static associate(db) {
    db.User.hasMany(db.Post); // 한 사용자가 여러 게시글을 작성할 수 있음

    // followingId를 기준으로 follower(팔로워)를 찾는 관계
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers", // 내가 팔로우하는 사람(followingId)을 기준으로 나를 팔로우하는 사람(follower)을 찾음
      through: "Follow", // 중간 테이블(Follow)을 통해 연결
    });

    // followerId를 기준으로 following(팔로잉)을 찾는 관계
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings", // 나를 팔로우하는 사람(followerId)을 기준으로 내가 팔로우하는 사람(following)을 찾음
      through: "Follow", // 중간 테이블(Follow)을 통해 연결
    });

    db.User.hasMany(db.Domain); // 한 사용자가 여러 도메인을 가질 수 있음
  }
}

module.exports = User;
