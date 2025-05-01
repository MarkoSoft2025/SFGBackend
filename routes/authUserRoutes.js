const express = require('express');
const AuthUserController = require('../controllers/authUsersController');

const router = express.Router();

// CRUD Endpoints
router.get('/', AuthUserController.getAllAuthUser);
router.get("/verify-email", AuthUserController.verifyEmail);
router.post('/', AuthUserController.createAuthUser);
router.get('/:id', AuthUserController.getAuthUserById);
router.put('/:id', AuthUserController.updateAuthUser);
router.delete('/:id', AuthUserController.deleteAuthUser);
module.exports = router;