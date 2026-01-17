const express = require('express');
const router = express.Router();
const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  addMember
} = require('../controllers/departmentController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getDepartments)
  .post(protect, authorize('admin'), createDepartment);

router.route('/:id')
  .get(getDepartment)
  .put(protect, authorize('admin'), updateDepartment)
  .delete(protect, authorize('admin', 'leader'), deleteDepartment);

router.post('/:id/members', protect, authorize('admin'), addMember);

module.exports = router;
