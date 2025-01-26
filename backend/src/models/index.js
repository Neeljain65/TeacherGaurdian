const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.signup = require("./signup.model.js")(sequelize, Sequelize);
db.login = require("./login.model.js")(sequelize, Sequelize);
db.dashboard = require("./dashboard.model.js")(sequelize, Sequelize);
db.uploadDocs = require("./uploadDocs.model.js")(sequelize, Sequelize);
db.teachers = require("./Teachers.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);    
db.branchDivison = require("./branchDivision.model.js")(sequelize, Sequelize);    
// Define Associations after all models are loaded
db.signup.hasOne(db.dashboard, { foreignKey: 'student_foregin_id' });
db.dashboard.belongsTo(db.signup, { foreignKey: 'student_foregin_id' });

db.dashboard.hasOne(db.uploadDocs, { foreignKey: 'Dashboard_id' });
db.uploadDocs.belongsTo(db.dashboard, { foreignKey: 'Dashboard_id' });
// db.admin.hasMany(db.teachers, { foreignKey: 'admin_id' });
// db.teachers.belongsTo(db.admin, { foreignKey: 'admin_id' });

// db.teachers.hasMany(db.signup, { foreignKey: 'teacher_id' });
// db.signup.belongsTo(db.teachers, { foreignKey: 'teacher_id' });
module.exports = db;