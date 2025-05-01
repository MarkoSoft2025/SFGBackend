const express = require('express');
const CredentialsController = require('../controllers/credentialsController');

const router = express.Router();

// CRUD Endpoints
router.get('/', CredentialsController.getAllCredentials);
router.post('/', CredentialsController.createCredentials);
router.get('/:id', CredentialsController.getCredentialsById);
router.put('/:id', CredentialsController.updateCredentials);
router.delete('/:id', CredentialsController.deleteCredentials);


module.exports = router;