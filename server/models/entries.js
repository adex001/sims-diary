export default (sequelize, DataTypes) => {
  const Entries = sequelize.define('Entries', {
    ownerid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'ownerid',
      }
    },
    story: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Entries.associate = function (models) {
    // associations can be defined here
    Entries.belongsTo(models.Users, {
      foreignKey: 'ownerid',
      onDelete: 'CASCADE'
    })
  };
  return Entries;
}; 
