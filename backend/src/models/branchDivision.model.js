module.exports = (sequelize, DataTypes) => {
    const BranchDivision = sequelize.define('BranchDivision', {
      division: {
        type: DataTypes.STRING,
        primaryKey: true, // Division is the primary key
      },
      branch: {
        type: DataTypes.STRING,
        allowNull: false, // Branch field (e.g., IT, CS)
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false, // Year field (e.g., Second Year, Third Year)
      },
    });
  
    return BranchDivision;
  };
  