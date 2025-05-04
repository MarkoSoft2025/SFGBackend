const express = require('express');
const childrenProfileController = require('../controllers/childrenProfileController');

const router = express.Router();

// CRUD Endpoints
router.post('/', childrenProfileController.createChildrenProfile);
router.get('/', childrenProfileController.getAllChildrenProfiles);
router.get('/EmpID/:empid', childrenProfileController.getAllChildrenProfilesByEmpID);
router.get('/:id', childrenProfileController.getChildrenProfileById);
router.put('/:id', childrenProfileController.updateChildrenProfile);
router.delete('/:id', childrenProfileController.deleteChildrenProfile);


module.exports = router;
