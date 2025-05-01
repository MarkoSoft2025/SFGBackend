const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// CRUD Endpoints
router.post('/login', employeeController.login);
router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById); // Keep dynamic route last
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
