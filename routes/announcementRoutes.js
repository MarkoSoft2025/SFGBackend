const express = require('express');
const AnnouncementController = require('../controllers/announcementController');

const router = express.Router();

// CRUD Endpoints
router.get('/', AnnouncementController.getAllAnnouncement);
router.get('/GetAll', AnnouncementController.getAllRecordAnnouncement);
router.post('/', AnnouncementController.createAnnouncement);
router.get('/:id', AnnouncementController.getAnnouncementById);
router.put('/:id', AnnouncementController.updateAnnouncement);
router.delete('/:id', AnnouncementController.deleteAnnouncement);


module.exports = router;