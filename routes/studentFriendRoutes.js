const express = require('express');
const StudentFriendController = require('../controllers/studentFriendController');

const router = express.Router();

// CRUD Endpoints
router.get('/', StudentFriendController.getAllStudentFriend);
router.post('/', StudentFriendController.createStudentFriend);
router.get('/:id', StudentFriendController.getStudentFriendById);
router.put('/:id', StudentFriendController.updateStudentFriend);
router.delete('/:id', StudentFriendController.deleteStudentFriend);
module.exports = router;