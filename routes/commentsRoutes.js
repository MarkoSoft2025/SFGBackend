const express = require('express');
const CommentsController = require('../controllers/commentsController');

const router = express.Router();

// CRUD Endpoints
router.get('/', CommentsController.getAllComments);
router.post('/', CommentsController.createComments);
router.get('/:id', CommentsController.getCommentsById);
router.put('/:id', CommentsController.updateComments);
router.delete('/:id', CommentsController.deleteComments);
module.exports = router;