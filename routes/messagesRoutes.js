const express = require('express');
const MessagesController = require('../controllers/messagesController');

const router = express.Router();

// CRUD Endpoints
router.get('/', MessagesController.getAllMessages);
router.post('/', MessagesController.createMessages);
router.get('/:id', MessagesController.getMessagesById);
router.put('/:id', MessagesController.updateMessages);
router.delete('/:id', MessagesController.deleteMessages);
module.exports = router;