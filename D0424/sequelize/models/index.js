const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');


const env = process.env.MODE_ENV || 'development';
const config = require('../config/config')[env];
const db= {};

const sequelize = new Sequelize(config.Database,config.username,config.password,config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.initiate(sequelize);
Comment.initiate(sequelize);
module.exports = db;