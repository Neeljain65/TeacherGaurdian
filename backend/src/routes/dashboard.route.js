const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.contoller');
const db = require('../models');
// const branchDivisionModel = require('../models/branchDivision.model');

router.post('/upload/:type', dashboardController.upload.single('file'), dashboardController.uploadDocument
);

router.post('/getTecherDetails', dashboardController.getTechers);
router.post('/assignTeacherToDivision', async (req, res) => {
    const { admin_id, teacher_id, division } = req.body;

    try {
        const admin = await db.admin.findByPk(admin_id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const teacher = await db.teachers.findByPk(teacher_id);
        if (!teacher || teacher.teacher_branch !== admin.admin_branch)
            return res.status(403).json({ message: 'Invalid teacher or branch mismatch' });

        const existingAssignment = await db.teachers.findOne({ where: { division } });
        if (existingAssignment)
            return res.status(400).json({ message: 'Division already assigned' });

        teacher.division = division;
        await teacher.save();

        res.json({ message: 'Teacher assigned to division successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Controller for fetching students assigned to a teacher
router.post('/getAssignedStudents', dashboardController.getAssignedStudents); 





router.post("/getBranchDivisions", async (req, res) => {
    const { admin_id } = req.body; // Admin ID is passed as a query parameter
  
    try {
      // Fetch the admin's branch
      const admin = await db.admin.findByPk(admin_id);
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Fetch divisions and years under the admin's branch
      const branchDivisions = await db.branchDivison.findAll({
        where: { branch: admin.admin_branch },
      });
  
      return res.json(branchDivisions);
    } catch (error) {
      console.error("Error fetching branch divisions:", error);
      res.status(500).json({ message: "Error fetching branch divisions" });
    }
  });
  
router.get('/getDocuments/:studentForeginId', dashboardController.getDocuments);
module.exports = router;