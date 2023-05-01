const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init (
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
    },
    
    {
        sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
    }
)

module.exports = Comment;