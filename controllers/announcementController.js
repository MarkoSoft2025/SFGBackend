const Announcement = require('../models/Announcement');

module.exports = {

  getAllAnnouncement: (req, res) => {
    Announcement.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Announcement:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getAllRecordAnnouncement: (req, res) => {
    Announcement.getAllRecord((err, results) => {
      if (err) {
        console.error('Error fetching Announcement:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createAnnouncement: (req, res) => {
    Announcement.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Announcement:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Announcement created successfully', announcementID: req.body.announcementID });
    });
  },

  getAnnouncementById: (req, res) => {
    Announcement.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Announcement:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
      res.json(result);
    });
  },

  updateAnnouncement: (req, res) => {
    Announcement.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Announcement:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Announcement updated successfully' });
    });
  },

  deleteAnnouncement: (req, res) => {
    Announcement.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Announcement:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Announcement deleted successfully' });
    });
  },

};
