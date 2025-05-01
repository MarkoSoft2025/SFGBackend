const express = require('express');
const ReactionController = require('../controllers/reactionController');

const router = express.Router();

// CRUD Endpoints
router.get('/', ReactionController.getAllReaction);
router.post('/', ReactionController.createReaction);
router.get('/:id', ReactionController.getReactionById);
router.put('/:id', ReactionController.updateReaction);
router.delete('/:id', ReactionController.deleteReaction);


module.exports = router;