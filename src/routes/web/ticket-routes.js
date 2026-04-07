const express = require('express');
const router = express.Router();
const { TicketController } = require('../../controllers');

// tickets/generate
router.get('/generate',
    TicketController.generate_pdf);

router.get('/test', (req, res) => {
    res.send("This is a test route for tickets");
});


module.exports = router;