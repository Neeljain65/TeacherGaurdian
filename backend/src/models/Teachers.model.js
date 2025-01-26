  module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define('teachers', {
        teacher_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        teacher_name: { type: DataTypes.STRING, allowNull: false },
        teacher_email: { type: DataTypes.STRING, allowNull: false },
        teacher_password: { type: DataTypes.STRING, allowNull: false },
        teacher_branch: { type: DataTypes.STRING, allowNull: false },
        division: { type: DataTypes.STRING, allowNull: true }, // Division assigned by admin
    });
    return Teachers;
};