module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('admin', {
        admin_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        admin_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_branch: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Admin;
}
